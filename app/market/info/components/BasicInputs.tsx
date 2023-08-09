"use client";

import React from "react";
import { useBasicInputsHandler } from "../hooks/handler/useBasicInputsHandler";
import BasicInputsComponent from "@/components/InfoInputs/BasicInputsComponent";

const BasicInputs = () => {
  const basicInputsHandler = useBasicInputsHandler();

  return <BasicInputsComponent {...basicInputsHandler} />;
};

export default BasicInputs;
