import Image from "next/image";

interface Dashboard {
  title: string;
  color: string;
  createdByMe: boolean;
}

interface DashboardCardProps {
  dashboard: Dashboard;
  isArrow?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  dashboard,
  isArrow = false,
}) => {
  return (
    <div className="flex items-center justify-center px-2 py-5 md:justify-between xl:px-5">
      <div className="flex items-center gap-6">
        <span
          className="flex h-2 w-2 items-center justify-center rounded-full"
          style={{ backgroundColor: dashboard.color }}
        />
        <span className="hidden font-medium text-gray-500 md:inline md:text-base xl:text-lg">
          {dashboard.title}
        </span>
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
};

export default DashboardCard;
