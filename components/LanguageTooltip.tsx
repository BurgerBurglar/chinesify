import { Button, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";
import { RiLightbulbFlashFill } from "react-icons/ri";

const LanguageTooltip = () => {
  return (
    <Tooltip
      label="The results are not optimized for these languages and may not work 100%. You should ask your mom how to write your name in Hanja/Kanji/Chữ Hán. No, seriously."
      closeOnClick
      hasArrow
      shouldWrapChildren
      aria-label="east asian language tooltip"
    >
      <Button
        className="flex items-center gap-1 mt-auto mb-6 font-normal"
        variant="link"
      >
        <Icon as={RiLightbulbFlashFill} className="text-2xl" />
        My name is Japanese, Korean, or Vietnamese
      </Button>
    </Tooltip>
  );
};
export default LanguageTooltip;
