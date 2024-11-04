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
      <header className="sticky top-0 z-10 flex w-auto items-center justify-between bg-black-400 px-20 py-4">
        <Link href={"/"}>
          <Image src={images.midLogo} alt="홈 화면으로" />
        </Link>
        <nav className="flex space-x-2 text-white">
          <Link href={"/login"}>로그인</Link>
          <Link href={"/signup"}>회원가입</Link>
        </nav>
      </header>

      <main className="margincenter my-20 max-w-[1200px] bg-black-400 text-white">
        <div className="flex flex-col items-center">
          <Image src={images.main1} alt="메인이미지" className="my-20" />
          <h1 className="mb-28 text-center text-[40px] font-bold md:text-[56px] xl:text-[76px]">
            새로운 일정 관리
            <br className="md:hidden" />
            <span className="text-violet">Taskify</span>
          </h1>
          <Link href={"/login"}>
            <BoxButton
              paddingRightLeft="101"
              paddingTopBottom="9"
              radius="8"
              backgroundColor="purple"
              fontSize="18"
            >
              로그인하기
            </BoxButton>
          </Link>
        </div>
        <div className="flex flex-col gap-20 py-20 max-[1199px]:p-10">
          <div className="margincenter relative flex h-[600px] w-[100%] rounded-lg bg-black-300 max-[1199px]:h-[972px]">
            <div className="flex flex-col gap-y-20 pl-12 pt-24">
              <p className="text-[22px] text-gray-400">Point 1</p>
              <p className="text-[36px] font-bold leading-[64px] md:text-[48px]">
                일의 우선순위를 <br /> 관리하세요
              </p>
            </div>
            <Image
              src={images.mainPoint1}
              alt="포인트1"
              className="absolute bottom-0 right-0"
            />
          </div>
          <div className="margincenter relative flex h-[600px] w-[100%] rounded-lg bg-black-300 max-[1199px]:h-[972px]">
            <div className="ml-[600px] flex flex-col gap-y-20 pl-12 pt-24 max-[1199px]:ml-0">
              <p className="text-[22px] text-gray-400">Point 2</p>
              <p className="text-[36px] font-bold leading-[64px] md:text-[48px]">
                해야 할 일을 <br /> 등록하세요
              </p>
            </div>
            <Image
              src={images.mainPoint2}
              alt="포인트2"
              className="bg- absolute bottom-0 xl:left-20"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-center text-[28px] font-bold">
            생산성을 높이는 다양한 설정⚡
          </p>
          <div className="flex flex-col items-center gap-5 xl:flex-row xl:justify-between">
            <div>
              <div className="flex h-[260px] w-[378px] rounded-t-lg bg-black-100">
                <Image
                  className="margincenter"
                  src={images.mainSetting1}
                  alt="대시보드 설정"
                />
              </div>
              <div className="flex h-[124px] w-[378px] flex-col gap-6 rounded-b-lg bg-black-300 p-6">
                <p className="text-[18px] font-bold">대시보드 설정</p>
                <p>대시보드 사진과 이름을 변경할 수 있어요.</p>
              </div>
            </div>
            <div>
              <div className="flex h-[260px] w-[378px] rounded-t-lg bg-black-100">
                <Image
                  className="margincenter"
                  src={images.mainSetting2}
                  alt="초대 설정"
                />
              </div>
              <div className="flex h-[124px] w-[378px] flex-col gap-6 rounded-b-lg bg-black-300 p-6">
                <p className="text-[18px] font-bold">초대</p>
                <p>새로운 팀원을 초대할 수 있어요.</p>
              </div>
            </div>
            <div>
              <div className="flex h-[260px] w-[378px] rounded-t-lg bg-black-100">
                <Image
                  className="margincenter"
                  src={images.mainSetting3}
                  alt="구성원 설정"
                />
              </div>
              <div className="flex h-[124px] w-[378px] flex-col gap-6 rounded-b-lg bg-black-300 p-6">
                <p className="text-[18px] font-bold">구성원</p>
                <p>구성원을 초대하고 내보낼 수 있어요.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex h-[100px] items-center justify-between px-20 py-4 text-gray-400">
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
