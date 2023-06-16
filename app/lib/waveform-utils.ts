import { PeaksInstance, Segment } from "peaks.js";
import { TestSegmentProps, FileNameErrorsProps } from "../types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

//create an array of booleans that map to the file name input for each clip object
export const createFileNameError = (
  segments: TestSegmentProps[],
  setFileNameErrors: React.Dispatch<React.SetStateAction<FileNameErrorsProps[]>>
) => {
  const errors = segments.map((seg, idx) => ({
    idx: idx,
    isError: seg.id == "",
  }));

  setFileNameErrors(errors);
};

export const handleFileNameChange = (
  idx: number,
  evt: ChangeEvent<HTMLInputElement>,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>,
  fileNameErrors: FileNameErrorsProps[],
  setFileNameErrors: Dispatch<SetStateAction<FileNameErrorsProps[]>>
) => {
  //used for two way bind of filename input element to correct segment in segments
  const newSegState = segments.map((seg) => {
    //if current segment index matches index for the filename input -> update the segments file name with the input box value
    if (seg.idx === idx) {
      return {
        ...seg,
        fileName: evt.target.value,
        labelText: evt.target.value,
      };
    }

    //otherwise return the segment unchanged
    return seg;
  });

  //map over the errors to change the boolean for isError for that particular input element
  const newErrorState = fileNameErrors.map((error) => {
    //finding the corresponding element for the input box selected
    //conditional to make isError true of the input element is empty
    if (error.idx === idx) {
      return {
        ...error,
        isError: evt.target.value == "" ? true : false,
      };
    }
    return error;
  });

  //set segments state with the updated state
  setSegments(newSegState);

  //set the state with the new array of booleans
  setFileNameErrors(newErrorState);
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
      customAttribute: segment.customAttribute,
    }));
  peaks?.segments.removeAll();

  setSegments(updatedSegments);
};
