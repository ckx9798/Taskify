import Image from "next/image";

interface SelectColorCircleProps {
  color: string;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export default function SelectColorCircle({
  color,
  selectedColor,
  setSelectedColor,
}: SelectColorCircleProps) {
  const isSelected = color === selectedColor;

  return (
    <button
      className={`flex h-6 w-6 items-center justify-center rounded-full ${
        isSelected ? "ring-blue-500 ring-2 ring-offset-2" : ""
      }`}
      style={{ backgroundColor: color }}
      onClick={() => setSelectedColor(color)}
    >
      {isSelected && (
        <Image
          src="/svg/color_check.svg"
          width={15}
          height={11}
          alt="색상선택"
        />
      )}
    </button>
  );
}
