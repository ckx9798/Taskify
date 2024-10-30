import Image from "next/image";

interface SelectColorCircleProps {
  color: string;
  setColor: (color: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

// 색상을 선택해서 대시보드 만들때 적용하는 컴포넌트
export default function SelectColorCircle({
  color,
  setColor,
  selectedColor,
  setSelectedColor,
}: SelectColorCircleProps) {
  return (
    <button
      className={"flex h-6 w-6 items-center justify-center rounded-full"}
      style={{ backgroundColor: `${color}` }}
      onClick={() => {
        setColor(color);
        setSelectedColor(color);
      }}
    >
      {color === selectedColor ? (
        <Image
          src="/svg/color_check.svg"
          width={15}
          height={11}
          alt="색상선택"
        />
      ) : (
        ""
      )}
    </button>
  );
}
