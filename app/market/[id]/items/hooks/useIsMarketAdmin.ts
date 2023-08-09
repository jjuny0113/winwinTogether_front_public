import { useGetUser } from "@/app/common/user/useGetUser";
import { useParams } from "next/navigation";

export const useIsMarketAdmin = (isUser: boolean = true) => {
  const param = useParams() as {
    id: string;
    itemId?: string;
  };

  const user = useGetUser(isUser);

  return Number(param.id) === user?.market_id;
};
