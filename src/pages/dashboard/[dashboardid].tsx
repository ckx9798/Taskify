import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import crownIcon from "@/../public/icons/crown_icon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import BoardCard from "@/components/BoardCard";
import CardModal from "@/components/modal/CardModal";

const nickName: string = "포텐셜";
const mockData: string[] = ["TIGER", "BEAR", "DOG", "CAT", "RABBIT"];
const mockData2 = {
  id: 0,
  title: "테스트",
  description: "테스트입니다",
  tags: ["테스트태그", "testTag"],
  dueDate: "2024.11.11",
  assignee: {
    profileImageUrl: "",
    nickname: "테스트네임",
    id: 0,
  },
  imageUrl: "",
  teamId: "9-2",
  columnId: 0,
  createdAt: "2024-10-25",
  updatedAt: "2024-10-25T07:59:23.624Z",
};

export default function Page() {
  const [members, setMembers] = useState<string[]>([]);
  const router = useRouter();
  // const id = router.query["dashboardid"];

  useEffect(() => {
    setMembers(mockData);
  }, []);

  return (
    <div>
      {/* <NavBar myNickName={nickName}>내 대시보드</NavBar> */}
      <NavBar myNickName={nickName} members={members}>
        비브리지
        <div>
          <Image src={crownIcon} alt="왕관" />
        </div>
      </NavBar>

      <BoardCard {...mockData2} onClick={() => alert("상세")} />
    </div>
  );
}
