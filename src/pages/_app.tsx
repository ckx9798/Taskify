import { userAtom } from "@/atoms/userAtom";
import { getUserInfo } from "@/libs/api/Users";
import "@/styles/globals.css";
import { useAtom } from "jotai";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { getCookie } from "./login";
import Router from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    async function fetchUser() {
      const token = getCookie("accessToken");

      if (token) {
        const userData = await getUserInfo();
        setUser(userData.data);
      } else {
        Router.push("/login");
      }
    }
    fetchUser();
  }, []);

  return getLayout(<Component {...pageProps} />);
}
