import React, { FormEvent, useEffect, useRef, useState } from "react";
import MypageInput from "./MypageInput";
import { createUserProfileImg, getUserInfo } from "@/libs/api/Users";
import ErrorMessageModal from "./ErrorMessageModal";
import axios from "axios";
import ProfileImageUploader from "./ProfileImageUploader";

interface ProfileCardProps {
  updateUserProfile: (userData: {
    nickname: string;
    profileImageUrl: string | null;
  }) => Promise<void>;
}

export default function ProfileCard({ updateUserProfile }: ProfileCardProps) {
  const [selectedProfileFile, setSelectedProfileFile] = useState<File | null>(
    null,
  );
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [nickName, setNickName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 유저정보 가져오는 요청 api
  const setUserInfo = async () => {
    try {
      const data = await getUserInfo();
      if (data && data.data) {
        setProfileImage(data.data.profileImageUrl);
        setNickName(data.data.nickname);
        setUserEmail(data.data.email);
      } else {
        console.error("Invalid user data received");
      }
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };
  useEffect(() => {
    setUserInfo();
  }, []);

  //프로필 정보 수정 요청 api
  const handleClickSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 이미지 업로드 요청
    let profileImg = null;
    if (selectedProfileFile) {
      try {
        const imgdata = await createUserProfileImg(selectedProfileFile);
        profileImg = imgdata.profileImageUrl;
      } catch (error) {
        console.error("Failed to upload image", error);
      }
    }

    // 프로필 정보 수정 요청
    try {
      // const data =
      await updateUserProfile({
        nickname: nickName,
        profileImageUrl: profileImg,
      });
      setSuccessMessage("프로필 수정 성공!");
      setIsModalOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response && error.response.data
            ? error.response.data.message || JSON.stringify(error.response.data)
            : error.message;
        setErrorMessage(message);
        setIsModalOpen(true);
      }
    }
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
      setSelectedProfileFile(file);
    }
  };

  const modalClose = (e?: FormEvent) => {
    e?.preventDefault();
    setIsModalOpen(false);
  };

  const isNicknameInputError = () => {
    return nickName.length > 10;
  };

  const deleteImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setProfileImage(null);
    setSelectedProfileFile(null);
  };

  const nicknameValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      setNicknameError("닉네임을 10자 이내로 입력해주세요.");
    } else {
      setNicknameError("");
    }
    setNickName(e.target.value);
  };

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
          {/* 이미지 선택 컴포넌트  */}
          <ProfileImageUploader
            profileImage={profileImage}
            handleProfileImg={handleProfileImg}
            handleFileChange={handleFileChange}
            deleteImg={deleteImg}
            fileInputRef={fileInputRef}
          />
          <input
            type="file"
            ref={fileInputRef}
            className={"hidden"}
            accept="image/*"
            onChange={handleFileChange}
          />
          <form className={"flex w-full max-w-[400px] flex-col gap-3"}>
            {/* 이메일 */}
            <div className={"flex flex-col gap-2"}>
              <MypageInput
                inputText="이메일"
                inputType="text"
                value={userEmail}
                labelId="email"
                error=""
                disabled={true}
              />
            </div>

            {/* 닉네임 */}
            <div className={"flex flex-col"}>
              <MypageInput
                inputText="닉네임"
                inputType="text"
                labelId="nickname"
                value={nickName}
                error={nicknameError}
                onChange={nicknameValidation}
              />
              <p className={"mt-2 text-sm text-red"}>{nicknameError}</p>
            </div>

            {/* 저장버튼 */}
            <label
              className={
                "mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-blue p-4 font-semibold text-white"
              }
              htmlFor="저장버튼"
            >
              <button
                type="submit"
                onClick={handleClickSave}
                disabled={isNicknameInputError()}
                id="저장버튼"
              >
                저장
              </button>
            </label>
            {/* 에러 메시지 보여주는 모달 */}
            {isModalOpen && (
              <ErrorMessageModal
                errorMessage={errorMessage}
                successMessage={successMessage}
                width={"368px"}
                height={"192px"}
                modalClose={modalClose}
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
}
