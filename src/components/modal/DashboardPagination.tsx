import React from "react";
import PaginationButton from "../PaginationButton";
import Image from "next/image";

interface DashboardPaginationProps {
  dashboardCount: number;
  dashboardPage: number;
  setDashboardPage: (page: number) => void;
  data: 5 | 10;
}

// 사이드바 밑에 대시보드 목록을 넘기는 페이지네이션 버튼 컴포넌트
export default function DashboardPagination({
  dashboardCount,
  dashboardPage,
  setDashboardPage,
  data,
}: DashboardPaginationProps) {
  const lastPage = Math.ceil(dashboardCount / data);

  const handleForwardClick = () => {
    if (dashboardPage > 1) {
      setDashboardPage(dashboardPage - 1);
    }
  };
  const handleBackClick = () => {
    if (dashboardPage) setDashboardPage(dashboardPage + 1);
  };
  return (
    <div className={"flex justify-start gap-3"}>
      {data === 5 ? (
        <div className={"flex items-center justify-center gap-3"}>
          <span className={""}>
            {lastPage}페이지 중 {dashboardPage}
          </span>
        </div>
      ) : null}
      {dashboardCount > data ? (
        <PaginationButton
          size="large"
          onClickForward={handleForwardClick}
          onClickBack={handleBackClick}
        >
          <button onClick={handleBackClick} disabled={dashboardPage === 1}>
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
            onClick={handleForwardClick}
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
    </div>
  );
}
