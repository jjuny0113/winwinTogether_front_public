import LongTimeLoader from "@/components/LongTimeLoader/LongTimeLoader";
import PageWrapper from "@/components/PageWrapper";
import React from "react";

const loading = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 items-center justify-center h-full ">
        <LongTimeLoader />
      </div>
    </PageWrapper>
  );
};

export default loading;
