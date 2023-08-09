import { useQuery } from "@tanstack/react-query";
import { getUser } from "./getUser";
import { useSearchParams } from "next/navigation";

export const useGetUser = (isUser: boolean = true) => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: isUser,

  });

  return data;
};
