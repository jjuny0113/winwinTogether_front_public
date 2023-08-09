import { useFetchLogin } from "../query/useFetchLogin";
import { useLogin } from "../zustand/useLogin";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { shallow } from "zustand/shallow";

interface IAuthNumberInput {
  authNumber: string;
}

export const useAuthNumberInputHandler = () => {
  const { setModal, userPhoneNum, setPage, setIsLoading } = useLogin(
    (state) => ({
      userPhoneNum: state.userPhoneNum,
      setModal: state.setModal,
      setPage: state.setPage,
      setIsLoading: state.setIsLoading,
    }),
    shallow
  );

  const router = useRouter();
  const { isLoading, mutateAsync } = useFetchLogin();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<IAuthNumberInput>();
  const onSubmit = async (validForm: IAuthNumberInput) => {
    if (!validForm.authNumber) {
      setError("authNumber", {
        message: "인증번호를 입력해주세요.",
      });
      return;
    }
    if (validForm.authNumber.length !== 6) {
      setError("authNumber", {
        message: "올바른 인증번호를 입력하세요",
      });
      return;
    }

    const user = await mutateAsync({
      authNumber: validForm.authNumber,
      userPhoneNum: userPhoneNum,
    });

    if (user.signIn.status === "error") {
      setError("authNumber", {
        message: user.signIn.message,
      });
      setModal("notEqual");
      return;
    }

    if (
      user.signIn.result.privacy_consent &&
      user.signIn.result.survey_sms_consent
    ) {
      setIsLoading(true);
      router.push("/dashboard");
    } else {
      setPage("welcome");
    }
  };

  return {
    register,
    submit: handleSubmit(onSubmit),
    isLoading,
    errors,
    watch,
  };
};
