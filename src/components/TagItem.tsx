interface TagProps {
  tagName: string;
}

export default function TagItem({ tagName }: TagProps) {
  return (
    <div className="bg-linen-100 text-diserria-400 w-fit rounded px-1.5 py-1 text-center text-xs font-normal md:py-0.5 md:text-sm">
      {tagName}
    </div>
  );
}
