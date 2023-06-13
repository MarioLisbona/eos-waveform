"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Flex, Text } from "@chakra-ui/react";
import SectionContainer from "./components/SectionContainer";
import WaveForm from "./components/waveform";

export default function Home() {
  return (
    <SectionContainer>
      <Flex direction={"column"} align={"center"}>
        <Text textStyle={"subheading"}>EOS Waveform Prototype</Text>
        <WaveForm />
      </Flex>
    </SectionContainer>
  );
}
