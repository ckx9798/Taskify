import MypageInput from "./MypageInput";
import { FormEvent, useState } from "react";
import { ChangePassword } from "@/libs/api/auth";
import ErrorMessageModal from "./ErrorMessageModal";

export default function PasswordChangeCard() {
  const [currentPw, setCurrentPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [checkNewPw, setCheckNewPw] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [currentPwError, setCurrentPwError] = useState("");
  const [newPwError, setNewPwError] = useState("");
  const [checkNewPwError, setCheckNewPwError] = useState("");

  // 비밀번호 변경 요청 함수
  const changePw = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await ChangePassword({
        password: currentPw,
        newPassword: newPw,
      });
      setCurrentPw("");
      setNewPw("");
      setCheckNewPw("");
      setErrorMessage("");
      setSuccessMessage("비밀번호 변경 성공!");
      setIsModalOpen(true);
    } catch (error: any) {
      const message =
        error.response && error.response.data
          ? error.response.data.message || JSON.stringify(error.response.data)
          : error.message;
      setErrorMessage(message);
      setIsModalOpen(true);
    }
  };

  // 비밀번호 변경 요청 성공,실패 시 뜨는 모달 닫기
  const modalClose = (e: FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={
          "flex h-auto w-full max-w-[672px] flex-col gap-6 rounded-2xl bg-white p-6"
        }
      >
        <div>
          <h2 className={"text-we text-2xl font-bold"}>비밀번호 변경</h2>
        </div>

        <div className={"flex gap-11"}>
          <form className={"flex w-full max-w-[624px] flex-col gap-3"}>
            {/* 현재 비밀번호  */}
            <MypageInput
              inputText="현재 비밀번호"
              inputType="password"
              labelId="currentPw"
              placeholder="비밀번호 입력"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              error={currentPwError}
              onBlur={(e) => {
                if (e.target.value.length < 8) {
                  setCurrentPwError("8자 이상 입력해주세요.");
                } else {
                  setCurrentPwError("");
                }
              }}
            />
            <p className={"mt-0 text-sm text-red"}>{currentPwError}</p>
            {/* 새 비밀번호 */}
            <MypageInput
              inputText="새 비밀번호"
              inputType="password"
              labelId="newPw"
              placeholder="새 비밀번호 입력"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              error={newPwError}
              onBlur={(e) => {
                if (e.target.value.length < 8) {
                  setNewPwError("8자 이상 입력해주세요.");
                } else {
                  setNewPwError("");
                }
              }}
            />
            <p className={"mt-0 text-sm text-red"}>{newPwError}</p>
            {/* 새 비밀번호 확인 */}
            <MypageInput
              inputText="새 비밀번호 확인"
              inputType="password"
              labelId="checkNewPw"
              placeholder="새 비밀번호 입력"
              value={checkNewPw}
              onChange={(e) => setCheckNewPw(e.target.value)}
              error={checkNewPwError}
              onBlur={(e) => {
                if (e.target.value !== newPw) {
                  setCheckNewPwError("비밀번호가 일치하지 않습니다.");
                } else {
                  setCheckNewPwError("");
                }
              }}
            />
            <p className={"mt-0 text-sm text-red"}>{checkNewPwError}</p>
            {/* 비밀번호 변경 버튼 */}
            <label
              className={
                "flex h-12 w-full items-center justify-center rounded-lg bg-blue p-4 font-semibold text-white"
              }
              htmlFor="clickButton"
            >
              <button
                type="submit"
                onClick={changePw}
                id="clickButton"
                disabled={checkNewPwError !== "" || newPwError !== ""}
              >
                변경
              </button>

              {/* 에러 메시지 보여주는 모달 */}
              {isModalOpen && (
                <ErrorMessageModal
                  errorMessage={errorMessage}
                  successMessage={successMessage}
                  width={"368px"}
                  height={"192px"}
                  modalClose={modalClose}
                />
              )}
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
