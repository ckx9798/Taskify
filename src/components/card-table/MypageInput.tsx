interface MypageInputProps {
  inputText: string;
  inputType: string;
  labelId: string;
  placeholder?: string;
  value: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MypageInput: React.FC<MypageInputProps> = ({
  inputText,
  inputType,
  labelId,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={labelId}>{inputText}</label>
      <input
        className="h-12 w-full rounded-lg border border-gray-400 p-4"
        type={inputType}
        placeholder={placeholder}
        id={labelId}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default MypageInput;
