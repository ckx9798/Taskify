interface MypageInputProps {
  inputText: string;
  inputType: string;
  labelId: string;
  placeholder?: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

// 마이페이지 내 비밀번호 변경에 쓰이는 input
export default function MypageInput({
  inputText,
  inputType,
  labelId,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}: MypageInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={labelId}>{inputText}</label>
      <input
        className={`h-12 w-full rounded-lg border p-4 ${error ? "border-red" : "border-gray-200"} bg-white`}
        type={inputType}
        placeholder={placeholder}
        id={labelId}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
}
