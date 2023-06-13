export type AudioDataProps = {
  audioUrl: string;
  audioContentType: string;
  waveformDataUrl: string;
};

export type SelectAudioProps = (evt: string) => void;

export type SegmentProps = {
  id: string;
  startTime: number;
  endTime: number;
  color: string;
  customAttribute: string;
};

export type OverviewOptionsConfigProps = (
  overviewWaveformRef: React.RefObject<HTMLDivElement>
) => {
  container: HTMLDivElement | null;
  waveformColor: string;
  playedWaveformColor: string;
  highlightColor: string;
  showPlayheadTime: boolean;
  playheadTextColor: string;
};

export type ZoomviewOptionsConfigProps = (
  zoomviewWaveformRef: React.RefObject<HTMLDivElement>
) => {
  container: HTMLDivElement | null;
  waveformColor: string;
  playedWaveformColor: string;
  playheadColor: string;
  playheadTextColor: string;
  showPlayheadTime: boolean;
  timeLabelPrecision: number;
};
