import ProfileCard from "@/components/card-table/ProfileCard";
import SideMenu from "@/components/modal/SideMenu";
import ChangePwCard from "@/components/card-table/ChangePwCard";

export default function mypage() {
  return (
    <div className={"flex"}>
      <SideMenu />

      <div>
        <div>네비바</div>
        <div className={"w-screen h-full bg-gray-400 p-5 flex flex-col gap-7"}>
          <ProfileCard />
          <ChangePwCard />
        </div>
      </div>
    </div>
  );
}
