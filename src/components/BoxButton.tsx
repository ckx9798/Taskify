interface LoginButtonProps {
  paddingTopBottom: string;
  paddingRightLeft: string;
  radius: "4" | "8";
  backgroundColor: "purple" | "white";
  fontSize: "12" | "14" | "16" | "18";
  children: string;
  disabled: boolean;
  onClick: () => void;
}

export default function BoxButton({
  paddingTopBottom,
  paddingRightLeft,
  radius,
  backgroundColor,
  fontSize,
  children,
  disabled = false,
  onClick,
}: LoginButtonProps) {
  const borderValue = {
    purple: "",
    white: "border-solid border-gray-300 border",
  };

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
      style={{
        padding: `${paddingTopBottom}px ${paddingRightLeft}px`,
      }}
      className={`${borderValue[backgroundColor]} ${radiusValue[radius]} ${backgroundColorValue[backgroundColor]} ${hoverColorValue[backgroundColor]} ${textColorValue[backgroundColor]} ${fontSizeValue[fontSize]} text-center  disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:text-white disabled:cursor-not-allowed disabled: border-none`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
