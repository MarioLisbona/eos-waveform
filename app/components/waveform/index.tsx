import { Flex, Button, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { OverviewContainer, ZoomviewContainer } from "./styled";
import Peaks, { PeaksInstance, PeaksOptions, SegmentDragEvent } from "peaks.js";
import {
  setPeaksConfig,
  overviewOptionsConfig,
  zoomviewOptionsConfig,
} from "@/app/lib/waveform-config";
import ClipGrid from "./components/ClipGrid";
import { testSegments, testSegmentsSmall } from "@/app/data/segmentData";
import { AudioDataProps, TestSegmentProps } from "@/app/types";
import {
  deleteAllSegments,
  createAllSegments,
  handleAddSegment,
} from "@/app/lib/waveform-utils";
import ClipGridHeader from "./components/ClipGridHeader";

export default function WaveForm() {
  // const data: AudioDataProps = {
  //   audioUrl: "EOS-test.mp3",
  //   audioContentType: "audio/mpeg",
  //   waveformDataUrl: "EOS-test.dat",
  // };
  const data: AudioDataProps = {
    audioUrl: "instrumental.mp3",
    audioContentType: "audio/mpeg",
    waveformDataUrl: "instrumental.dat",
  };

  //sort the data in chronological order by startTime
  testSegmentsSmall.sort((a, b) => a.startTime - b.startTime);

  //create references to peaks.js containers
  const zoomviewWaveformRef = React.createRef<HTMLDivElement>();
  const overviewWaveformRef = React.createRef<HTMLDivElement>();
  const audioElementRef = React.createRef<HTMLAudioElement>();

  // state for peaks instance
  const [myPeaks, setMyPeaks] = useState<PeaksInstance | undefined>();
  const [segments, setSegments] =
    useState<TestSegmentProps[]>(testSegmentsSmall);

  // create function to create instance of peaks
  // useCallback means this will only render a single instance of peaks
  // audio changes are implemented on this instance of peaks using hte .setSource method
  const initPeaks = useCallback(() => {
    //setting options here by invoking setPeaksConfig()
    const options: PeaksOptions = setPeaksConfig(
      overviewWaveformRef,
      zoomviewWaveformRef,
      audioElementRef,
      overviewOptionsConfig,
      zoomviewOptionsConfig,
      data.waveformDataUrl
    );

    //assigning the source for the audio element
    audioElementRef.current!.src = data.audioUrl;

    //If there is an existing peaks instance, call destroy method and set undefined for myPeaks
    if (myPeaks) {
      myPeaks.destroy();
      setMyPeaks(undefined);
    }

    //create an instance of peaks
    Peaks.init(options, (err, peaks) => {
      if (err) {
        console.error("Failed to initialize Peaks instance: " + err.message);
        return;
      }

      //set instance of peaks to myPeaks state
      setMyPeaks(peaks);

      //set the amplitude scale for the zoomview  and overview container
      const zoomviewAmplitude = peaks?.views.getView("zoomview");
      const overviewAmplitude = peaks?.views.getView("overview");
      zoomviewAmplitude?.setAmplitudeScale(0.8);
      overviewAmplitude?.setAmplitudeScale(0.5);

      //if there is no instance of peaks, return
      if (!peaks) {
        return;
      }
    });
  }, []);

  //call initPeaks on initial mount of WaveForm component
  useEffect(() => {
    if (initPeaks) {
      initPeaks();
    }
  }, []);

  //function used for peaks instance.on event
  //sets the new start time for a segment if the start point is dragged
  //sets the new end time for a segment if the end point is dragged
  //tried to factor this out to the waveform-utils component but I can pass any more arguments to the function
  const handleClipDragEnd = (evt: SegmentDragEvent) => {
    const newSegState = segments.map((seg) => {
      if (seg.id === evt.segment.id && evt.startMarker) {
        console.log("moved start marker");
        return {
          ...seg,
          startTime: evt.segment.startTime,
        };
      } else if (seg.id === evt.segment.id && !evt.startMarker) {
        console.log("moved end marker");
        return {
          ...seg,
          endTime: evt.segment.endTime,
        };
      }
      // otherwise return the segment unchanged
      return seg;
    });
    //use the updated segment to update the segments state
    setSegments(newSegState);
  };

  //add the segment objects to the peaks instance, on mount and if myPeaks state changes
  // add peaks instance.on event for updating start and end points when a segment drag ha completed.
  useEffect(() => {
    myPeaks?.segments.removeAll();
    myPeaks?.segments.add(segments);
    myPeaks?.on("segments.dragend", handleClipDragEnd);
  }, [myPeaks]);

  useEffect(() => {
    console.log("start of segments useEffect -segments", segments);
    //create the segments based on the pre-loaded cuts
    //at the moment this is the segments state - which is assigned the testSegments array on component mount
    // modifying the array of segment objects in segments state\
    myPeaks?.segments.removeAll();

    //sort the data in chronological order by startTime
    testSegmentsSmall.sort((a, b) => a.startTime - b.startTime);

    myPeaks?.segments.add(segments);
    // add peaks instance.on event for updating start and end points when a segment drag has completed.
    //needed to add this here as well to use the updated segments state
    myPeaks?.on("segments.dragend", handleClipDragEnd);
    console.log("end of segments useEffect -segments", segments);
  }, [segments]);

  return (
    <>
      <Flex
        justify={"center"}
        align={"center"}
        width={"100%"}
        direction={"column"}
        p={"1rem"}
      >
        <ZoomviewContainer ref={zoomviewWaveformRef}></ZoomviewContainer>

        <OverviewContainer ref={overviewWaveformRef}></OverviewContainer>

        <audio ref={audioElementRef} hidden>
          <source src={data.audioUrl} type={data.audioContentType} />
          Your browser does not support the audio element.
        </audio>
      </Flex>
      <Flex mb={"1rem"} px={"3rem"} w={"100%"} justify={"space-between"}>
        <Flex>
          <Button
            variant={"waveformBlue"}
            onClick={() => handleAddSegment(segments, setSegments, myPeaks)}
          >
            Add Segment
          </Button>
        </Flex>
        <Flex>
          <Button
            variant={"waveformBlue"}
            me={"1rem"}
            onClick={() => createAllSegments(myPeaks, setSegments, segments)}
          >
            Create All
          </Button>
          <Button
            variant={"waveformBlue"}
            onClick={() => deleteAllSegments(myPeaks, setSegments)}
          >
            Delete All
          </Button>
        </Flex>
      </Flex>
      {segments.length != 0 ? <ClipGridHeader /> : "There are no clips loaded"}
      {segments.length > 0 && (
        <ClipGrid
          segments={segments}
          setSegments={setSegments}
          myPeaks={myPeaks}
        />
      )}
    </>
  );
}
