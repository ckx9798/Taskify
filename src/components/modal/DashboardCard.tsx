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
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center gap-3">
        <div
          className="flex h-2 w-2 items-center justify-center rounded-full"
          style={{ backgroundColor: dashboard.color }}
        />
        <span className="text-lg font-medium text-gray-500">
          {dashboard.title}
        </span>
        {dashboard.createdByMe ? (
          <Image src="/svg/crown.svg" width={17} height={14} alt="Crown" />
        ) : null}
      </div>
      {isArrow ? (
        <Image src="/svg/dashboardArrow.svg" width={18} height={18} alt=">" />
      ) : null}
    </div>
  );
};

export default DashboardCard;
