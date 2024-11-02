import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Column from "@/components/Column";
import { getColumns } from "@/libs/api/columns";
import CustomBtn from "@/components/CustomBtn";
import CreateColumn from "@/components/modal/CreateColumn";
import Layout from "@/components/Layout";
import { useAtom } from "jotai";
import { dashboardInfoAtom } from "@/atoms/dashboardInfoAtom";
import { memberAtom } from "@/atoms/membersAtom";
import { getMembers } from "@/libs/api/Members";
import { getDashboardDetail } from "@/libs/api/dashboards";
// import { FaArrowUp } from "react-icons/fa";

interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  const [columnList, setColumnList] = useState<Column[]>([]);
  const [showCreateColumnModal, setShowCreateModal] = useState(false);
  const [screenSize, setScreenSize] = useState<string>("mobile");
  const [please, setPlease] = useState(0); // 강제 재랜더링을 위한 상태
  const [, setMembers] = useAtom(memberAtom);
  const [, setDashboardInfo] = useAtom(dashboardInfoAtom);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const router = useRouter();
  const id = Number(router.query["dashboardid"]);

  const handleCreateColumnModalOpen = () => {
    setShowCreateModal(true);
  };

  const handleCreateColumnModalClose = () => {
    setShowCreateModal(false);
  };

  useEffect(() => {
    if (router.isReady && !isNaN(id)) {
      const fetchData = async () => {
        try {
          // 대시보드 상세 정보 전역 상태 저장
          const dashboardDetail = await getDashboardDetail(id);
          setDashboardInfo(dashboardDetail);

          // 대시보드 멤버 정보 전역 상태 저장
          const membersData = await getMembers({ dashboardId: id, page: 1 });
          setMembers(membersData.members);

          const columnData = await getColumns(id);
          // createdAt을 기준으로 정렬 (최신순)
          const sortedColumns = columnData.data.sort((a: Column, b: Column) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          setColumnList(sortedColumns);
        } catch (error) {
          console.error("컬럼 목록 조회 실패: " + error);
        }
      };

      fetchData();
    }
  }, [router.isReady, id, please]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1280) {
        setScreenSize("tablet");
      } else {
        setScreenSize("pc");
      }
    };

    handleResize(); // 초기 사이즈 설정
    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 리스너 등록

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleReRender = () => {
    setPlease((prev) => (prev += 1));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ul className="flex w-[308px] flex-col md:w-[584px] xl:w-[354px] xl:flex-row">
        {columnList?.map((column, index) => (
          <Column
            key={`${column.id}-${please}`}
            columnId={column.id}
            columnTitle={column.title}
            isFirst={index === 0}
            onClickReRender={handleReRender}
          />
        ))}
        <li className="h-fit px-3 pb-[49px] pt-4 md:px-5 md:pb-5 md:pt-0 xl:pl-5 xl:pt-[75px]">
          <CustomBtn
            content={"새로운 컬럼 추가하기"}
            width={
              screenSize === "mobile"
                ? 284
                : screenSize === "tablet"
                  ? 544
                  : 354
            }
            height={screenSize === "mobile" ? 66 : 70}
            fontSize={screenSize === "mobile" ? "14" : "18"}
            fontWeight={"700"}
            borderRadius={"8"}
            onClick={handleCreateColumnModalOpen}
          />
        </li>
      </ul>
      {showCreateColumnModal && (
        <CreateColumn
          isOpen={showCreateColumnModal}
          onClose={handleCreateColumnModalClose}
          dashboardId={id}
          onClick={handleReRender}
        />
      )}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 flex h-12 w-12 items-center justify-center text-[#5534da] hover:text-[#452c92]"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

const getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

Page.getLayout = getLayout;
