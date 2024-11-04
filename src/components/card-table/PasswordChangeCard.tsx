import MypageInput from "./MypageInput";
import { FormEvent, useState } from "react";
import { ChangePassword } from "@/libs/api/auth";
import ErrorMessageModal from "./ErrorMessageModal";
import axios from "axios";

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
      await ChangePassword({
        password: currentPw,
        newPassword: newPw,
      });
      setCurrentPw("");
      setNewPw("");
      setCheckNewPw("");
      setErrorMessage("");
      setSuccessMessage("비밀번호 변경 성공!");
      setIsModalOpen(true);
    } catch (error) {
      // axios 에러 수정
      if (axios.isAxiosError(error)) {
        const message =
          error.response && error.response.data
            ? error.response.data.message || JSON.stringify(error.response.data)
            : error.message;
        setErrorMessage(message);
        setIsModalOpen(true);
      }
    }
  };

  // 비밀번호 변경 요청 성공,실패 시 뜨는 모달 닫기
  const modalClose = (e?: FormEvent) => {
    e?.preventDefault();
    setIsModalOpen(false);
  };

  const validationCheckNewPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== newPw) {
      setCheckNewPwError("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckNewPwError("");
    }
  };
  const validationNewPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 8) {
      setNewPwError("8자 이상 입력해주세요.");
    } else {
      setNewPwError("");
    }
  };
  const validationCurrentPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 8) {
      setCurrentPwError("8자 이상 입력해주세요.");
    } else {
      setCurrentPwError("");
    }
  };
  return (
    <>
      <div
        className={
          "mt-3 flex h-auto w-full min-w-[180px] max-w-[672px] flex-col gap-6 rounded-2xl bg-white p-6 md:mt-7 xl:min-w-[700px]"
        }
      >
        <h2 className={"-mb-3 text-xl font-bold md:mb-0 md:text-2xl"}>
          비밀번호 변경
        </h2>
        <div className={"flex gap-11"}>
          <form className={"flex w-full flex-col gap-8"}>
            {/* 현재 비밀번호  */}
            <div className={"relative"}>
              <MypageInput
                inputText="현재 비밀번호"
                inputType="password"
                labelId="currentPw"
                placeholder="비밀번호 입력"
                value={currentPw}
                onChange={(e) => {
                  setCurrentPw(e.target.value);
                }}
                error={currentPwError}
                onBlur={validationCurrentPw}
              />
              <p className={"absolute left-2 top-[86px] text-sm text-red"}>
                {currentPwError}
              </p>
            </div>
            {/* 새 비밀번호 */}
            <div className={"relative"}>
              <MypageInput
                inputText="새 비밀번호"
                inputType="password"
                labelId="newPw"
                placeholder="새 비밀번호 입력"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                error={newPwError}
                onBlur={validationNewPw}
              />
              <p className={"absolute left-2 top-[86px] text-sm text-red"}>
                {newPwError}
              </p>
            </div>

            {/* 새 비밀번호 확인 */}
            <div className={"relative"}>
              <MypageInput
                inputText="새 비밀번호 확인"
                inputType="password"
                labelId="checkNewPw"
                placeholder="새 비밀번호 입력"
                value={checkNewPw}
                onChange={(e) => setCheckNewPw(e.target.value)}
                error={checkNewPwError}
                onBlur={validationCheckNewPw}
              />
              <p
                className={
                  "absolute left-2 top-[86px] whitespace-nowrap text-sm text-red"
                }
              >
                {checkNewPwError}
              </p>
            </div>
            {/* 비밀번호 변경 버튼 */}
            <label
              className={
                "mb-8 mt-1 flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-violet p-4 font-semibold text-white"
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
