// TaskFormModal.tsx
import React, { useState, ChangeEvent, useEffect } from "react";
import CommonModal from "./CommonModal";
import BoxButton from "@/components/BoxButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { createCard } from "@/libs/api/cards";
import { Column, getColumns, uploadCardImage } from "@/libs/api/columns";
import { MemberType } from "@/libs/api/Members";
import { PostResponse, PostCard } from "@/libs/api/cards";
import { getMembers } from "@/libs/api/Members";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  column: number;
  dashboardId: number;
  onCreate: (card: PostResponse) => void;
}

// 태그 색상 매핑
const tagColors: { [key: string]: string } = {
  urgent: "#FF5733", // 빨간색
  important: "#FFC300", // 노란색
  optional: "#DAF7A6", // 연두색
  // 필요한 태그와 색상을 추가하세요
};

const getTagColor = (tag: string): string => {
  return tagColors[tag.toLowerCase()] || "#6B7280"; // 기본 회색
};

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  column,
  dashboardId,
  onCreate,
}) => {
  const [formData, setFormData] = useState<PostCard>({
    assigneeUserId: 0,
    dashboardId: dashboardId,
    columnId: column,
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    imageUrl: undefined,
  });
  const [members, setMembers] = useState<MemberType[]>([]);
  const [allColumns, setAllColumns] = useState<Column[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 대시보드 멤버 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers({ dashboardId, page: 0 });
        if (response && response.members) {
          setMembers(response.members);
          // Set initial assignee to the first member
          if (response.members.length > 0) {
            const firstMember = response.members[0];
            setFormData((prevData) => ({
              ...prevData,
              assigneeUserId: firstMember.id,
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };
    fetchMembers();
  }, [dashboardId]);

  // 대시보드 컬럼 가져오기
  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await getColumns(dashboardId);
        if (response && response.data) {
          setAllColumns(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch columns:", error);
      }
    };
    fetchColumns();
  }, [dashboardId]);

  // 폼 유효성 검사
  const isFormValid =
    formData.title.trim() !== "" &&
    formData.description.trim() !== "" &&
    formData.assigneeUserId !== 0 &&
    formData.dashboardId !== 0 &&
    formData.columnId !== 0 &&
    formData.dueDate.trim() !== "" &&
    formData.tags.length > 0;

  // 이미지 업로드 핸들러 (이미지 선택 시 미리보기만 설정)
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImage(file);
      setError("");
    }
  };

  // URL 해제
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // 입력값 변경 핸들러
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

  // 마감일 변경 핸들러
  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: date ? date.toISOString() : "",
    }));
  };

  // 태그 추가 핸들러
  const handleAddTag = () => {
    if (tagsInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagsInput.trim()],
      }));
      setTagsInput("");
    }
  };

  // 태그 제거 핸들러
  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // 마지막 태그 제거 핸들러 (Backspace 사용 시)
  const handleRemoveLastTag = () => {
    if (formData.tags.length > 0) {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.slice(0, -1),
      }));
    }
  };

  // 카드 생성 핸들러
  const handleCreateCard = async () => {
    if (!isFormValid) return;

    setIsLoading(true); // 로딩 시작

    let uploadedImageUrl: string | undefined = undefined;

    if (image) {
      try {
        const data = await uploadCardImage(formData.columnId, image);
        uploadedImageUrl = data.imageUrl;
      } catch (err) {
        console.error("이미지 업로드 실패:", err);
        setError("이미지 업로드에 실패했습니다.");
        setIsLoading(false); // 로딩 종료
        return;
      }
    }

    const postCard: PostCard = {
      assigneeUserId: formData.assigneeUserId,
      dashboardId: formData.dashboardId,
      columnId: formData.columnId,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      tags: formData.tags,
      imageUrl: uploadedImageUrl,
    };

    try {
      const response = await createCard(postCard);
      onCreate(response);
      handleCloseModal();
    } catch (error) {
      console.error("카드 생성 실패:", error);
      setError("할 일 생성을 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 모달 닫기 시 폼 초기화
  const handleCloseModal = () => {
    onClose();
    setFormData({
      assigneeUserId: members.length > 0 ? members[0].id : 0,
      dashboardId: dashboardId,
      columnId: column,
      title: "",
      description: "",
      dueDate: "",
      tags: [],
      imageUrl: undefined,
    });
    setTagsInput("");
    setImagePreview(null);
    setImage(null);
    setError("");
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={handleCloseModal}
      hideCloseButton={false}
    >
      <div className="flex flex-col gap-6 p-6">
        <h2 className="text-2xl font-bold text-black-200">할 일 생성</h2>

        {/* 상태 선택 드롭다운 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="columnId">상태</label>
          <select
            id="columnId"
            value={formData.columnId}
            onChange={handleChange}
            className="h-12 w-full rounded-lg border border-gray-300 p-4 text-black"
          >
            {allColumns.map((col) => (
              <option key={col.id} value={col.id}>
                {col.title}
              </option>
            ))}
          </select>
        </div>

        {/* 담당자 선택 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="assigneeUserId">담당자</label>
          <select
            id="assigneeUserId"
            value={formData.assigneeUserId}
            onChange={handleChange}
            className="h-12 w-full rounded-lg border border-gray-300 p-4 text-black"
          >
            <option value="">담당자 선택</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.nickname}
              </option>
            ))}
          </select>
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
            id="dueDate"
            selected={formData.dueDate ? new Date(formData.dueDate) : null}
            onChange={handleDateChange}
            placeholderText="마감일을 선택해주세요"
            className="h-12 w-full rounded-lg border border-gray-300 p-4 text-black"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* 태그 입력 및 표시 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="tags">태그</label>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-300 p-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 flex items-center rounded-full px-2 py-1"
                style={{ backgroundColor: getTagColor(tag) }}
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-sm font-bold"
                  onClick={() => handleRemoveTag(index)}
                  aria-label={`Remove tag ${tag}`}
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && tagsInput.trim() !== "") {
                  e.preventDefault();
                  handleAddTag();
                } else if (e.key === "Backspace" && tagsInput === "") {
                  e.preventDefault();
                  handleRemoveLastTag();
                }
              }}
              placeholder="태그를 입력하고 Enter를 누르세요"
              className="flex-grow rounded-lg border border-gray-300 p-4 text-black focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-blue-500 ml-2 rounded px-3 py-1 text-white"
            >
              추가
            </button>
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="image">이미지 업로드 (최대 1개)</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="h-12 w-full rounded-lg border border-gray-300 p-4 text-black"
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="업로드된 이미지"
              className="mt-2 h-32 w-32 rounded object-cover"
              width={128}
              height={128}
            />
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
            onClick={handleCreateCard}
          >
            {isLoading ? "생성 중..." : "생성"}
          </BoxButton>
        </div>
      </div>
    </CommonModal>
  );
};

export default TaskFormModal;
