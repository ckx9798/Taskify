import { GetServerSideProps } from "next";
import baseaxios from "@/libs/api/axios";

interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

interface ParentComponentProps {
  columns: Column[];
}

const ParentComponent: React.FC<ParentComponentProps> = ({ columns }) => {
  const columnss = columns.data;
  return (
    <div>
      <h1>안녕하세요</h1>
      <ul>
        {columnss.map((column) => (
          <li key={column.id}>{column.title}</li>
        ))}
      </ul>
    </div>
  );
};

// getServerSideProps 함수
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  // 요청의 쿠키를 가져옵니다.
  const cookies = req.headers.cookie;
  try {
    const response = await baseaxios.get("/columns?dashboardId=12174");

    console.log("응답 데이터:", response.data);

    return {
      props: {
        columns: response.data,
      },
    };
  } catch (error) {
    console.error("컬럼 목록 조회 실패:", error);
    return {
      props: {
        columns: [],
      },
    };
  }
};

export default ParentComponent;
