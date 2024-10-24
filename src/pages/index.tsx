import React from "react";
import Head from "next/head";
import images from "@/assets/mainimages";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-black-400">
      <Head>
        <title>Taskify</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <header className="flex w-auto items-center justify-between px-20 py-4">
        <Link href={"/"}>
          <Image src={images.midLogo} alt="홈 화면으로" />
        </Link>
        <nav className="flex space-x-2 text-white">
          <Link href={"/signin"}>로그인</Link>
          <Link href={"/signup"}>회원가입</Link>
        </nav>
      </header>

      <main className="margincenter w-[1200px] text-white">
        <div className="flex flex-col items-center">
          <Image src={images.main1} alt="메인이미지" className="my-20" />
          <h1 className="text-center text-7xl font-bold">
            새로운 일정 관리 <span className="text-violet">Taskify</span>
          </h1>
          <Link href={"/signin"}>
            <button>로그인 하기 </button>
          </Link>
        </div>
        <div className="margincenter flex h-[600px] w-[1200px] rounded-lg bg-black-300">
          <div>
            <p>Point 1</p>
            <p>
              일의 우선순위를 <br /> 관리하세요
            </p>
          </div>
          <Image src={images.mainPoint1} alt="포인트1" className="end-" />
        </div>
      </main>

      <footer className="flex justify-between px-20 py-4 text-gray-400">
        <div>©codeit - 2023</div>
        <div className="flex space-x-2">
          <div>Privacy Policy</div>
          <div>FAQ</div>
        </div>
        <div className="flex space-x-3">
          <Image src={images.email} alt="이메일" />
          <Image src={images.facebook} alt="페이스북" />
          <Image src={images.instagram} alt="인스타그램" />
        </div>
      </footer>
    </div>
  );
}
