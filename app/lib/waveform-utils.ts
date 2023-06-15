import { PeaksInstance, Segment } from "peaks.js";
import { TestSegmentProps, FileNameErrorsProps } from "../types";
import { ChangeEvent } from "react";

export const createFileNameError = (
  segments: TestSegmentProps[],
  setFileNameErrors: React.Dispatch<React.SetStateAction<FileNameErrorsProps[]>>
) => {
  const errors = segments.map((seg, idx) => ({
    idx: idx,
    isError: seg.id == "",
  }));

  setFileNameErrors(errors);

  console.log("inside fileerror function", errors);
};

export const handleFilenameChange = (
  idx: number,
  evt: ChangeEvent<HTMLInputElement>,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  //used for two way bind of filename input element to correct object in segments
  const newState = segments.map((obj) => {
    //if current object id matches id for the filename input -> update the clips id
    if (obj.id === segments[idx].id) {
      return { ...obj, id: evt.target.value, labelText: evt.target.value };
    }

    //otherwise return the object unchanged
    return obj;
  });

  //set segments state with the updated state
  setSegments(newState);
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
  console.log("You created the following segments", segments);
  setSegments([]);
  peaks?.destroy();
};

export const deleteSingleSegment = (
  peaks: PeaksInstance | undefined,
  id: string | undefined,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  console.log({ id });
  peaks?.segments.removeById(id!);
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
