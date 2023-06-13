import { AudioDataProps } from "@/app/types";
import { Flex, Button, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { OverviewContainer, ZoomviewContainer } from "./styled";
import Peaks, { PeaksInstance, PeaksOptions, Segment } from "peaks.js";
import {
  setPeaksConfig,
  overviewOptionsConfig,
  zoomviewOptionsConfig,
} from "@/app/lib/waveform-config";

export default function WaveForm({
  audioUrl,
  audioContentType,
  waveformDataUrl,
}: AudioDataProps) {
  console.log(audioUrl, audioContentType, waveformDataUrl);

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
      waveformDataUrl
    );

    //assigning the source for the audio element
    audioElementRef.current!.src = audioUrl;

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

  return (
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
        <source src={audioUrl} type={audioContentType} />
        Your browser does not support the audio element.
      </audio>
    </Flex>
  );
}
