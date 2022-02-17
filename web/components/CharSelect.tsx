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
      <div
        className={`text-${color}-900 bg-transparent text-[1.8rem] leading-3 relative right-2`}
      >
        {chars[selectIndex]?.pinyin}
      </div>
      <select
        className={`text-${color}-900 bg-transparent font-caligraphy result-char w-[1.3em] h-[1.3em]`}
        name="xing"
        value={selectIndex}
        onChange={handleChange}
      >
        {chars.map((char, i) => (
          <option
            className="font-sans text-lg bg-sky-50"
            key={char.char}
            value={i}
          >
            {char.char}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CharSelect;
