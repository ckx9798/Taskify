// components/Layout.tsx

import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import SideMenu from "./modal/SideMenu";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <SideMenu />
      <NavBar myNickName="sss">{null}</NavBar>
      <main className="ml-[280px] mt-[63px] md:mt-[75px]">{children}</main>
    </div>
  );
};

export default Layout;
