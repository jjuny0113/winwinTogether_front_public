import { checkOverImgSize } from "@/util/checkImgFiles";
import { useAlertModalSetting } from "@/util/useAlertModalSetting";
import { useEffect } from "react";
import { useMarketInfoStore } from "../zustand/useMarketInfoStore";
import { shallow } from "zustand/shallow";
import { useAlertModalStore } from "@/components/AlertModal/useAlertModalStore";

export const useHandleImg = (image: FileList) => {
  const setAlertModalData = useAlertModalSetting();
  const { imgUrls, setState } = useMarketInfoStore(
    (state) => ({
      imgUrls: state.imgUrls,
      setState: state.setState,
    }),
    shallow
  );
  useEffect(() => {
    if (image && image.length > 0) {
      const size = Array.from(image)
        .slice(0, 10 - imgUrls.length)
        .map((v) => v.size)
        .reduce((acc, cur) => acc + cur, 0);

      if (checkOverImgSize(size)) {
        setAlertModalData({
          status: "error",
          title: "이미지 용량 초과",
          comment: "최대 50MB까지 올릴 수 있습니다.",
          onButtonClick: () => {
            useAlertModalStore.getState().setState("status", "");
          },
        });
        return;
      }

      Array.from(image)
        .slice(0, 10 - imgUrls.length)
        .forEach((file) => {
          const url = URL.createObjectURL(file);
          setState(
            "imgUrls",
            useMarketInfoStore.getState().imgUrls.concat([
              {
                id: 0,
                url,
              },
            ])
          );
          setState(
            "imgFiles",
            useMarketInfoStore.getState().imgFiles.concat([
              {
                url,
                file,
              },
            ])
          );
        });
    }
  }, [image]);
};
