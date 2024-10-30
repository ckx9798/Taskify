import { useState } from "react";
import SelectColorCircle from "./SelectColorCircle";
import { createDashboard } from "@/libs/api/dashboards";

interface CreateDashboardModalProps {
  isOpen: boolean;
  refresh: () => void;
  closeModal: () => void;
}

export default function CreateDashboardModal({
  isOpen,
  refresh,
  closeModal,
}: CreateDashboardModalProps) {
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // 대시보드 생성 api 함수
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDashboard({ title, color });
      //get을 다시
      refresh();
      //모달닫기
      closeModal();
      //색선택 초기화
      setSelectedColor("");
    } catch (error) {
      console.log("대시보드 생성 에러", error);
    }
  };

  // 페이지 진입 시 모달 닫기
  if (!isOpen) return null;

  // 새로운 대시보드 생성 모달창
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-[21.5rem] w-[36.5rem] rounded-2xl bg-white p-9 shadow-lg">
        <div>
          <h2 className="mb-7 text-2xl font-bold">새로운 대시보드</h2>
          <label htmlFor="대시보드" className={"text-lg font-medium"}>
            대시보드 이름
          </label>
          <input
            type="text"
            placeholder="생성할 대시보드 이름을 입력해 주세요"
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
                    setColor={setColor}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                ),
              )}
            </ul>
          </div>
          <div className="mt-8 flex justify-end gap-2">
            <button
              className={
                "h-14 w-1/2 rounded bg-gray-100 px-4 py-2 hover:bg-violet hover:text-white"
              }
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className={
                "w-1/2 rounded bg-gray-100 px-4 py-2 hover:bg-violet hover:text-white"
              }
              onClick={handleCreateSubmit}
            >
              생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
