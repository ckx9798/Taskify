import { useState } from "react";
// import DashboardCard from "../DashboardCard";
import Link from "next/link";
import Image from "next/image";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const ViewAddDashboardModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    // bg-rose-100 삭제
    <div
      className={"flex flex-col w-72 h-screen gap-2.5 px-2 py-5 bg-rose-100"}
    >
      <div className={"mb-9"}>
        <Link href={"/"}>
          <Image
            src="/logo/midLogo.svg"
            alt="로고이미지"
            width={109}
            height={33}
          />
        </Link>
      </div>

      <div className={"flex justify-between items-center"}>
        <span className={"font-semibold	text-xs	text-gray-500"}>Dash Boards</span>
        <button onClick={ViewAddDashboardModal}>
          <Image src="/icons/sideMenuPlus.svg" alt="+" width={20} height={20} />
        </button>
      </div>

      {/* <ul className="space-y-1">
        <li>
          <DashboardCard width={280} height={42} />
        </li>
        <li>
          <DashboardCard width={280} height={42} />
        </li>
      </ul> */}
      {/* PagenationButton 추가 */}
    </div>
  );
}
