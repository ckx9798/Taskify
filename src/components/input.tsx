import React, { useState } from "react";
import TagIcon from "@/components/tags";

export interface InputProps {
  inputName: string;
  inputType: string;
  inputWidth: number;
  errorMessage?: string | null;
  errorState: boolean;
  placeholder?: string;
}

export function isValidName(
  text: string,
  minLength: number,
  maxLength: number,
) {
  if (text === "") return;

  const validationRegex = /^[a-zA-Z가-힣]*$/;
  const length = Array.from(text)
    .map((char) => {
      const isKOR = char >= "\u1100" && char <= "\uD7AF";
      const isENG = char >= "a" && char <= "z";
      return isKOR ? 2 : isENG ? 1 : 0;
    })
    .reduce((acc: number, count: number) => acc + count, 0);

  const validateRegexResult = validationRegex.test(text);
  const validateTextLengthResult = length >= minLength && length <= maxLength;
  const validateTextRealLengthResult =
    text.length >= minLength && text.length <= maxLength;

  return !(
    validateRegexResult &&
    validateTextLengthResult &&
    validateTextRealLengthResult
  );
}

const Input = ({
  inputName,
  inputType,
  inputWidth,
  errorMessage = null,
  errorState,
  placeholder = undefined,
}: InputProps) => {
  const customWidth = {
    width: `${inputWidth}rem`,
  };

  const [tags, setTags] = useState(new Set<string>());

  const onKeydownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      if (tags.size >= 4) {
        alert("태그는 최대 4개까지만 추가할 수 있습니다.");
        return;
      }
      if (!isValidName(value, 1, 10)) {
        alert(
          "태그는 영문(1pt) 또는 한글(2pt)만 사용해 10pt 이내로 작성해주세요.",
        );
        return;
      }

      const newTags = new Set(tags);
      newTags.add(value);
      e.currentTarget.value = "";
      setTags(newTags);
    }
  };

  const getDeleteOrder = (value: string) => {
    const newTags = new Set(tags);
    newTags.delete(value);
    setTags(newTags);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label
        className="text-[var(--black_333236)] text-[var(--font16)] font-regular mb-2"
        htmlFor="Input"
      >
        {inputName}
      </label>
      <div className="relative" style={customWidth}>
        {inputType === "tag" ? (
          <>
            <input
              id="Input"
              className={`flex text-left items-center w-full h-[5rem] border-[0.1rem] border-[var(--gray_D9D9D9)] rounded-[0.8rem] p-[1.5rem] pr-[4rem] bg-[var(--white_FFFFFF)] font-[var(--regular)] text-[var(--black_333236)] outline-none 
                                    ${errorState ? "border-red-500" : ""} 
                                    focus:placeholder-transparent`}
              type="text"
              placeholder={placeholder}
              onKeyDown={onKeydownTag}
            />
            <div className="flex absolute top-[110%] left-1 gap-2 mt-2">
              {Array.from(tags).map((value) => (
                <TagIcon
                  key={value}
                  tagName={value}
                  tagStyleType="smallTag"
                  deleteOption={true}
                  onValueChange={getDeleteOrder}
                />
              ))}
            </div>
          </>
        ) : (
          <input
            id="Input"
            className={`flex text-left items-center w-full h-[5rem] border-[0.1rem] border-[var(--gray_D9D9D9)] rounded-[0.8rem] p-[1.5rem] bg-[var(--white_FFFFFF)] font-[var(--regular)] text-[var(--black_333236)] outline-none 
                                ${errorState ? "border-red-500" : ""}`}
            type={inputType === "password" ? "password" : "text"}
            placeholder={placeholder}
          />
        )}
      </div>
      {errorMessage && (
        <div className="text-red-500 mt-1 text-[var(--font14)] font-regular">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;
