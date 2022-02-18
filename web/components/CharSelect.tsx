import React, { ChangeEvent } from "react";
import { CharDetails } from "../types";
import { Select } from "@chakra-ui/select";

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
        className={`text-${color}-900 bg-transparent text-[1.8rem] leading-3 relative right-4`}
      >
        {chars[selectIndex]?.pinyin}
      </div>
      <Select
        className={`text-${color}-900 font-caligraphy`}
        variant="unstyled"
        fontSize="5rem"
        value={selectIndex}
        onChange={handleChange}
        sx={{
          option: {
            bgColor: "linkedin.100",
          },
        }}
      >
        {chars.map((char, i) => (
          <option
            className="font-sans text-lg bg-sky-100"
            key={char.char}
            value={i}
          >
            {char.char}
          </option>
        ))}
      </Select>
    </div>
  );
};
export default CharSelect;
