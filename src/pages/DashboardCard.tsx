export default function DashboardCard() {
  return (
    <div className={"flex"}>
      <div
        className={
          "w-[354px] h-[70px]  rounded  bg-white flex items-center justify-between border border-gray-400 p-5"
        }
      >
        <div className={"flex gap-3"}>
          <span> 🔴 </span>
          <span> 비브리지 </span>
          <img src="/svg/crown.svg" />
        </div>
        <img src="/svg/dashboardArrow.svg" />
      </div>
    </div>
  );
}
