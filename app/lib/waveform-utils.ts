import { PeaksInstance, Segment } from "peaks.js";
import { TestSegmentProps, FileNameErrorsProps } from "../types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleFileNameChange = (
  idx: number,
  evt: ChangeEvent<HTMLInputElement>,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  //used for two way bind of filename input element to correct segment in segments
  //also used to track the the error boolean for the file name input
  const newSegState = segments.map((seg) => {
    //if the current segment idx matches the idx passed from the segment then bind the new value entered to the segment object
    //assign the fileNameError to true if the file name input is empty
    if (seg.idx === idx) {
      return {
        ...seg,
        fileName: evt.target.value,
        labelText: evt.target.value,
        formErrors: {
          fileNameError: evt.target.value == "" ? true : false,
          startTimeError: false,
          endTimeError: false,
        },
      };
    }
    //otherwise return the segment unchanged
    return seg;
  });
  //use the updated segment to update the segments state
  setSegments(newSegState);
};

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
  console.log("Exporting clip data and destroying Peaks instance", segments);
  setSegments([]);
  peaks?.destroy();
};

export const deleteSingleSegment = (
  peaks: PeaksInstance | undefined,
  id: string,
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  peaks?.segments.removeById(id);

  const updatedSegments: TestSegmentProps[] = peaks!.segments
    .getSegments()
    .map((segment, idx) => ({
      idx: idx,
      id: segment.id,
      fileName: segment.fileName,
      startTime: segment.startTime,
      endTime: segment.endTime,
      duration: segment.endTime - segment.startTime,
      color: segment.color,
      labelText: segment.labelText,
      formErrors: segment.formErrors,
    }));
  peaks?.segments.removeAll();

  console.log(updatedSegments);

  setSegments(updatedSegments);
};
