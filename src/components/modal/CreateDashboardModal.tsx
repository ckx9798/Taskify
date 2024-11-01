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
  const [title, setTitle] = useState<string>("비브리지");
  const [color, setColor] = useState<string>("#7AC555");
  const [selectedColor, setSelectedColor] = useState<string>("#7AC555");

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
      window.location.reload();
    } catch (error) {
      console.log("대시보드 생성 에러", error);
    }
  };

  // 페이지 진입 시 모달 닫기
  if (!isOpen) return null;

  // 새로운 대시보드 생성 모달창
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bottom-0 left-0 right-0 top-0 h-[360px] w-[347px] rounded-2xl bg-white p-5 shadow-lg md:h-[344px] md:w-[584px] md:p-9">
        <div>
          <h2 className="mb-7 text-xl font-bold md:text-2xl">
            새로운 대시보드
          </h2>
          <label
            htmlFor="대시보드"
            className={"text-base font-medium md:text-lg"}
          >
            대시보드 이름
          </label>
          <input
            type="text"
            placeholder="생성할 대시보드 이름을 입력해 주세요"
            className="mb-5 mt-4 w-full rounded-lg border p-3 placeholder:text-sm md:placeholder:text-lg"
            required
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
