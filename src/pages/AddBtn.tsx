const widths = {
  add_1: "w-[354px]",
  add_2: "w-[544px]",
  add_3: "w-[284px]",
  new_1: "w-[332px]",
  new_2: "w-[247px]",
  new_3: "w-[260px]",
  todo_1: "w-[314px]",
  todo_2: "w-[544px]",
  todo_3: "w-[284px]",
  del_1: "w-[320px]",
  del_2: "w-[320px]",
  del_3: "w-[284px]",
};

const heights = {
  add_3: "h-[66px]",
  new_3: "h-[58px]",
  del_1: "h-[62px]",
  del_2: "h-[62px]",
  del_3: "h-[52px]",
  todo_1: "h-[40px]",
  todo_2: "h-[40px]",
  todo_3: "h-[32px]",
};

const contents = {
  column: "새로운 컬럼 추가하기",
  dashboard: "새로운 대시보드",
  delete: "대시보드 삭제하기",
};

export default function AddBtn({ content, wsize, hsize = "h-[70px]" }) {
  const buttonWidth = widths[wsize];
  const buttonHeight = heights[hsize];

  return (
    <div className={"flex"}>
      <div
        className={`rounded  bg-white flex items-center justify-center gap-3 border border-gray-400 
          ${buttonWidth} ${buttonHeight}`}
      >
        <span>{contents[content]}</span>
        {content !== "delete" ? <img src="/svg/plus.svg" alt="icon" /> : ""}
      </div>
    </div>
  );
}
