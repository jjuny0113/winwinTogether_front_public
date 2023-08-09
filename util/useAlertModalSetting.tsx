import {
  AlertModalStoreInitState,
  useAlertModalStore,
} from "@/components/AlertModal/useAlertModalStore";
import Button from "@/components/Button";

export const useAlertModalSetting = () => {
  const setAlertModalData = ({
    status,
    title,
    comment,
    onButtonClick,
    isShowCancelButton = false,
  }: Omit<AlertModalStoreInitState, "buttonChildren"> & {
    onButtonClick: () => void;
    isShowCancelButton?: boolean;
  }) => {
    useAlertModalStore.getState().setState("status", status);
    useAlertModalStore.getState().setState("comment", comment);
    useAlertModalStore.getState().setState("title", title);
    useAlertModalStore.getState().setState(
      "buttonChildren",
      <div className="flex gap-2">
        {isShowCancelButton && (
          <Button
            size="small"
            variant="tinted"
            onClick={() => {
              useAlertModalStore.getState().setState("status", "");
            }}
          >
            취소
          </Button>
        )}

        <Button size="small" variant="primary" onClick={onButtonClick}>
          확인
        </Button>
      </div>
    );
  };

  return setAlertModalData;
};
