import React, { ChangeEvent } from "react";
import { CharDetails } from "../types";

interface CharSelectProps {
  chars: CharDetails[];
  isXing?: boolean;
  selectIndex: number;
  setSelectIndex: (index: number) => void;
}

const CharSelect: React.FC<CharSelectProps> = ({
  chars,
  isXing = false,
  selectIndex,
  setSelectIndex,
}) => {
  const color = isXing ? "purple" : "rose";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectIndex(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-${color}-800 bg-transparent text-[2rem]`}>
        {chars[selectIndex]?.pinyin}
      </div>
      <select
        className={`text-${color}-800 bg-transparent text-[5rem] w-[1.3em]`}
        name="xing"
        value={selectIndex}
        onChange={handleChange}
      >
        {chars.map((char, i) => (
          <option className="text-lg bg-sky-50" key={char.char} value={i}>
            {char.char}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CharSelect;
