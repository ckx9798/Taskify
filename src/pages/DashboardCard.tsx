import Image from "next/image";

// 사이드바에서 보여지는 각 대시보드
export default function DashboardCard({ dashboard }) {
  return (
    <div className={"flex"}>
      <div
        className={
          "flex h-[70px] w-[354px] items-center justify-between rounded border border-gray-400 bg-white p-5"
        }
      >
        <div className={"flex items-center gap-3"}>
          <div
            className={"flex h-2 w-2 items-center justify-center rounded-full"}
            style={{ backgroundColor: dashboard.color }}
          />
          <span className={"text-lg font-medium text-gray-500"}>
            {dashboard.title}
          </span>
          {dashboard.createdByMe ? (
            <Image src="/svg/crown.svg" width={17} height={14} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
