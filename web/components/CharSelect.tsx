import React, { ChangeEvent, useState } from "react";
import { CharDetails } from "../types";

interface CharSelectProps {
  chars: CharDetails[];
  isXing?: boolean;
}

const CharSelect: React.FC<CharSelectProps> = ({ chars, isXing = false }) => {
  const color = isXing ? "green" : "red";

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndex(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-${color}-800 text-[2rem]`}>
        {chars[selectedIndex]?.pinyin_tone}
      </div>
      <select
        className={`text-${color}-800 text-[5rem]`}
        name="xing"
        value={selectedIndex}
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
