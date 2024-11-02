import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={"relative h-screen w-full"}>
      <Head>
        <title>Taskify | 404</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Link href={"/"} className="btn-violet w-full py-5 text-xl font-bold">
        <div>
          <Image
            src="/image/404.gif"
            alt="404"
            priority
            unoptimized
            width={1400}
            height={1000}
            objectFit="cover"
            objectPosition="center"
            sizes="(max-width: 480px) 100vw, 30vw"
          />
        </div>
        <div className={"max-w-[1400px] bg-indigo-400 p-8"}>
          <p
            className={
              "text-center font-mono text-base font-semibold text-white md:text-2xl xl:text-4xl"
            }
          >
            This is not the web page you are looking for
          </p>
        </div>
      </Link>
    </div>
  );
}

const getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

NotFound.getLayout = getLayout;
