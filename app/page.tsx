"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Text } from "@chakra-ui/react";
import SectionContainer from "./components/SectionContainer";

export default function Home() {
  return (
    <SectionContainer>
      <Text textStyle={"context"}>This is a heading</Text>
    </SectionContainer>
  );
}
