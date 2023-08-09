import React from "react";
import { useAlertModalStore } from "./useAlertModalStore";
import CheckModal from "../Modal/CheckModal";
import Button from "../Button";
import { shallow } from "zustand/shallow";

const AlertModal = () => {
  const { status, setState, title, comment, buttonChildren } =
    useAlertModalStore(
      (state) => ({
        status: state.status,
        comment: state.comment,
        buttonChildren: state.buttonChildren,
        title: state.title,
        setState: state.setState,
      }),
      shallow
    );

  switch (status) {
    case "warn":
      return (
        <CheckModal
          title={title}
          content={comment}
          key="auth"
          status="warn"
          buttonChildren={buttonChildren}
        />
      );
    case "error":
      return (
        <CheckModal
          title={title}
          content={comment}
          key="error"
          status="error"
          buttonChildren={buttonChildren}
        />
      );
    default:
      return <></>;
  }
};

export default AlertModal;
