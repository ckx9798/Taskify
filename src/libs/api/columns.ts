import axios from "axios";

interface ColumnData {
  title: string;
  dashboardId: number;
}

interface ColumnResponseData {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = "https://sp-taskify-api.vercel.app/9-2";

// 새로운 컬럼을 생성하는 함수
async function createColumn(
  columnData: ColumnData,
): Promise<ColumnResponseData> {
  const response = await axios.post(`${BASE_URL}/columns`, columnData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

// 컬럼 목록을 가져오는 함수
async function getColumns(): Promise<ColumnResponseData> {
  const response = await axios.get(`${BASE_URL}/columns`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

// 기존 컬럼을 수정하는 함수
async function updateColumn(
  columnId: string,
  columnData: ColumnData,
): Promise<ColumnResponseData> {
  const response = await axios.put(
    `${BASE_URL}/columns/${columnId}`,
    columnData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
}
// 컬럼을 삭제하는 함수
async function deleteColumn(columnId: string) {
  const response = await axios.delete(`${BASE_URL}/columns/${columnId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

// 컬럼에 카드 이미지를 업로드하는 함수
async function uploadCardImage(
  columnId: string,
  imageFile: File,
): Promise<{
  imageUrl: "string";
}> {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axios.post(
    `${BASE_URL}/columns/${columnId}/card-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}
