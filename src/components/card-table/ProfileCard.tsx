import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";

interface ProfileCardProps {
  updateUserProfile: (userData: {
    nickname: string;
    profileImageUrl: string | null;
  }) => Promise<void>;
}

export default function ProfileCard({ updateUserProfile }: ProfileCardProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [nickName, setNickName] = useState("전역");
  const changeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const handleClickSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //api
    e.preventDefault();
    const data = await updateUserProfile({
      nickname: nickName,
      profileImageUrl: profileImage,
    });
  };

  // 이미지 파일 선택 창 열기
  const handleProfileImg = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 이미지 파일 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  function isNicknameInputError() {
    return nickName.length > 10;
  }
  return (
    <>
      <div
        className={
          "flex h-96 w-full max-w-[672px] flex-col gap-6 rounded-2xl bg-white p-6"
        }
      >
        <div>
          <h2 className={"text-2xl font-bold"}>프로필</h2>
        </div>

        <div className={"flex gap-11"}>
          <button
            className={
              "flex h-44 w-44 min-w-[182px] items-center justify-center rounded-md bg-gray-200 text-gray-100"
            }
            onClick={handleProfileImg}
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="프로필 이미지"
                className="h-full w-full rounded-lg object-cover"
                width={30}
                height={30}
              />
            ) : (
              <Image src="/svg/violetPlus.svg" alt="+" width={30} height={30} />
            )}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            className={"hidden"}
            accept="image/*"
            onChange={handleFileChange}
          />

          <form className={"flex w-full max-w-[400px] flex-col gap-6"}>
            {/* 이메일 */}
            <div className={"flex flex-col gap-2"}>
              <label htmlFor="email">이메일</label>
              <input
                className={
                  "h-12 w-full rounded-lg border border-gray-400 bg-inherit p-4 placeholder-black"
                }
                type="email"
                placeholder="asd@naver.com"
                id="email"
                disabled
              />
            </div>

            {/* 닉네임 */}
            <div className={"flex flex-col gap-2"}>
              <label htmlFor="nickname">닉네임</label>
              <input
                className={"h-12 w-full rounded-lg border border-gray-400 p-4"}
                type="text"
                placeholder="배유철"
                id="nickname"
                value={nickName}
                onChange={changeNickName}
              />
              <div className={`${!isNicknameInputError() ? "hidden" : ""}`}>
                닉네임을 10자 이내로 입력해주세요
              </div>
            </div>

            <label
              className={
                "flex h-12 w-full items-center justify-center rounded-lg bg-blue p-4 font-semibold text-white"
              }
              htmlFor="clickButton"
            >
              <button
                type="submit"
                onClick={handleClickSave}
                disabled={isNicknameInputError()}
              >
                저장
              </button>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
