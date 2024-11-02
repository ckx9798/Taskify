import CommonModal from "@/components/modal/CommonModal";
import React, { useState } from "react";
import BoxButton from "../BoxButton";
import { createDashboardInvitation } from "../../libs/api/dashboards";

interface DashboardInviteProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
}

const DashboardInvite: React.FC<DashboardInviteProps> = ({
  isOpen,
  onClose,
  dashboardId,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
  };

  const handleInvite = async () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createDashboardInvitation(dashboardId, email);
      // 초대가 성공하면 모달을 닫고 상태를 초기화합니다.
      onClose();
      setEmail("");
      setEmailError(null);
    } catch (error) {
      console.error("대시보드 초대 중 오류 발생:", error);
      setEmailError("초대하는 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setEmail("");
    setEmailError(null);
  };

  return (
    <div>
      <CommonModal
        isOpen={isOpen}
        onClose={handleClose}
        hideCloseButton={false}
      >
        <div className="flex flex-col gap-6">
          <p className="text-[24px] font-bold text-black-200">초대하기</p>
          <div className="flex flex-col gap-2">
            <p>이메일</p>
            <input
              className={`h-[50px] w-full rounded-lg border p-4 text-black ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null); // 입력이 변경될 때 에러 메시지를 초기화합니다.
              }}
              placeholder="이메일 주소를 입력해주세요"
            />
            {emailError && (
              <p className="text-red-500 text-[14px]">{emailError}</p>
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
              onClick={handleClose}
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
              disabled={!email || isSubmitting}
              onClick={handleInvite}
            >
              {isSubmitting ? "초대 중..." : "초대"}
            </BoxButton>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default DashboardInvite;
