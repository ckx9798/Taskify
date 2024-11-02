// components/Layout.tsx

import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import SideMenu from "./modal/SideMenu";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { memberAtom } from "@/atoms/membersAtom";
import { dashboardInfoAtom } from "@/atoms/dashboardInfoAtom";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user] = useAtom(userAtom);
  const [dashboardInfo] = useAtom(dashboardInfoAtom);
  const members = useAtomValue(memberAtom);
  const nicknames = members.map((member) => member.nickname);

  return (
    <div>
      <SideMenu />
      <NavBar
        myNickName={user?.nickname}
        myProfileImage={user?.profileImageUrl}
        members={nicknames}
      >
        {dashboardInfo?.title}
      </NavBar>
      <main className="ml-[287px] mt-[64px] md:ml-[289px] md:mt-[75px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
