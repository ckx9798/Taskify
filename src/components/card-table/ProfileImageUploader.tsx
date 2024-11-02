import React from "react";
import Image from "next/image";

interface ProfileImageUploaderProps {
  profileImage: string | null;
  handleProfileImg: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImg: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  profileImage,
  handleProfileImg,
  handleFileChange,
  deleteImg,
  fileInputRef,
}) => {
  return (
    <div className={"flex gap-11"}>
      <button
        className={
          "relative flex h-28 w-28 items-center justify-center rounded-md bg-gray-200 text-gray-100 md:h-44 md:w-44 md:min-w-[182px]"
        }
        onClick={handleProfileImg}
      >
        {profileImage ? (
          <>
            <Image
              src={profileImage}
              alt="프로필 이미지"
              className="static h-full w-full rounded-lg object-cover"
              width={182}
              height={182}
            />
            <button className={"absolute right-2 top-2"} onClick={deleteImg}>
              ❌
            </button>
          </>
        ) : (
          <Image src="/svg/violetPlus.svg" alt="+" width={30} height={30} />
        )}
      </button>

      {/* Hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        className={"hidden"}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileImageUploader;
