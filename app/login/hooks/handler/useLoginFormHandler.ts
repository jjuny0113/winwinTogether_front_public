import { shallow } from "zustand/shallow";
import { useRequestAuthNumber } from "../query/useRequestAuthNumber";
import { useLogin } from "../zustand/useLogin";
import { useForm } from "react-hook-form";

interface IFormInput {
  phoneNum: string;
}

export const useLoginFormHandler = () => {
  const { mutateAsync, isLoading } = useRequestAuthNumber();
  const { setPage, setUserPhoneNum } = useLogin(
    (state) => ({
      setPage: state.setPage,
      setUserPhoneNum: state.setUserPhoneNum,
    }),
    shallow
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = async ({ phoneNum }: IFormInput) => {
    const isPhoneNum = /010[0-9]{4}[0-9]{4}$/.test(phoneNum);

    if (!isPhoneNum) {
      setError("phoneNum", {
        message: "정확한 휴대폰 번호를 입력해주세요",
        type: "validate",
      });
      return;
    }
    setUserPhoneNum(phoneNum);
    const sendedAuthNumber = await mutateAsync(phoneNum);
    if (sendedAuthNumber.authNumber.status === "error") {
      if (sendedAuthNumber.authNumber.message.startsWith("id")) {
        for (let i = 0; i <= 5; i++) {
          const data = await mutateAsync(phoneNum);

          if (data.authNumber.status === "ok") {
            setPage("signIn");
            break;
          }
        }
        return;
      }
      useLogin.getState().setModal("phoneNumError");
      return;
    }

    setPage("signIn");
  };

  return {
    isLoading,
    register,
    submit: handleSubmit(onSubmit),
    errors,
  };
};
