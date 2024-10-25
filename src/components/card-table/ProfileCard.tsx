import Image from "next/image";
import React, { useRef, useState } from "react";
// import { updateUserInfo } from "@/libs/api/Users";

export default function ProfileCard({ updateUserProfile }) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [nickName, setNickName] = useState("전역");
  const changeNickName = (e) => {
    setNickName(e.target.value);
  };
  const handliClickSave = async (e) => {
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
      // const imageUrl = URL.createObjectURL(file);
      // setProfileImage(imageUrl);
    }
  };

  function isNicknameInputError() {
    return nickName.length > 10;
  }
  return (
    <>
      <div
        className={
          "w-full max-w-[672px] h-96 rounded-2xl p-6 flex flex-col gap-6 bg-rose-100"
        }
      >
        <div>
          <h2 className={"text-2xl font-bold text-we"}>프로필</h2>
        </div>

        <div className={"flex gap-11"}>
          <button
            className={
              "w-44 min-w-[182px] h-44 bg-gray-300 rounded-md flex justify-center items-center text-gray-100"
            }
            onClick={handleProfileImg}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="프로필 이미지"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Image src="/svg/add_box.svg" alt="+" width={30} height={30} />
            )}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className={"hidden"}
            accept="image/*"
            onChange={handleFileChange}
          />

          <form className={"w-full max-w-[400px] flex flex-col gap-6"}>
            <div className={"flex flex-col gap-2"}>
              <label htmlFor="email">이메일</label>
              <input
                className={
                  "w-full h-12 p-4 rounded-lg border border-gray-400 bg-inherit"
                }
                type="email"
                placeholder="asd@naver.com"
                id="email"
                disabled
              />
            </div>

            <div className={"flex flex-col gap-2"}>
              <label htmlFor="nickname">닉네임</label>
              <input
                className={"w-full h-12 p-4 rounded-lg border border-gray-400"}
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
            <div
              className={
                "w-full h-12 p-4 rounded-lg bg-blue-700 flex justify-center items-center text-white font-semibold"
              }
            >
              <button
                type="submit"
                onClick={handliClickSave}
                disabled={isNicknameInputError()}
              >
                {" "}
                저장{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
