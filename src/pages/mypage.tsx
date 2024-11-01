import ProfileCard from "@/components/card-table/ProfileCard";
import PasswordChangeCard from "@/components/card-table/PasswordChangeCard";
import { updateUserInfo } from "@/libs/api/Users";
import Layout from "@/components/Layout";

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
      <div>
        <div className={"flex h-full w-screen flex-col gap-7 bg-gray-100 p-5"}>
          <section>
            <ProfileCard updateUserProfile={handliClickSave} />
          </section>
          <section>
            <PasswordChangeCard />
          </section>
        </div>
      </div>
    </div>
  );
}
const getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

mypage.getLayout = getLayout;
