const playAudioFiles = (audioFiles: HTMLAudioElement[]) => {
  const play = (i: number) => {
    if (i >= audioFiles.length) return;
    const audio = audioFiles[i];
    audio.addEventListener("ended", () => play(i + 1));
    audio.play();
  };
  play(0);
};
export default playAudioFiles;
