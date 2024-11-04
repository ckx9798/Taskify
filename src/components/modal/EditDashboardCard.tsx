import React, { useEffect, useState } from "react";
import SelectColorCircle from "./SelectColorCircle";
import { getDashboardDetail, updateDashboard } from "@/libs/api/dashboards";

interface EditDashboardCardProps {
  dashboardId: number | null;
}

export default function EditDashboardCard({
  dashboardId,
}: EditDashboardCardProps) {
  const [selectedColor, setSelectedColor] = useState<string>(""); // 선택된 색상 상태
  const [title, setTitle] = useState<string>(""); // 대시보드 제목 상태

  // 대시보드 변경요청 api
  const editDashboard = async (): Promise<void> => {
    try {
      const data = await updateDashboard(dashboardId, {
        title: title,
        color: selectedColor,
      });
      console.log("대시보드가 성공적으로 업데이트되었습니다:", data);
    } catch (error) {
      console.error("대시보드 업데이트 실패:", error);
    }
  };

  useEffect(() => {
    // dashboardId가 유효한 경우에만 함수 호출
    if (dashboardId !== null && dashboardId !== undefined) {
      fetchDashboardDetail(dashboardId);
    }
  }, [dashboardId]);

  async function fetchDashboardDetail(id: number) {
    const response = await getDashboardDetail(id);
    setSelectedColor(response.color); // 기존 색상 설정
    setTitle(response.title); // 기존 제목 설정
  }

  return (
    <>
      <div className="mb-2 h-[344px] gap-3 rounded-2xl bg-white p-9">
        <p className="mb-2 text-[20px] font-bold md:text-[24px]">{title}</p>
        <div>
          <label htmlFor="대시보드" className={"text-lg font-medium"}>
            대시보드 이름
          </label>
          {/* 변경할 대시보드 title 입력 */}
          <input
            type="text"
            placeholder={title}
            className="mb-5 mt-4 w-full rounded-lg border p-2"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div>
            {/* 색상 선택 동그라미 */}
            <ul className="flex gap-2">
              {["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"].map(
                (color) => (
                  <SelectColorCircle
                    key={color}
                    color={color}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                ),
              )}
            </ul>
          </div>
          {/* 변경 요청을 보내는 버튼 */}
          <div className="mt-8 flex justify-end gap-2 rounded-lg border border-gray-200">
            <button
              className={
                "h-14 w-full rounded px-4 py-2 hover:bg-violet hover:text-white"
              }
              onClick={editDashboard}
            >
              변경
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
