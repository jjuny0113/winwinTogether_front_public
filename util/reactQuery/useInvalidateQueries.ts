import { ValueOf } from "@/app/@types/ValueOf";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./QUERY_KEYS";
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();
  const invaidateQueries = async (
    queryKeys: Array<ValueOf<typeof QUERY_KEYS>>
  ) => {
    await Promise.all(
      queryKeys.map((key) => queryClient.invalidateQueries([key]))
    );
  };
  return invaidateQueries;
};
