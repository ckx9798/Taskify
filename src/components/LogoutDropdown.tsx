import baseaxios from "@/libs/api/axios";
import { useRouter } from "next/router";
import DropDownMenu from "./DropDownMenu";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface LogoutDropdownProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function LogoutDropdown({
  isMenuOpen,
  setIsMenuOpen,
}: LogoutDropdownProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 로그아웃함수
  const logout = () => {
    delete baseaxios.defaults.headers.common["Authorization"];
    if (typeof window !== "undefined") {
      document.cookie = "accessToken=; Max-Age=0; path=/;"; // 쿠키 만료 설정
    }
    router.push("/login");
  };

  // 드롭다운 리스트
  const options = [
    { label: "내 대시보드", onClick: () => router.push("/mydashboard") },
    { label: "계정관리", onClick: () => router.push("/mypage") },
    { label: "로그아웃", onClick: logout },
  ];

  // 바깥 바탕 클릭 시 메뉴 닫음
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  return (
    <>
      {isMenuOpen && (
        <div ref={dropdownRef}>
          <DropDownMenu
            options={options}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
