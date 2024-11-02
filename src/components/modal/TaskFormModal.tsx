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
import addImage from "@/../public/image/addImage.svg";
import editImage from "@/../public/image/editImage.svg";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  column: number;
  dashboardId: number;
  onClickReRender: () => void;
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
  onClickReRender,
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
  const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 파일 상태
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 멤버 데이터 가져온 후 설정
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers({ dashboardId, page: 1 });
        if (response && response.members) {
          setMembers(response.members);
          // 첫 번째 멤버의 userId로 assigneeUserId 설정
          if (response.members.length > 0) {
            const firstMember = response.members[0];
            setFormData((prevData) => ({
              ...prevData,
              assigneeUserId: firstMember.userId,
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
    formData.assigneeUserId > 0 && // 초기값 0을 제외
    formData.dashboardId > 0 &&
    formData.columnId > 0 &&
    formData.dueDate.trim() !== "" &&
    formData.tags.length > 0;

  // 이미지 업로드 핸들러 (파일 선택 시 설정)
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
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

  // 날짜를 "YYYY-MM-DD HH:MM" 형식으로 변환하는 함수
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  // 마감일 변경 핸들러
  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: date ? formatDateToString(date) : "",
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
    if (!isFormValid) {
      setError("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    setIsLoading(true); // 로딩 시작

    let uploadedImageUrl: string | undefined = undefined;

    if (imageFile) {
      // 'image' 대신 'imageFile' 사용
      try {
        const data = await uploadCardImage(formData.columnId, imageFile);
        console.log("Uploaded Image URL:", data.imageUrl); // 이미지 업로드 결과 로그
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

    console.log("Post Card Data:", postCard); // 전송할 데이터 로그

    try {
      const response = await createCard(postCard); // PostCard 전달
      // onCreate(response);
      handleCloseModal();
      onClickReRender();
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
        <h2 className="text-2xl font-bold text-black-200">할 일 생성</h2>

        {/* 상태 선택 드롭다운 */}
        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
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

        {/* 제목 입력 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-black-200">
            제목
          </label>
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
          <label htmlFor="description" className="text-black-200">
            설명
          </label>
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
          <label htmlFor="dueDate" className="text-black-200">
            마감일
          </label>
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
            timeIntervals={15} // 시간 선택 간격 (15분마다 선택 가능)
            timeCaption="시간"
          />
        </div>

        {/* 태그 입력 및 표시 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className="text-black-200">
            태그
          </label>
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
