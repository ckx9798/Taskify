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
    <div className="flex w-fit rounded border border-solid border-gray-300 bg-white">
      <button
        className={`${paddingValue[size]} flex flex-1 items-center justify-center border-r border-r-gray-300`}
      >
        {childArray[0]}
      </button>
      <button
        className={`${paddingValue[size]} flex flex-1 items-center justify-center border-l border-l-gray-300`}
      >
        {childArray[1]}
      </button>
    </div>
  );
}
