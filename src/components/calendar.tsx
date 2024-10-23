import React from 'react';
import Image from 'next/image';

interface CalendarInputProps {
  inputId: string;
  placeholder?: string;
}

const CalendarInput = ({ inputId, placeholder = 'Select date' }: CalendarInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={inputId}
        className="w-full h-[5rem] border-[0.1rem] border-[var(--gray_D9D9D9)] rounded-[0.8rem] p-[1.5rem] pr-[4rem] bg-[var(--white_FFFFFF)] text-[var(--black_333236)] outline-none"
        type="text"
        placeholder={placeholder}
        disabled
      />
      <Image
        className="absolute top-[50%] right-[1.5rem] transform -translate-y-[50%]"
        src="/public/svg/calendar.svg"
        alt="calendarIcon"
        width={24}
        height={24}
      />
    </div>
  );
};

export default CalendarInput;
