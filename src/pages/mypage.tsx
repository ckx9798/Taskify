import SideMenu from "@/components/modal/SideMenu";
import ProfileCard from "@/components/card-table/ProfileCard";
import PasswordChangeCard from "@/components/card-table/PasswordChangeCard";
import { updateUserInfo } from "@/libs/api/Users";
import NavBar from "@/components/NavBar";

export default function mypage() {
  const handliClickSave = async ({ nickname, profileImageUrl }) => {
    //api
    const data = await updateUserInfo({
      nickname: nickname,
      profileImageUrl: profileImageUrl,
    });
    console.log(data);
  };
  return (
    <div className={"flex"}>
      <SideMenu />

      <div>
        <NavBar myNickName="qwe" />
        <div className={"flex h-full w-screen flex-col gap-7 bg-gray-400 p-5"}>
          <ProfileCard updateUserProfile={handliClickSave} />
          <PasswordChangeCard />
        </div>
      </div>
    </div>
  );
}
