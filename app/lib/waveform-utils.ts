import { PeaksInstance, Segment } from "peaks.js";
import { TestSegmentProps } from "../types";
import { ChangeEvent } from "react";

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
      return { ...obj, id: evt.target.value };
    }

    //otherwise return the object unchanged
    return obj;
  });

  //set segments state with the updated state
  setSegments(newState);
};

export const handleStartTimeChange = (
  idx: number,
  evt: ChangeEvent<HTMLInputElement>,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  //used for two way bind of filename input element to correct object in segments
  const newState = segments.map((obj) => {
    //if current object startTime matches startTime for the filename input -> update the clips startTime

    if (obj.startTime === segments[idx].startTime) {
      console.log(
        parseInt(evt.target.value) < obj.endTime,
        parseInt(evt.target.value)
      );
      return {
        ...obj,
        startTime:
          parseInt(evt.target.value) < obj.endTime
            ? parseInt(evt.target.value)
            : 0,
      };
    }

    //otherwise return the object unchanged
    return obj;
  });

  //set segments state with the updated state
  setSegments(newState);
};

export const handleEndTimeChange = (
  idx: number,
  evt: ChangeEvent<HTMLInputElement>,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  //used for two way bind of filename input element to correct object in segments
  const newState = segments.map((obj) => {
    //if current object endTime matches endTime for the filename input -> update the clips endTime
    if (obj.endTime === segments[idx].endTime) {
      console.log(
        parseInt(evt.target.value) < obj.endTime,
        parseInt(evt.target.value)
      );
      return {
        ...obj,
        endTime:
          parseInt(evt.target.value) > obj.startTime
            ? parseInt(evt.target.value)
            : segments[idx + 1].startTime - 1,
      };
    }

    //otherwise return the object unchanged
    return obj;
  });

  //set segments state with the updated state
  setSegments(newState);
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

export const deleteAllSegments = (
  peaks: PeaksInstance | undefined,
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  peaks?.segments.removeAll();
  setSegments([]);
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
