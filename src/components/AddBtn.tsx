import Image from "next/image";

interface AddBtnProps {
  content: string;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  fontWeight: number;
  borderRadius: number;
}

export default function AddBtn({
  content,
  paddingX,
  paddingY,
  fontSize,
  fontWeight,
  borderRadius,
}: AddBtnProps) {
  return (
    <div className={"flex"}>
      <div
        className={
          "bg-white flex items-center justify-center gap-3 border border-gray-400"
        }
        style={{
          paddingRight: `${paddingX}px`,
          paddingLeft: `${paddingX}px`,
          paddingTop: `${paddingY}px`,
          paddingBottom: `${paddingY}px`,
          fontSize: `${fontSize}px`,
          fontWeight: `${fontWeight}`,
          borderRadius: `${borderRadius}px`,
        }}
      >
        <span>{content}</span>
        {content !== "대시보드 삭제하기" ? (
          <Image src="/svg/plus.svg" alt="+" width={20} height={20} />
        ) : null}
      </div>
    </div>
  );
}
