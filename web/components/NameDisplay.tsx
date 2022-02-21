import { useClipboard } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useMemo } from "react";
import { MdCheck, MdContentCopy, MdPlayCircleOutline } from "react-icons/md";
import { CharDetails } from "../types";
import getAudioElements from "../utils/getAudioElements";
import playAudioFiles from "../utils/playAudioFiles";
import CharSelect from "./CharSelect";

interface NameDisplayProps {
  xingOptions: CharDetails[] | undefined;
  mingOptions: [CharDetails[], CharDetails[]] | undefined;
  selectedIndices: number[];
  setSelectedIndices: Dispatch<SetStateAction<number[]>>;
}

const NameDisplay: React.FC<NameDisplayProps> = ({
  xingOptions,
  mingOptions,
  selectedIndices,
  setSelectedIndices,
}) => {
  const selectedName = useMemo(
    () => [
      xingOptions![selectedIndices[0]],
      mingOptions![0][selectedIndices[1]],
      mingOptions![1][selectedIndices[2]],
    ],
    [mingOptions, selectedIndices, xingOptions]
  );

  const fullname = selectedName.map((charDetail) => charDetail?.char).join("");

  const { hasCopied, onCopy } = useClipboard(fullname);

  const setSelectedIndex = (selectIndex: number, charIndex: number) => {
    setSelectedIndices((prev) => {
      const duplication = [...prev];
      duplication[charIndex] = selectIndex;
      return duplication;
    });
  };

  const pronunciations = useMemo(
    () => getAudioElements(selectedName),
    [selectedName]
  );

  const onPlay = () => playAudioFiles(pronunciations);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex gap-2">
        <CharSelect
          chars={xingOptions!}
          isXing
          selectIndex={selectedIndices[0]}
          setSelectIndex={(selectIndex) => setSelectedIndex(selectIndex, 0)}
        />
        <CharSelect
          chars={mingOptions![0]}
          selectIndex={selectedIndices[1]}
          setSelectIndex={(selectIndex) => setSelectedIndex(selectIndex, 1)}
        />
        <CharSelect
          chars={mingOptions![1]}
          selectIndex={selectedIndices[2]}
          setSelectIndex={(selectIndex) => setSelectedIndex(selectIndex, 2)}
        />
      </div>
      <div className="flex gap-3 justify-center w-full">
        <button
          className="rounded-full bg-sky-200 hover:bg-sky-300 text-sky-900 text-md w-fit px-4 py-1"
          onClick={onCopy}
        >
          <div className="flex items-center gap-1">
            {hasCopied ? <MdCheck /> : <MdContentCopy />} copy
          </div>
        </button>
        <button
          className="rounded-full bg-sky-200 hover:bg-sky-300 text-sky-900 text-md w-fit px-4 py-1"
          onClick={onPlay}
        >
          <div className="flex items-center gap-1">
            <MdPlayCircleOutline />
            pronounce
          </div>
        </button>
      </div>
    </div>
  );
};
export default NameDisplay;
