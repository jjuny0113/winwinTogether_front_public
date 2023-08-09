import { useEffect } from "react";
import { useLogin } from "../zustand/useLogin";

import { cookies } from 'next/headers'

export const useTokenCheck = () => {
  const { setPage } = useLogin((state) => ({
    setPage: state.setPage,
  }));

  useEffect(() => {

  }, []);
};
