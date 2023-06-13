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
  const updatedSegments = peaks!.segments.getSegments().map((segment, idx) => ({
    id: segment.id,
    startTime: segment.startTime,
    endTime: segment.endTime,
    duration: segment.endTime - segment.startTime,
    color: segment.color,
    labelText: segment.labelText,
    customAttribute: segment.customAttribute,
  }));
  peaks?.segments.removeAll();

  console.log(updatedSegments);

  setSegments(updatedSegments);
};
