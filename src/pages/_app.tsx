import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  return getLayout(<Component {...pageProps} />);
}
