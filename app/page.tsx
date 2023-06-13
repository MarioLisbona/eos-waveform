"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Flex, Text } from "@chakra-ui/react";
import SectionContainer from "./components/SectionContainer";
import WaveForm from "./components/waveform";
import { AudioDataProps } from "./types";

export default function Home() {
  const data: AudioDataProps = {
    audioUrl: "EOS-test.mp3",
    audioContentType: "audio/mpeg",
    waveformDataUrl: "EOS-test.dat",
  };
  return (
    <SectionContainer>
      <Flex direction={"column"} align={"center"}>
        <Text textStyle={"subheading"}>EOS Waveform Prototype</Text>
        <WaveForm
          audioUrl={data.audioUrl}
          audioContentType={data.audioContentType}
          waveformDataUrl={data.waveformDataUrl}
        />
      </Flex>
    </SectionContainer>
  );
}
