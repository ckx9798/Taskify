import { GetServerSideProps } from "next";

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
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      columns: [],
    },
  };
};

export default ParentComponent;
