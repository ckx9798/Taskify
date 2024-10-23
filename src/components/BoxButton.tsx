interface LoginButtonProps {
  width: string;
  height: string;
  radius: "4" | "8";
  backgroundColor: "purple" | "white";
  fontSize: "12" | "14" | "16" | "18";
  children: string;
  disabled: boolean;
  onClick: () => void;
}

export default function BoxButton({
  width,
  height,
  radius,
  backgroundColor,
  fontSize,
  children,
  disabled = false,
  onClick,
}: LoginButtonProps) {
  const radiusValue = {
    "4": "rounded",
    "8": "rounded-lg",
  };

  const backgroundColorValue = {
    purple: "bg-indigo-700",
    white: "bg-white",
  };

  const hoverColorValue = {
    purple: "hover:bg-indigo-600",
    white: "hover:bg-gray-100",
  };

  const textColorValue = {
    purple: "text-white",
    white: "text-indigo-700",
  };

  const fontSizeValue = {
    "12": "text-xs",
    "14": "text-sm",
    "16": "text-base",
    "18": "text-lg",
  };

  return (
    <button
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`${radiusValue[radius]} ${backgroundColorValue[backgroundColor]} ${hoverColorValue[backgroundColor]} ${textColorValue[backgroundColor]} ${fontSizeValue[fontSize]} text-center  disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white disabled:cursor-not-allowed`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
