import { CharDetails } from "../types";

const getAudioElements = (name: CharDetails[]) => {
  if (typeof Audio === "undefined") return [];
  return name.map((char) => {
    const audio = new Audio(char?.pronunciation);
    audio.playbackRate = 2;
    return audio;
  });
};
export default getAudioElements;
