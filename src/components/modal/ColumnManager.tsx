import CommonModal from "@/components/modal/CommonModal";
import React, { useEffect, useState } from "react";
import BoxButton from "../BoxButton";
import { Column, getColumns, updateColumn } from "@/libs/api/columns";

interface ColumnManagerProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
  columnId: number;
}

const ColumnManager: React.FC<ColumnManagerProps> = ({
  isOpen,
  onClose,
  dashboardId,
  columnId,
}) => {
  const [columnName, setColumnName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await getColumns(dashboardId);
        setColumns(response.data);
        const currentColumn = response.data.find(
          (column) => column.id === columnId,
        );
        if (currentColumn) {
          setColumnName(currentColumn.title);
        }
      } catch (error) {
        console.error("컬럼을 가져오는 중 오류 발생:", error);
      }
    };

    if (isOpen) {
      fetchColumns();
    }
  }, [isOpen, dashboardId, columnId]);

  const handleUpdateColumn = async () => {
    if (!columnName) return;

    const isNameDuplicate = columns.some(
      (column) => column.title === columnName && column.id !== columnId,
    );

    if (isNameDuplicate) {
      setIsDuplicate(true);
      return;
    }

    try {
      await updateColumn(columnId, {
        title: columnName,
        dashboardId: dashboardId,
      });
      // 성공적으로 수정되면 모달을 닫고 상태를 초기화합니다.
      onClose();
      setColumnName("");
      setIsDuplicate(false);
    } catch (error) {
      console.error("컬럼을 수정하는 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <CommonModal isOpen={isOpen} onClose={onClose} hideCloseButton={false}>
        <div className="flex flex-col gap-6">
          <p className="text-[24px] font-bold text-black-200">컬럼 관리</p>
          <div className="flex flex-col gap-2">
            <p>이름</p>
            <input
              className={`h-[50px] w-full rounded-lg border p-4 text-black ${
                isDuplicate ? "border-red" : "border-gray-300"
              }`}
              type="text"
              value={columnName}
              onChange={(e) => {
                setColumnName(e.target.value);
                setIsDuplicate(false); // 입력이 변경될 때 중복 에러 메시지를 초기화합니다.
              }}
              placeholder="컬럼 이름을 입력해주세요"
            />
            {isDuplicate && (
              <p className="text-[14px] text-red">중복된 컬럼 이름입니다</p>
            )}
          </div>
          <div className="flex gap-2">
            <BoxButton
              width="100%"
              paddingTopBottom="14"
              paddingRightLeft="46"
              radius="8"
              backgroundColor="white2"
              fontSize="16"
              onClick={() => {
                onClose();
                setColumnName("");
                setIsDuplicate(false);
              }}
            >
              취소
            </BoxButton>
            <BoxButton
              width="100%"
              paddingTopBottom="14"
              paddingRightLeft="46"
              radius="8"
              backgroundColor="purple"
              fontSize="16"
              disabled={!columnName}
              onClick={handleUpdateColumn}
            >
              변경
            </BoxButton>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default ColumnManager;
