import { useForm } from "react-hook-form";
import { usePostItemInfo } from "../query/usePostItemInfo";
import { usePostItemImgs } from "../query/usePostItemImgs";
import { useParams, useRouter } from "next/navigation";
import { useItemRegisterStore } from "@/app/market/hooks/zustand/useItemRegisterStore";
import { insertHttp } from "@/util/insertHttp";
import { URL_REGEX } from "@/app/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useAlertModalSetting } from "@/util/useAlertModalSetting";
import { useAlertModalStore } from "@/components/AlertModal/useAlertModalStore";
import { useSearchParams } from "next/navigation";
import { useChatStore } from "@/app/chat/hooks/zustand/useChatStore";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

export interface ResgistorInputsForms {
  name: string;
  price: string;
  mallUrl: string;
  description: string;
}

export const useItemRegisterHandler = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ResgistorInputsForms>();
  const router = useRouter();
  const { postItemInfoAsyncMutataion, isPostItemInfoLoading } =
    usePostItemInfo();
  const { itemImgsMutateAsync, isItemImgsLoading } = usePostItemImgs();
  const param = useParams() as {
    id: string;
  };
  const searchParams = useSearchParams();
  const itemName = watch("name");
  const description = watch("description");
  const { imgUrls, reset } = useItemRegisterStore((state) => ({
    imgUrls: state.imgUrls,
    reset: state.reset,
  }));

  const queryClient = useQueryClient();
  const setAlertModalData = useAlertModalSetting();
  const invalidateQueries = useInvalidateQueries();
  const onSubmit = async ({
    name,
    price,
    mallUrl,
    description,
  }: ResgistorInputsForms) => {
    const isFromChat = searchParams.get("chat");
    const isValidateUrl = !(URL_REGEX.test(mallUrl) || mallUrl === "");
    if (!name) {
      setError("name", {
        message: "상품명은 필수 입력입니다.",
      });
    }
    if (!price) {
      setError("price", {
        message: "가격은 필수 입력입니다.",
      });
    } else if (!Number(price)) {
      setError("price", {
        message: "가격은 숫자만 입력해주세요",
      });
    }
    if (isValidateUrl) {
      setError("mallUrl", {
        message: "올바른 url 주소를 입력해주세요",
      });
    }
    if (!description) {
      setError("description", {
        message: "제품 설명 및 상품 구성은 필수 입력입니다",
      });
    }
    if (
      [!name, !price, !Number(price), isValidateUrl, !description].some(
        (v) => v
      )
    ) {
      return;
    }

    if (isPostItemInfoLoading || isItemImgsLoading) return;
    const infoData = await postItemInfoAsyncMutataion({
      name,
      price: Number(price),
      description,
      mall_url: insertHttp(mallUrl),
      marketInfoId: Number(param.id),
    });

    if (infoData.createItem.status === "error") {
      setAlertModalData({
        status: "error",
        comment: "상품 등록에 실패했습니다. 다시 시도해주세요.",
        title: "등록 실패",
        onButtonClick: () => {
          useAlertModalStore.getState().setState("status", "");
        },
      });
      return;
    }
    const postImgs = await itemImgsMutateAsync(infoData.createItem.result.id);
    await invalidateQueries([QUERY_KEYS.ITEMS, QUERY_KEYS.ITEM_WITH_USER_INFO]);
    if (postImgs.status === "error") {
      setAlertModalData({
        status: "error",
        comment: "한번에 용량 50MB 이상은 업로드 할 수 없어요",
        title: "등록 실패",
        onButtonClick: () => {
          useAlertModalStore.getState().setState("status", "");
        },
      });
      return;
    } else {
      reset();
      router.refresh();
      if (isFromChat) {
        router.push("/chat?isFromItemRegister=true");
        return;
      }
      router.back();
    }
  };

  return {
    register,
    handleSubmitButtonClick: handleSubmit(onSubmit),
    isLoading: isPostItemInfoLoading || isItemImgsLoading,
    mainImg: imgUrls[0],
    itemName,
    description,
    errors,
  };
};
