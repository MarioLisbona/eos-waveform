import { WaveformColor } from "peaks.js";

export type AudioDataProps = {
  audioUrl: string;
  audioContentType: string;
  waveformDataUrl: string;
};

export type TestSegmentProps = {
  idx: number;
  id: string | undefined;
  fileName: string | unknown;
  startTime: number;
  endTime: number;
  duration: number;
  color: WaveformColor | undefined;
  labelText: string | undefined;
  formErrors: FormErrorsProps;
};

export type FormErrorsProps = {
  fileNameError: boolean;
  startTimeError: boolean;
  endTimeError: boolean;
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

export type FileNameErrorsProps = {
  idx: number;
  isError: boolean;
};
