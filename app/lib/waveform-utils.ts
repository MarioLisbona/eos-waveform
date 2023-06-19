import { PeaksInstance } from "peaks.js";
import { TestSegmentProps } from "../types";
import { ChangeEvent } from "react";

export const handleFileNameChange = (
  id: string,
  evt: ChangeEvent<HTMLInputElement>,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  //used for two way bind of filename input element to correct segment in segments
  //also used to track the the error boolean for the file name input
  const newSegState = segments.map((seg) => {
    //if the current segment id matches the id passed from the segment then bind the new value entered to the segment object
    //assign the fileNameError to true if the file name input is empty
    if (seg.id === id) {
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

export const handleStartTimeChange = (
  id: string,
  evt: ChangeEvent<HTMLInputElement>,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>,
  myPeaks: PeaksInstance
) => {
  const newSegState = segments.map((seg, idx) => {
    if (seg.id === id) {
      let tempStartTimeInput = parseInt(evt.target.value);

      if (idx == 0) {
        // console.log("first index", segments[idx]);
        if (parseInt(evt.target.value) < 0) {
          tempStartTimeInput = 0;
        }

        if (parseInt(evt.target.value) > seg.endTime) {
          tempStartTimeInput = seg.endTime - 0.5;
        }

        if (evt.target.value === "") {
          tempStartTimeInput = 0;
        }
        return {
          ...seg,
          startTime: tempStartTimeInput,
        };
      }
    }
    //otherwise return the segment unchanged
    return seg;
  });

  //use the updated segment to update the segments state
  setSegments(newSegState);
};

export const handleEndTimeChange = (
  id: string,
  evt: ChangeEvent<HTMLInputElement>,
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>,
  myPeaks: PeaksInstance | undefined
) => {
  //used for two way bind of end time input element to correct segment in segments
  const newSegState = segments.map((seg, idx: number) => {
    if (seg.id === id) {
      return {
        ...seg,
        endTime:
          parseInt(evt.target.value) > seg.startTime &&
          parseInt(evt.target.value) < segments[idx + 1].startTime
            ? parseInt(evt.target.value)
            : myPeaks?.player.getDuration(),
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

// console logs the segments after all edits
//set segments to empty array and destroy peaks instance to free resources
export const createAllSegments = (
  peaks: PeaksInstance | undefined,
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>,
  segments: TestSegmentProps[]
) => {
  console.log("Exporting clip data and destroying Peaks instance", segments);
  // setSegments([]);
  // peaks?.destroy();
};

export const deleteSingleSegment = (
  peaks: PeaksInstance | undefined,
  id: string,
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  //removed the clip object related from the id prop passed to function
  peaks?.segments.removeById(id);

  //return the updated array of segments with getSegments() and map over that to create the object structure we need
  const updatedSegments: TestSegmentProps[] = peaks!.segments
    .getSegments()
    .map((segment) => ({
      id: segment.id,
      fileName: segment.fileName,
      startTime: segment.startTime,
      endTime: segment.endTime,
      editable: segment.editable,
      color: segment.color,
      labelText: segment.labelText,
      formErrors: segment.formErrors,
    }));
  //remove all the peaks segments to avoid duplicate id's
  peaks?.segments.removeAll();
  //update the date of segments with the new array
  setSegments(updatedSegments);
};
