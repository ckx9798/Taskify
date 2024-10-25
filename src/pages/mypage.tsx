import ProfileCard from "@/components/card-table/ProfileCard";
import SideMenu from "@/components/modal/SideMenu";
import ChangePwCard from "@/components/card-table/ChangePwCard";
import { updateUserInfo } from "@/libs/api/Users";

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
        <div>네비바</div>
        <div className={"w-screen h-full bg-gray-400 p-5 flex flex-col gap-7"}>
          <ProfileCard updateUserProfile={handliClickSave} />
          <ChangePwCard />
        </div>
      </div>
    </div>
  );
}
