export default function AddTodoBtn({ size }) {
  const widths = {
    t_1: "314px",
    t_2: "544px",
    t_3: "284px",
  };
  return (
    <div className={"flex"}>
      <div
        className={
          "h-[40px]  rounded  bg-white flex items-center justify-center gap-3 border border-gray-400"
        }
        style={{ width: widths[size] }}
      >
        <img src="/svg/plus.svg" />
      </div>
    </div>
  );
}
