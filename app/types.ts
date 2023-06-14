import { WaveformColor } from "peaks.js";

export type AudioDataProps = {
  audioUrl: string;
  audioContentType: string;
  waveformDataUrl: string;
};

export type TestSegmentProps = {
  id: string | undefined;
  startTime: number;
  endTime: number;
  duration: number;
  color: WaveformColor | undefined;
  labelText: string | undefined;
  customAttribute: unknown;
};

export type StartTimesProps = {
  idx: number;
  startTime: number;
};

export type ClipDataProps = {
  idx: number;
  id: string | undefined;
  startTime: number;
  endTime: number;
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
