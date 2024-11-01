import Image from "next/image";

interface Dashboard {
  title: string;
  color: string;
  createdByMe: boolean;
}

interface DashboardCardProps {
  dashboard: Dashboard;
  isArrow?: boolean;
  isResponse?: boolean;
}

export default function DashboardCard({
  dashboard,
  isArrow = false,
  isResponse = false,
}: DashboardCardProps) {
  return (
    <div
      className={`flex items-center py-5 xl:px-5 ${isResponse ? "justify-between px-7" : "justify-center px-2"} md:justify-between`}
    >
      <div className="flex items-center md:max-w-[192px] md:gap-3 xl:max-w-[250px] xl:gap-6">
        <span
          className="flex h-2 w-2 flex-shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: dashboard.color }}
        />
        {isResponse ? (
          <span className="font-medium text-gray-500">{dashboard.title}</span>
        ) : (
          <span className="hidden overflow-hidden text-ellipsis whitespace-nowrap font-medium text-gray-500 md:inline md:text-sm xl:text-lg">
            {dashboard.title}
          </span>
        )}

        {dashboard.createdByMe ? (
          <div className={"hidden md:inline"}>
            <Image src="/svg/crown.svg" width={17} height={14} alt="Crown" />
          </div>
        ) : null}
      </div>
      {isArrow ? (
        <Image src="/svg/dashboardArrow.svg" width={18} height={18} alt=">" />
      ) : null}
    </div>
  );
}
