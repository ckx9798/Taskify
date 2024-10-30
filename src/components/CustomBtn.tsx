import Image from "next/image";

interface CustomBtnProps {
  content?: string;
  width: number;
  height: number;
  borderRadius: "4" | "6" | "8";
  fontSize?: "12" | "14" | "16" | "18";
  fontWeight?: "500" | "600" | "700";
  onClick?: () => void;
}

export default function CustomBtn({
  content,
  width,
  height,
  fontSize,
  fontWeight,
  borderRadius,
  onClick,
}: CustomBtnProps) {
  return (
    <div className={"flex"}>
      <button
        onClick={onClick}
        className={
          "flex items-center justify-center gap-3 border border-gray-400 bg-white"
        }
        style={{
          width: `${width}px`,
          height: `${height}px`,
          fontSize: `${fontSize}px`,
          fontWeight: `${fontWeight}`,
          borderRadius: `${borderRadius}px`,
        }}
      >
        <span>{content}</span>
        {content !== "대시보드 삭제하기" ? (
          <Image src="/svg/plus.svg" alt="+" width={20} height={20} />
        ) : null}
      </button>
    </div>
  );
}
