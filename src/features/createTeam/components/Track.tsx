import { useEffect, useState } from "react";

const Track = ({
  styles,
  index,
  handleNeeds,
}: {
  styles: string;
  index: number;
  handleNeeds: (index: number, value: number) => void;
}) => {
  const [count, setCount] = useState<number>(1);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  useEffect(() => {
    handleNeeds(index, count);
  }, [count, handleNeeds, index]);

  return (
    <div
      className={`absolute right-44 flex items-center gap-2 rounded-lg p-2 sm:right-10 sm:top-6 ${styles}`}
    >
      <div className="flex items-center gap-1">
        <span className="h-[32px] w-[32px] rounded-[8px] bg-blue-100 px-[12px] py-[7px] text-center">
          {count}
        </span>
        <div className="flex h-[33px] w-[27px] flex-col items-center justify-center gap-0 rounded-[8px] bg-blue-100 py-5 text-primary-second">
          <button
            type="button"
            onClick={handleIncrement}
            disabled={count >= 3}
            className="h-4 w-fit cursor-pointer border-none bg-transparent text-lg"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            className="w-fit cursor-pointer bg-transparent text-lg"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default Track;
