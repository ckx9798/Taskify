// TaskEditModal.tsx
import React, { useState, ChangeEvent, useEffect } from "react";
import CommonModal from "./CommonModal";
import BoxButton from "@/components/BoxButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { DetailResponse, editCard, getDetailCard } from "@/libs/api/cards"; // EditCard 함수 임포트
import { Column, getColumns, uploadCardImage } from "@/libs/api/columns";
import { MemberType, getMembers } from "@/libs/api/Members";
import { PutCard, EditResponse } from "@/libs/api/cards"; // PutCard 타입 임포트
import addImage from "@/../public/image/addImage.svg";
import editImage from "@/../public/image/editImage.svg";
import TagItem from "../TagItem";

interface TaskEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number; // 수정할 카드의 ID
  onUpdate: (card: EditResponse) => void; // 수정 후 부모 컴포넌트로 결과 전달
}

type FontColor = {
  "bg-linen-100": "text-diserria-400";
  "bg-liceFlower-100": "text-atlantis-400";
  "bg-pinkLace-200": "text-fuchsiaPiknk-500";
  "bg-linkWater-100": "text-azureRadiance-600";
};

const colors: (keyof FontColor)[] = [
  "bg-linen-100",
  "bg-liceFlower-100",
  "bg-pinkLace-200",
  "bg-linkWater-100",
];

