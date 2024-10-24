import Image from "next/image";

export default function ProfileCard() {
  return (
    <>
      <div
        className={
          "w-full max-w-[672px] h-96 rounded-2xl p-6 flex flex-col gap-6 bg-red-100 "
        }
      >
        <div>
          <h2 className={"text-2xl font-bold text-we"}>프로필</h2>
        </div>

        <div className={"flex gap-11"}>
          <div
            className={
              "w-44 min-w-[182px] h-44 bg-gray-300 flex justify-center items-center"
            }
          >
            <Image src="/svg/add_box.svg" alt="+" width={30} height={30} />
          </div>
          <form className={"w-full max-w-[400px]  flex flex-col gap-6"}>
            <div>
              <h3>이메일</h3>
              <input
                className={"w-full h-12 p-4 rounded-lg border border-gray-400"}
                type="email"
                placeholder="asd@naver.com"
              />
            </div>
            <div>
              <h3>닉네임</h3>
              <input
                className={"w-full h-12 p-4 rounded-lg border border-gray-400"}
                type="email"
                placeholder="배유철"
              />
            </div>
            <div
              className={
                "w-full h-12 p-4 rounded-lg bg-blue-700 flex justify-center items-center text-white font-semibold"
              }
            >
              <button> 저장 </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
