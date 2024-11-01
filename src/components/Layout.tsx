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
    <div>
      <SideMenu />
      <NavBar
        myNickName={user?.nickname}
        myProfileImage={user?.profileImageUrl}
      >
        {null}
      </NavBar>
      <main className="ml-[287px] mt-[64px] md:ml-[289px] md:mt-[75px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
