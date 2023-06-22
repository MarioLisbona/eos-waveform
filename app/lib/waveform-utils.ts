import { PeaksInstance } from "peaks.js";
import { TestSegmentProps } from "../types";
import { ChangeEvent } from "react";
import {
  createNewSegmentObject,
  findGap,
  insertNewSegment,
} from "./general-utils";

export const handlePlayheadSeek = (
  id: string | undefined,
  myPeaks: PeaksInstance | undefined,
  segments: TestSegmentProps[]
) => {
  //find selected segment and move playhead to that segments start time
  const selectedSegment = segments.find((seg) => seg.id === id);
  myPeaks?.player.seek(selectedSegment!.startTime);
};

export const handleAddSegment = (
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>,
  myPeaks: PeaksInstance | undefined
) => {
  //find a gap greater or equal to 10 seconds between existing clip segments
  const tenSecondGapIdx = findGap(segments, 10);

  if (tenSecondGapIdx != -1) {
    //create a new 8 second segment between 2 segments with a large enough gap
    const newSegment = createNewSegmentObject(segments, tenSecondGapIdx);

    //slice the new segment into the existing segments array at the correct index
    const updatedSegments = insertNewSegment(
      segments,
      tenSecondGapIdx,
      newSegment
    );

    //update the segments state
    setSegments(updatedSegments);

    //move the playhead to the start of the new segment
    myPeaks?.player.seek(newSegment.startTime);
  } else if (tenSecondGapIdx == -1) {
    alert("No 10 second gaps, finding a 5 second gap...");

    //find a gap greater or equal to 5 seconds between existing clip segments
    const fiveSecondGapIdx = findGap(segments, 5);

    if (fiveSecondGapIdx != -1) {
      //create a new 4 second segment between 2 segments with a large enough gap
      const newSegment = createNewSegmentObject(segments, fiveSecondGapIdx);

      //slice the new segment into the existing segments array at the correct index
      const updatedSegments = insertNewSegment(
        segments,
        fiveSecondGapIdx,
        newSegment
      );

      //update the segments state
      setSegments(updatedSegments);

      //move the playhead to the start of the new segment
      myPeaks?.player.seek(newSegment.startTime);
    } else if (fiveSecondGapIdx == -1) {
      alert(
        "There are no gaps available for a new clip. You will need to delete one"
      );
    }
  }
};

export const clickToAddSegment = (
  segments: TestSegmentProps[],
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>,
  myPeaks: PeaksInstance | undefined,
  playheadPos: number
) => {
  //create upper and lower boundaries based on playhead position
  const segUpperBound = playheadPos + 5;
  const segLowerBound = playheadPos - 5;

  //asses whether the upper and lower booundaries fit in the gap between clips
  //clip idx is returned
  const gapIdx = segments.findIndex((seg, idx, arr) => {
    if (idx + 1 < arr.length) {
      return (
        arr[idx + 1].startTime > segUpperBound &&
        arr[idx].endTime < segLowerBound
      );
    }
  });

  //if the reutrn value is not -1 a gap has been found
  //create a new segment
  if (gapIdx != -1) {
    const newSegment = {
      id: segments.length.toString(),
      fileName: `clip-${parseInt(segments.length.toString()) + 1}`,
      startTime: playheadPos,
      endTime: playheadPos + 8,
      editable: true,
      color: "#1E1541",
      labelText: "new clip",
      formErrors: {
        fileNameError: false,
        startTimeError: false,
        endTimeError: false,
      },
    };
    //slice the new segment into the existing segments array at the correct index
    const updatedSegments = insertNewSegment(segments, gapIdx, newSegment);

    //update the segments
    setSegments(updatedSegments);

    //move the playhead to the start of the new segment
    myPeaks?.player.seek(newSegment.startTime);
  }
};

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
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>
) => {
  //used for two way bind of start time input element to correct segment in segments
  const newSegState = segments.map((seg) => {
    if (seg.id === id) {
      return {
        ...seg,
        startTime:
          parseInt(evt.target.value) < seg.endTime!
            ? parseInt(evt.target.value)
            : 0,
      };
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
            : myPeaks?.player.getDuration()!,
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
