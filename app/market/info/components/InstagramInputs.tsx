import React from "react";
import { useInstagramInputsHandler } from "../hooks/handler/useInstagramInputsHandler";
import InstagramInputsComponent from "@/components/InfoInputs/InstagramInputsComponent";

const InstagramInputs = () => {
  const instagramInputsHandler = useInstagramInputsHandler();
  return <InstagramInputsComponent {...instagramInputsHandler} />;
};

export default InstagramInputs;
