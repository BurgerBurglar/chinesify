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
  const color = isXing ? "green" : "red";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectIndex(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-${color}-800 text-[2rem]`}>
        {chars[selectIndex]?.pinyin_tone}
      </div>
      <select
        className={`text-${color}-800 text-[5rem]`}
        name="xing"
        value={selectIndex}
        onChange={handleChange}
      >
        {chars.map((char, i) => (
          <option className="text-lg" key={char.char} value={i}>
            {char.char}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CharSelect;
