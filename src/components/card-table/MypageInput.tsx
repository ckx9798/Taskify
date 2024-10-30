interface MypageInputProps {
  inputText: string;
  inputType: string;
  labelId: string;
  placeholder?: string;
  value: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: any) => void;
  error: string;
}

// 마이페이지 내 비밀번호 변경에 쓰이는 input
const MypageInput: React.FC<MypageInputProps> = ({
  inputText,
  inputType,
  labelId,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={labelId}>{inputText}</label>
      <input
        className="h-12 w-full rounded-lg border p-4"
        style={{ borderColor: error === "" ? "gray-100" : "red" }}
        type={inputType}
        placeholder={placeholder}
        id={labelId}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </div>
  );
};

export default MypageInput;
