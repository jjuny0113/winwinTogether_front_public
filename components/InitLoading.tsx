import React from "react";
import PageWrapper from "./PageWrapper";
import LongTimeLoader from "./LongTimeLoader/LongTimeLoader";

const InitLoading = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 items-center justify-center h-full ">
        <LongTimeLoader />
      </div>
      <div className="h-16 w-1"/>
    </PageWrapper>
  );
};

export default InitLoading;
