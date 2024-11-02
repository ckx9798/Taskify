// components/Layout.tsx

import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import SideMenu from "./modal/SideMenu";
import { userAtom } from "@/atoms/userAtom";
import { useAtom } from "jotai";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user] = useAtom(userAtom);
  return (
    <div className={"flex"}>
      <div>
        <SideMenu />
      </div>
      <div className={"flex flex-col"}>
        <NavBar
          myNickName={user?.nickname}
          myProfileImage={user?.profileImageUrl}
          members={nicknames}
        >
          {dashboardInfo?.title}
        </NavBar>
        <main
          className={
            "ml-[70px] mt-[64px] md:ml-[215px] md:mt-[80px] xl:ml-[300px]"
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
