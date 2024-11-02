import baseaxios from "./axios";

export interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnData {
  title: string;
  dashboardId: number;
}

interface UploadImageResponse {
  imageUrl: string;
}

// 새로운 컬럼을 생성하는 함수
export async function createColumn(columnData: ColumnData): Promise<Column> {
  const response = await baseaxios.post<Column>(`/columns`, {
    title: columnData.title,
    dashboardId: columnData.dashboardId,
  });
  return response.data;
}

interface ColumnList {
  result: string;
  data: Column[];
}

// 컬럼 목록을 가져오는 함수
export async function getColumns(dashboardId: number): Promise<ColumnList> {
  const response = await baseaxios.get<ColumnList>(`/columns`, {
    params: {
      dashboardId,
    },
  });
  return response.data;
}
// export async function getColumns(
//   dashboardId: number,
// ): Promise<{ result: string; data: Column[] }> {
//   const response = await baseaxios.get<{ result: string; data: Column[] }>(
//     `/columns`,
//     {
//       params: {
//         dashboardId,
//       },
//     },
//   );
//   return response.data;
// }
// 기존 컬럼을 수정하는 함수
export async function updateColumn(columnId: number, columnData: ColumnData) {
  const response = await baseaxios.put(`/columns/${columnId}`, columnData);
  return response.data;
}
// 컬럼을 삭제하는 함수
export async function deleteColumn(columnId: number) {
  const response = await baseaxios.delete(`/columns/${columnId}`);
  return response.data;
}

// 컬럼에 카드 이미지를 업로드하는 함수
export async function uploadCardImage(
  columnId: number,
  imageFile: File,
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await baseaxios.post<UploadImageResponse>(
    `/columns/${columnId}/card-image`,
    formData,
  );
  console.log(response);
  return response.data;
}
