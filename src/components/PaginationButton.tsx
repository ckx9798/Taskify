import React from "react";

interface PaginationButtonProps {
  size: "large" | "small";
  children: React.ReactNode;
}

export default function PaginationButton({
  size,
  children,
}: PaginationButtonProps) {
  const childArray = React.Children.toArray(children);

  const paddingValue = {
    large: "p-3",
    small: "p-[10px]",
  };

  return (
    <div className=" flex w-fit bg-white rounded border-solid border-gray-300 border">
      <button
        className={`${paddingValue[size]} border-r border-r-gray-300 flex-1 flex items-center justify-center`}
      >
        {childArray[0]}
      </button>
      <button
        className={`${paddingValue[size]} border-l border-l-gray-300 flex-1 flex items-center justify-center`}
      >
        {childArray[1]}
      </button>
    </div>
  );
}
