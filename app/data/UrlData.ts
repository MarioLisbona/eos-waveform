export type UrlDataProps = {
  audioUrl: string;
  audioContentType: string;
  waveformDataUrl: string;
};

export const urls = [
  {
    audioUrl: "bird-song.mp3",
    audioContentType: "audio/mpeg",
    waveformDataUrl: "bird-song.dat",
  },
  {
    audioUrl: "car-passing.mp3",
    audioContentType: "audio/mpeg",
    waveformDataUrl: "car-passing-2channel.dat",
  },
  {
    audioUrl: "Instrumental.mp3",
    audioContentType: "audio/mpeg",
    waveformDataUrl: "Instrumental.dat",
  },
];
