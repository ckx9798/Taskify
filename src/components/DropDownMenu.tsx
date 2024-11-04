interface DropdownMenuProps {
  options: { label: string; onClick: () => void }[];
  onClose: () => void;
}

export default function DropDownMenu({ options, onClose }: DropdownMenuProps) {
  return (
    <div className="absolute right-4 top-12 flex flex-col rounded-lg border border-gray-300 bg-white shadow-lg md:right-8 md:top-14">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            option.onClick();
            onClose(); // 옵션 클릭 후 메뉴 닫기
          }}
          className="p-2 text-xs text-black-200 hover:bg-gray-100 md:text-sm"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
