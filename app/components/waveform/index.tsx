import { AudioDataProps } from "@/app/types";
import { Flex, Button, Text, Grid, GridItem, Input } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { OverviewContainer, ZoomviewContainer } from "./styled";
import Peaks, { PeaksInstance, PeaksOptions, Segment } from "peaks.js";
import {
  setPeaksConfig,
  overviewOptionsConfig,
  zoomviewOptionsConfig,
} from "@/app/lib/waveform-config";
import ClipGrid from "./components/ClipGrid";
import { testSegments } from "@/app/data/segmentData";

export default function WaveForm() {
  const data: AudioDataProps = {
    audioUrl: "EOS-test.mp3",
    audioContentType: "audio/mpeg",
    waveformDataUrl: "EOS-test.dat",
  };

  console.log("inside waveform", testSegments);

  //create ref's to peaks.js containers
  const zoomviewWaveformRef = React.createRef<HTMLDivElement>();
  const overviewWaveformRef = React.createRef<HTMLDivElement>();
  const audioElementRef = React.createRef<HTMLAudioElement>();

  // state for peaks instance
  const [myPeaks, setMyPeaks] = useState<PeaksInstance | undefined>();

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

      //set the amplitude scale for the zoomview container
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

  myPeaks?.segments.add(testSegments);

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
      <Flex mb={"3rem"} px={"3rem"} w={"100%"} justify={"space-between"}>
        <Flex>
          <Text textStyle={"subheading"} fontSize={"20px"}>
            Segments
          </Text>
        </Flex>
        <Flex>
          <Button variant={"waveformBlue"} me={"1rem"}>
            Create All
          </Button>
          <Button variant={"waveformBlue"}>Delete All</Button>
        </Flex>
      </Flex>
      <ClipGrid testSegments={testSegments} />
    </>
  );
}
