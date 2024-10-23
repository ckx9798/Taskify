import React from "react";
import Head from "next/head";
import images from "@/assets/mainimages";
import Image from "next/image";
import Link from "next/link";
import BoxButton from "@/components/BoxButton";

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
          <Link href={"/login"}>로그인</Link>
          <Link href={"/signup"}>회원가입</Link>
        </nav>
      </header>

      <main className="margincenter w-[1200px] text-white">
        <div className="flex flex-col items-center">
          <Image src={images.main1} alt="메인이미지" className="my-20" />
          <h1 className="text-center text-7xl font-bold">
            새로운 일정 관리 <span className="text-violet">Taskify</span>
          </h1>
          <Link href={"/login"}>
            <BoxButton
              width="50px"
              height="20px"
              radius="8"
              backgroundColor="purple"
              fontSize="16"
            >
              로그인하기
            </BoxButton>
          </Link>
        </div>
        <div className="flex flex-col gap-10 py-20">
          <div className="margincenter relative flex h-[600px] w-[1200px] rounded-lg bg-black-300">
            <div className="flex flex-col gap-y-20 pl-12 pt-24">
              <p className="text-[22px] text-gray-400">Point 1</p>
              <p className="text-[48px] font-bold leading-[64px]">
                일의 우선순위를 <br /> 관리하세요
              </p>
            </div>
            <Image
              src={images.mainPoint1}
              alt="포인트1"
              className="absolute bottom-0 right-0"
            />
          </div>
          <div className="margincenter relative flex h-[600px] w-[1200px] rounded-lg bg-black-300">
            <div className="ml-[600px] flex flex-col gap-y-20 pl-12 pt-24">
              <p className="text-[22px] text-gray-400">Point 2</p>
              <p className="text-[48px] font-bold leading-[64px]">
                해야 할 일을 <br /> 등록하세요
              </p>
            </div>
            <Image
              src={images.mainPoint2}
              alt="포인트1"
              className="absolute bottom-0 left-20"
            />
          </div>
        </div>
        <div>
          <p>생산성을 높이는 다양한 설정 ⚡</p>
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
