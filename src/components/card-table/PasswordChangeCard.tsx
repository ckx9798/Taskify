import MypageInput from "./mypageInput";
import { useState } from "react";
import { ChangePassword } from "@/libs/api/auth";
import ErrorMessageModal from "./ErrorMessageModal";

export default function PasswordChangeCard() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [checkNewPw, setCheckNewPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalClose = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const changePw = async (e) => {
    e.preventDefault();
    try {
      const data = await ChangePassword({
        password: currentPw,
        newPassword: newPw,
      });

      if (data && data.newPassword) {
        setCheckNewPw(data.newPassword);
      }

      // Clear the input fields upon successful password change
      setCurrentPw("");
      setNewPw("");
      setCheckNewPw("");
      setErrorMessage(""); // Clear any previous error messages
      console.log("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data.message || JSON.stringify(error.response.data)
          : error.message;
      setErrorMessage(message); // Set the error message
      setIsModalOpen(true); // Open the modal
    }
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
          <form className={"flex w-full max-w-[624px] flex-col gap-6"}>
            <MypageInput
              inputText="현재 비밀번호"
              inputType="password"
              labelId="currentPw"
              placeholder="비밀번호 입력"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
            />

            <MypageInput
              inputText="새 비밀번호"
              inputType="password"
              labelId="newPw"
              placeholder="새 비밀번호 입력"
              value={newPw}
              onChange={handleValidation} // 변경 사항
            />
            <MypageInput
              inputText="새 비밀번호 확인"
              inputType="password"
              labelId="checkNewPw"
              placeholder="새 비밀번호 입력"
              value={checkNewPw}
              onChange={(e) => setCheckNewPw(e.target.value)}
            />

            <label
              className={
                "flex h-12 w-full items-center justify-center rounded-lg bg-blue p-4 font-semibold text-white"
              }
              htmlFor="clickButton"
            >
              <button type="submit" onClick={changePw} id="clickButton">
                변경
              </button>

              {isModalOpen && (
                <ErrorMessageModal
                  errorMessage={errorMessage}
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
