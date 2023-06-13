import { PeaksInstance, Segment } from "peaks.js";
import { TestSegmentProps } from "../data/segmentData";

export const DeleteAllSegments = (
  peaks: PeaksInstance | undefined,
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  peaks?.segments.removeAll();
  console.log(setSegments([]));
};
