import { userAtom } from "@/atoms/userAtom";
import { getUserInfo } from "@/libs/api/Users";
import "@/styles/globals.css";
import { useAtom } from "jotai";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { getCookie } from "./login";
import Router from "next/router";
import { NextPage } from "next";


type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
};
// Layout을 적용하기 위한 타입 정의
export type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    async function fetchUser() {
      const token = getCookie("accessToken");

      if (token) {
        const userData = await getUserInfo();
        if (userData && userData.data) {
          setUser(
            userData.data as {
              id: number;
              email: string;
              nickname: string;
              profileImageUrl: string;
              createdAt: string;
              updatedAt: string;
            },
          );
        } else {
          Router.push("/login");
        }
      }
    }
    fetchUser();
  }, []);

  return getLayout(<Component {...pageProps} />);
}
