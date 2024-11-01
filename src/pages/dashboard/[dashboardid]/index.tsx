import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Column from "@/components/Column";
import { getColumns } from "@/libs/api/columns";
import CustomBtn from "@/components/CustomBtn";
import CreateColumn from "@/components/modal/CreateColumn";
import Layout from "@/components/Layout";

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
          const columnData = await getColumns(id);
          setColumnList(columnData.data);
        } catch (error) {
          console.error("컬럼 목록 조회 실패: " + error);
        }
      };

      fetchData();
    }
  }, [router.isReady, id]);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <ul className="flex w-[308px] flex-col md:w-[584px] xl:w-[354px] xl:flex-row">
        {columnList?.map((column, index) => (
          <Column
            key={column.id}
            columnId={column.id}
            columnTitle={column.title}
            isFirst={index === 0}
          />
        ))}
        <li className="h-fit px-3 pb-[49px] pt-4 md:p-5 xl:pl-0 xl:pt-[75px]">
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
        />
      )}
    </div>
  );
}

const getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

Page.getLayout = getLayout;
