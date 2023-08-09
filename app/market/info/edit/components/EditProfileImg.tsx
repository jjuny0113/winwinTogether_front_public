"use client";
import React, { useEffect } from "react";
import { useUpdateMarketInfo } from "../hooks/query/useUpdateMarketInfo";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useEditInfoStore } from "../hooks/zustand/useEditInfoStore";
import { shallow } from "zustand/shallow";
import MarketEditWrapper from "./MarketEditWrapper";
import Icon from "@/components/Icon/Icon";
import Carmera from "../../../../../components/Icon/svg/camera.svg";
import Person from "../../../../../components/Icon/svg/person.svg";
import "./styles.css";

import { useUpdatMarketProfileImg } from "../hooks/query/useUpdatMarketProfileImg";
import { useInvalidateQueries } from "@/util/reactQuery/useInvalidateQueries";
import { QUERY_KEYS } from "@/util/reactQuery/QUERY_KEYS";

interface EditProfileImgProps {
  profileImgUrl: string;
}

const EditProfileImg = ({ profileImgUrl }: EditProfileImgProps) => {
  const { register, watch, handleSubmit, setValue } = useForm<{
    profileImg: FileList;
  }>();
  const { isLoading, mutateAsync } = useUpdateMarketInfo<"profile_img">();
  const { setState, profileImgFile, profileImgUrlState } = useEditInfoStore(
    (state) => ({
      setState: state.setState,
      profileImgFile: state.profileImgFile,
      profileImgUrlState: state.profileImgUrl,
    }),
    shallow
  );
  const image = watch("profileImg");
  const invalidateQueries = useInvalidateQueries();
  const {
    mutateAsync: profileImgMutationAsync,
    isLoading: isProfileImgLoading,
  } = useUpdatMarketProfileImg();
  const onSubmit = async (value: { profileImg: FileList }) => {
    if (isLoading || isProfileImgLoading) {
      return;
    }
    useEditInfoStore.getState().setState("isEditLoading", true);
    if (!profileImgUrlState) {
      await mutateAsync({
        profile_img: "",
      });
      await invalidateQueries([QUERY_KEYS.MARKET_INFO, QUERY_KEYS.USER]);
      useEditInfoStore.getState().setState("editType", "list");
      useEditInfoStore.getState().setState("isEditLoading", false);
      return;
    }
    if (profileImgFile) {
      await profileImgMutationAsync();
      await invalidateQueries([QUERY_KEYS.MARKET_INFO, QUERY_KEYS.USER]);
      useEditInfoStore.getState().setState("editType", "list");
      useEditInfoStore.getState().setState("isEditLoading", false);
      return;
    }
  };

  useEffect(() => {
    setState("profileImgUrl", profileImgUrl);
  }, []);
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];

      setState("profileImgFile", file);

      setState("profileImgUrl", URL.createObjectURL(file));
    }
  }, [image, setState]);
  return (
    <MarketEditWrapper
      handleSumbit={handleSubmit(onSubmit)}
      isLoading={isLoading || isProfileImgLoading}
    >
      {profileImgUrlState ? (
        <div className="relative">
          <Image
            src={profileImgUrlState}
            alt="image"
            width={96}
            height={96}
            className="rounded-full w-40 h-40"
          />
          <div
            className=" flex justify-center items-center absolute -right-4 -top-2 cancel"
            onClick={() => {
              setState("profileImgUrl", "");
            }}
          >
            <Icon type="circleCancel" />
          </div>
          <label
            htmlFor="picture"
            className="absolute -right-3 bottom-0 cursor-pointer"
          >
            <Icon type="whitePencil" />

            <input
              {...register("profileImg")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      ) : (
        <label
          htmlFor="picture"
          className="flex justify-center items-center w-40 h-40  bg-[#f5f5f8] rounded-full relative"
        >
          <Person />
          <input
            {...register("profileImg")}
            id="picture"
            type="file"
            className="hidden"
            accept="image/*"
          />

          <div className="bg-purpleMain w-[36px] h-[36px] rounded-full flex justify-center items-center absolute right-0 bottom-0">
            <Carmera />
          </div>
        </label>
      )}
    </MarketEditWrapper>
  );
};

export default EditProfileImg;
