import { PeaksInstance, Segment } from "peaks.js";
import { TestSegmentProps } from "../types";

export const deleteAllSegments = (
  peaks: PeaksInstance | undefined,
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  peaks?.segments.removeAll();
  setSegments([]);
};

export const createAllSegments = (
  peaks: PeaksInstance | undefined,
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>,
  segments: TestSegmentProps[]
) => {
  console.log("You created the following segments", segments);
  setSegments([]);
  peaks?.destroy();
};

export const deleteSingleSegment = (
  peaks: PeaksInstance | undefined,
  id: string,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  console.log({ id });
  peaks?.segments.removeById(id);
  console.log(peaks?.segments.getSegments());
  peaks?.segments.removeAll();

  setSegments([
    {
      id: "segment-1-EOS-test",
      startTime: 100.046625,
      endTime: 105.046625,
      duration: 5,
      color: "#1E1541",
      labelText: "This is some label text - maybe File Name?",
      customAttribute: "This is segment 1 for audio track EOS-test",
    },
  ]);
};
