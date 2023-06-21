import { TestSegmentProps } from "../types";

//function to find gap with a specific duration
export const findGap = (segments: TestSegmentProps[], gapDuration: number) => {
  return segments.findIndex((seg, idx, arr) => {
    if (idx + 1 < arr.length) {
      return arr[idx + 1].startTime - arr[idx].endTime! >= gapDuration;
    }
  });
};

export const createNewSegmentObject = (
  segments: TestSegmentProps[],
  gapIdx: number
) => {
  return {
    id: segments.length.toString(),
    fileName: `clip-${parseInt(segments.length.toString()) + 1}`,
    startTime: segments[gapIdx].endTime! + 0.5,
    endTime: segments[gapIdx].endTime! + 8.5,
    editable: true,
    color: "#1E1541",
    labelText: "new clip",
    formErrors: {
      fileNameError: false,
      startTimeError: false,
      endTimeError: false,
    },
  };
};

export const insertNewSegment = (
  segments: TestSegmentProps[],
  gapIdx: number,
  newSegment: TestSegmentProps
) => {
  return [
    ...segments.slice(0, gapIdx + 1),
    newSegment,
    ...segments.slice(gapIdx + 1),
  ];
};
