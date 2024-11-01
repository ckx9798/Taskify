import ProfileCard from "@/components/card-table/ProfileCard";
import PasswordChangeCard from "@/components/card-table/PasswordChangeCard";
import { updateUserInfo } from "@/libs/api/Users";
import Layout from "@/components/Layout";

interface UpdateUserProfileData {
  nickname: string;
  profileImageUrl: string | null;
}

export default function Mypage() {
  const handleClickSave = async ({
    nickname,
    profileImageUrl,
  }: UpdateUserProfileData): Promise<void> => {
    //api
    const data = await updateUserInfo({
      nickname: nickname,
      profileImageUrl: profileImageUrl,
    });
    console.log(data);
  };
  return (
    <div className={"flex h-screen w-screen bg-gray-100"}>
      <div>
        <div className={"h-sreen flex flex-col gap-7 p-5"}>
          <section>
            <ProfileCard updateUserProfile={handleClickSave} />
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

Mypage.getLayout = getLayout;
