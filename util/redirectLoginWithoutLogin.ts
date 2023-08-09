import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const redirectLoginWithoutLogin = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken || !accessToken.value) {
    redirect("/login");
  }
};
