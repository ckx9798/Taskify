interface TagProps {
  tagName: string;
  backgroundColor: keyof typeof fontColor;
}

const fontColor = {
  "bg-linen-100": "text-diserria-400",
  "bg-liceFlower-100": "text-atlantis-400",
  "bg-pinkLace-200": "text-fuchsiaPiknk-500",
  "bg-linkWater-100": "text-azureRadiance-600",
} as const;

export default function TagItem({ tagName, backgroundColor }: TagProps) {
  return (
    <div
      className={`w-fit rounded ${backgroundColor} px-1.5 py-1 text-center text-xs font-normal ${fontColor[backgroundColor]} md:py-0.5 md:text-sm`}
    >
      {tagName}
    </div>
  );
}
