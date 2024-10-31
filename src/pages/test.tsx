import { GetServerSideProps } from "next";
import baseaxios, { setToken } from "@/libs/api/axios";
import { get } from "axios";
import { getColumns } from "@/libs/api/columns";

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
  const columnss = columns;
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
  const cookies = req.headers.cookie as string;
  console.log(cookies);

  try {
    if (cookies) {
      setToken(
        cookies
          .split("; ")
          .find((row: string) => row.startsWith("accessToken="))
          ?.split("=")[1],
      );
    }

    const response = await getColumns(12174);

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
