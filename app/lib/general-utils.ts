import { TestSegmentProps } from "../types";

//////////////////////////////////////////////////////////////////////
//
//             find a gap in the segments of a specific duration
//
//
export const findGap = (segments: TestSegmentProps[], gapDuration: number) => {
  return segments.findIndex((seg, idx, arr) => {
    if (idx + 1 < arr.length) {
      return arr[idx + 1].startTime - arr[idx].endTime! >= gapDuration;
    }
  });
};
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//
//             Create a new segment 8 seconds long at a predetermined
//             location on the time line - uses the gapIdx returned from
//             the search for 10 / 5 second gap search and segment length
//
export const createNewSegmentObject = (
  segments: TestSegmentProps[],
  gapIdx: number,
  clipLength: number
) => {
  return {
    id: segments.length.toString(),
    fileName: `clip-${parseInt(segments.length.toString()) + 1}`,
    startTime: segments[gapIdx].endTime! + 0.5,
    endTime: segments[gapIdx].endTime! + clipLength + 0.5,
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
