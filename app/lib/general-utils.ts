//function to find gap with a specific duration
export const findGap = (segments: TestSegmentProps[], gapDuration: number) => {
  return segments.findIndex((seg, idx, arr) => {
    if (idx + 1 < arr.length) {
      return arr[idx + 1].startTime - arr[idx].endTime >= gapDuration;
    }
  });
};
