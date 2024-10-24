export default function ChangePwCard() {
  return (
    <>
      <div
        className={
          "w-full max-w-[672px] h-auto rounded-2xl p-6 flex flex-col gap-6 bg-red-100 "
        }
      >
        <div>
          <h2 className={"text-2xl font-bold text-we"}>비밀번호변경</h2>
        </div>

        <div className={"flex gap-11"}>
          <form className={"w-full max-w-[624px]  flex flex-col gap-6"}>
            <div className={"flex flex-col gap-2"}>
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <input
                className={"w-full h-12 p-4 rounded-lg border border-gray-400"}
                type="email"
                placeholder="비밀번호 입력"
                id="currentPassword"
              />
            </div>
            <div className={"flex flex-col gap-2"}>
              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                className={"w-full h-12 p-4 rounded-lg border border-gray-400"}
                type="email"
                placeholder="새 비밀번호 입력"
                id="newPassword"
              />
            </div>
            <div className={"flex flex-col gap-2"}>
              <label htmlFor="checkNewPassword">새 비밀번호 확인</label>
              <input
                className={"w-full h-12 p-4 rounded-lg border border-gray-400"}
                type="email"
                placeholder="새 비밀번호 입력"
                id="checkNewPassword"
              />
            </div>
            <div
              className={
                "w-full h-12 p-4 rounded-lg bg-blue-700 flex justify-center items-center text-white font-semibold"
              }
            >
              <button> 변경 </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
