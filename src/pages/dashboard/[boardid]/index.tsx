// import Column from "@/components/Column";
// import { getColumns } from "@/libs/api/columns";
// import { GetServerSideProps } from "next/types";

// interface Column {
//   id: number;
//   title: string;
//   teamId: string;
//   dashboardId: number;
//   createdAt: string;
//   updatedAt: string;
// }

// interface PageProps {
//   columns: Column[];
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { dashboardid } = context.params ?? {};
//   console.log("Dashboard ID:", dashboardid);
//   if (!dashboardid || Array.isArray(dashboardid)) {
//     return {
//       notFound: true,
//     };
//   }

//   const id = Number(dashboardid);

//   if (isNaN(id)) {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     const columnData = await getColumns(id);
//     console.log("Column Data:", columnData); // 추가: 데이터 출력 확인
//     return {
//       props: {
//         columns: columnData.data,
//       },
//     };
//   } catch (error) {
//     console.error("컬럼 목록 조회 실패:", error);
//     return {
//       notFound: true,
//     };
//   }
// };

// export default function Page({ columns }: PageProps) {
//   return (
//     <div>
//       <ul>
//         {columns?.map((column) => (
//           <Column
//             key={column.id}
//             columnId={column.id}
//             columnTitle={column.title}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Column from "@/components/Column";
import { getColumns } from "@/libs/api/columns";
import CardModal from "@/components/modal/CardModal";
import CustomBtn from "@/components/CustomBtn";
import CreateColumn from "@/components/modal/CreateColumn";

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
    <main>
      <ul className="ml-auto flex w-[308px] flex-col bg-gray-100 md:w-[584px]">
        {columnList?.map((column, index) => (
          <Column
            key={column.id}
            columnId={column.id}
            columnTitle={column.title}
            isFirst={index === 0}
          />
        ))}
        <li className="h-fit px-3 pb-[49px] pt-4 md:p-5">
          <CustomBtn
            content={"새로운 컬럼 추가하기"}
            paddingTopBottom={screenSize === "mobile" ? 20 : 22}
            paddingRightLeft={
              screenSize === "mobile" ? 62 : screenSize === "tablet" ? 168 : 85
            }
            fontSize={screenSize === "mobile" ? 13 : 18}
            fontWeight={"700"}
            borderRadius={8}
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
    </main>
  );
}