const TaskEditModal: React.FC<TaskEditModalProps> = ({
  isOpen,
  onClose,
  cardId,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Omit<PutCard, "dashboardId">>({
    assigneeUserId: 0,
    columnId: 0,
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    imageUrl: "",
  });
  const [members, setMembers] = useState<MemberType[]>([]);
  const [allColumns, setAllColumns] = useState<Column[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dashboardId, setDashboardId] = useState<number>(0);
  const [isComposing, setIsComposing] = useState(false);

  // 카드 상세 조회
  useEffect(() => {
    const fetchDetailCard = async () => {
      try {
        const detail: DetailResponse = await getDetailCard(cardId);
        setFormData({
          assigneeUserId: detail.assignee.id,
          columnId: detail.columnId,
          title: detail.title,
          description: detail.description,
          dueDate: detail.dueDate,
          tags: detail.tags,
          imageUrl: detail.imageUrl || "",
        });
        setImagePreview(detail.imageUrl || null);
        setDashboardId(detail.dashboardId);
      } catch (error) {
        console.error("카드 상세 조회 실패:", error);
        setError("카드 상세 정보를 가져오는데 실패했습니다.");
      }
    };

    if (isOpen) {
      fetchDetailCard();
    }
  }, [cardId, isOpen]);

  // 멤버 데이터 가져오기 (기존과 동일)
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers({ dashboardId, page: 1 });
        if (response && response.members) {
          setMembers(response.members);
          if (response.members.length > 0 && formData.assigneeUserId === 0) {
            setFormData((prev) => ({
              ...prev,
              assigneeUserId: response.members[0].id,
            }));
          }
        }
      } catch (error) {
        console.error("멤버 데이터 가져오기 실패:", error);
      }
    };

    if (isOpen && dashboardId > 0) {
      fetchMembers();
    }
  }, [isOpen, dashboardId, formData.assigneeUserId]);

  // 대시보드 컬럼 가져오기 (기존과 동일)
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await getColumns(dashboardId);
        if (response && response.data) {
          setAllColumns(response.data);
          if (response.data.length > 0 && formData.columnId === 0) {
            setFormData((prev) => ({
              ...prev,
              columnId: response.data[0].id,
            }));
          }
        }
      } catch (error) {
        console.error("컬럼 데이터 가져오기 실패:", error);
      }
    };

    if (isOpen && dashboardId > 0) {
      fetchColumns();
    }
  }, [isOpen, dashboardId, formData.columnId]);

  // 폼 유효성 검사 (기존과 동일)
  const isFormValid =
    formData.title.trim() !== "" &&
    formData.description.trim() !== "" &&
    formData.assigneeUserId > 0 &&
    formData.columnId > 0 &&
    formData.dueDate.trim() !== "" &&
    formData.tags.length > 0;

  // 이미지 업로드 핸들러 (기존과 동일)
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
      setError("");
    }
  };

  // URL 해제 (기존과 동일)
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // 입력값 변경 핸들러 (기존과 동일)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;

    let newValue: string | number = value;

    if (id === "assigneeUserId" || id === "columnId") {
      newValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  // 날짜를 "YYYY-MM-DD HH:MM" 형식으로 변환하는 함수 (기존과 동일)
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 마감일 변경 핸들러 (기존과 동일)
  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: date ? formatDateToString(date) : "",
    }));
  };

  // 태그 추가 핸들러 (기존과 동일)
  const handleAddTag = () => {
    if (tagsInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagsInput.trim()],
      }));
      setTagsInput("");
    }
  };

  // 태그 제거 핸들러 (기존과 동일)
  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // 마지막 태그 제거 핸들러 (기존과 동일)
  const handleRemoveLastTag = () => {
    if (formData.tags.length > 0) {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.slice(0, -1),
      }));
    }
  };

  // 카드 수정 핸들러
  const handleEditCard = async () => {
    if (!isFormValid) {
      setError("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    setIsLoading(true);

    let uploadedImageUrl: string | undefined = formData.imageUrl;

    if (imageFile) {
      try {
        const data = await uploadCardImage(formData.columnId, imageFile);
        console.log("Uploaded Image URL:", data.imageUrl);
        uploadedImageUrl = data.imageUrl;
      } catch (err) {
        console.error("이미지 업로드 실패:", err);
        setError("이미지 업로드에 실패했습니다.");
        setIsLoading(false);
        return;
      }
    }

    const updatedTask: Omit<
      EditResponse,
      "id" | "assignee" | "teamId" | "createdAt" | "updatedAt"
    > = {
      ...formData,
      imageUrl: uploadedImageUrl,
      dashboardId, // 상세 조회에서 가져온 dashboardId 사용
    };

    try {
      const response: EditResponse = await editCard(updatedTask, cardId); // cardId를 별도로 전달
      console.log("카드 수정 응답:", response);
      onUpdate(response);
      handleCloseModal();
    } catch (error) {
      console.error("카드 수정 실패:", error);
      setError("카드 수정을 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 모달 닫기 시 폼 초기화
  const handleCloseModal = () => {
    onClose();
    setFormData({
      assigneeUserId: members.length > 0 ? members[0].id : 0,
      columnId: allColumns.length > 0 ? allColumns[0].id : 0,
      title: "",
      description: "",
      dueDate: "",
      tags: [],
      imageUrl: "",
    });
    setTagsInput("");
    setImagePreview(null);
    setImageFile(null);
    setError("");
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={handleCloseModal}
      hideCloseButton={false}
    >
      <div className="flex flex-col gap-6 p-6">
        <h2 className="text-2xl font-bold text-black-200">할 일 수정</h2>

        {/* 상태 선택 드롭다운 */}
        <div className="flex justify-between gap-3">
          <div className="flex w-[50%] flex-col gap-2">
            <label htmlFor="columnId" className="text-black-200">
              상태
            </label>
            <select
              id="columnId"
              value={formData.columnId}
              onChange={handleChange}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 py-2 text-black"
            >
              {allColumns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          {/* 담당자 선택 */}
          <div className="flex w-[50%] flex-col gap-2">
            <label htmlFor="assigneeUserId" className="text-black-200">
              담당자
            </label>
            <select
              id="assigneeUserId"
              value={formData.assigneeUserId}
              onChange={handleChange}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 py-2 text-black"
            >
              {members.map((member) => (
                <option key={member.userId} value={member.userId}>
                  <Image
                    src={member.profileImageUrl || "/image/default-profile.png"}
                    alt={member.nickname}
                    width={24}
                    height={24}
                    className="mr-2 rounded-full"
                  />
                  {member.nickname}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 제목 입력 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요"
            className="h-12 w-full rounded-lg border border-gray-300 p-4 text-black"
          />
        </div>

        {/* 설명 입력 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="설명을 입력해주세요"
            className="h-24 w-full rounded-lg border border-gray-300 p-4 text-black"
          />
        </div>

        {/* 마감일 변경 컴포넌트 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="dueDate">마감일</label>
          <DatePicker
            autoComplete="off"
            id="dueDate"
            selected={formData.dueDate ? new Date(formData.dueDate) : null}
            onChange={handleDateChange}
            placeholderText="마감일을 선택해주세요"
            className="h-12 w-full rounded-lg border border-gray-300 p-4 text-black"
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="시간"
          />
        </div>

        {/* 태그 입력 및 표시 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className="text-black-200">
            태그
          </label>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-300">
            {formData.tags.map((tag, index) => (
              <>
                <TagItem
                  key={index}
                  tagName={tag}
                  backgroundColor={colors[index % colors.length]}
                />
                <button
                  type="button"
                  className="ml-0.5 text-sm font-bold"
                  onClick={() => handleRemoveTag(index)}
                  aria-label={`Remove tag ${tag}`}
                >
                  &times;
                </button>
              </>
            ))}
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isComposing) {
                  e.preventDefault();
                  handleAddTag();
                } else if (e.key === "Backspace" && tagsInput === "") {
                  e.preventDefault();
                  handleRemoveLastTag();
                }
              }}
              placeholder="태그를 입력하고 Enter를 누르세요"
              className="flex-grow rounded-lg p-4 text-black focus:outline-none"
            />
          </div>
        </div>
        {/* 이미지 업로드 */}
        <div className="flex flex-col gap-2">
          <p className="text-black-200">이미지</p>
          <label className="group relative inline-block h-32 w-32 cursor-pointer">
            {imagePreview ? (
              <div className="relative h-full w-full">
                <Image
                  src={imagePreview}
                  alt="업로드된 이미지"
                  className="h-full w-full rounded object-cover"
                  layout="fill"
                />
                {/* 호버 효과를 위한 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50">
                  <Image
                    src={editImage}
                    alt="수정 아이콘"
                    className="h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    width={32}
                    height={32}
                  />
                </div>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={addImage} // 원하는 기본 이미지 경로
                  alt="이미지 업로드"
                  className="h-full w-full rounded object-cover"
                  layout="fill"
                />
                {/* 호버 효과를 위한 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center rounded bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50">
                  <Image
                    src={editImage}
                    alt="수정 아이콘"
                    className="h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    width={32}
                    height={32}
                  />
                </div>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            )}
          </label>
          {/* 이미지 삭제 버튼 */}
          {imagePreview && (
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setImageFile(null);
              }}
              className="bg-red-500 hover:bg-red-600 mt-2 rounded px-3 py-1 text-white transition-colors duration-300"
              aria-label="이미지 삭제"
            >
              이미지 삭제
            </button>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-red-500">{error}</p>}

        {/* 버튼 */}
        <div className="flex gap-4">
          <BoxButton
            width="50%"
            paddingTopBottom="14"
            paddingRightLeft="46"
            radius="8"
            backgroundColor="white2"
            fontSize="16"
            onClick={handleCloseModal}
          >
            취소
          </BoxButton>
          <BoxButton
            width="50%"
            paddingTopBottom="14"
            paddingRightLeft="46"
            radius="8"
            backgroundColor="purple"
            fontSize="16"
            disabled={!isFormValid || isLoading}
            onClick={handleEditCard}
          >
            {isLoading ? "수정 중..." : "수정"}
          </BoxButton>
        </div>
      </div>
    </CommonModal>
  );
};

export default TaskEditModal;
