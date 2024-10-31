import React from "react";
import PaginationButton from "../PaginationButton";
import Image from "next/image";

interface DashboardPaginationProps {
  dashboardCount: number;
  dashboardPage: number;
  setDashboardPage: (page: number) => void;
}

// 사이드바 밑에 대시보드 목록을 넘기는 페이지네이션 버튼 컴포넌트
export default function DashboardPagination({
  dashboardCount,
  dashboardPage,
  setDashboardPage,
}: DashboardPaginationProps) {
  const lastPage = Math.ceil(dashboardCount / 10);

  const handleNextClick = () => {
    if (dashboardPage > 1) {
      setDashboardPage(dashboardPage - 1);
      console.log(dashboardPage, dashboardCount);
    }
  };

  const handlePreClick = () => {
    if (dashboardPage) setDashboardPage(dashboardPage + 1);
    console.log(dashboardPage, dashboardCount);
  };

  return (
    <>
      {dashboardCount > 10 ? (
        <PaginationButton
          size="large"
          onClickForward={handleNextClick}
          onClickBack={handlePreClick}
        >
          <button onClick={handleNextClick} disabled={dashboardPage === 1}>
            <Image
              src={
                dashboardPage === 1
                  ? "/icons/arrow_forward_gray_icon.svg"
                  : "/icons/arrow_forward_black_icon.svg"
              }
              alt="이전페이지"
              width={16}
              height={16}
            />
          </button>

          <button
            onClick={handlePreClick}
            disabled={dashboardPage === lastPage}
          >
            <Image
              src={
                dashboardPage === lastPage
                  ? "/icons/arrow_back_gray_icon.svg"
                  : "/icons/arrow_back_black_icon.svg"
              }
              alt="다음페이지"
              width={16}
              height={16}
            />
          </button>
        </PaginationButton>
      ) : null}
    </>
  );
}
