import { TestSegmentProps } from "@/app/data/segmentData";
import { PeaksInstance, Segment } from "peaks.js";

import {
  Grid,
  GridItem,
  Input,
  Button,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import format from "format-duration";
import { useState } from "react";
import { deleteSingleSegment } from "@/app/lib/waveform-utils";

export default function ClipGrid({
  segments,
  setSegments,
  myPeaks,
}: {
  segments: TestSegmentProps[];
  myPeaks: PeaksInstance | undefined;
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>;
}) {
  console.log("in ClipGrid", segments);
  return (
    <>
      {segments.length > 0 &&
        segments.map((seg, idx) => (
          <Grid
            templateColumns="repeat(8, 1fr)"
            gap={6}
            w={"100%"}
            key={idx}
            mb={"1rem"}
          >
            <GridItem colStart={1} colEnd={3}>
              <Input value={seg.id}></Input>
            </GridItem>
            <GridItem colStart={3} colEnd={5}>
              <Input
                value={format(seg.startTime * 1000, {
                  leading: true,
                  ms: true,
                })}
              ></Input>
            </GridItem>
            <GridItem colStart={5} colEnd={7}>
              <Input
                value={format(seg.endTime * 1000, { leading: true, ms: true })}
              ></Input>
            </GridItem>
            <GridItem colStart={7} colEnd={9}>
              <Flex w={"100%"} justify={"flex-end"}>
                <Button variant={"waveformOutlined"}>Create</Button>
                <Button
                  variant={"waveformOutlined"}
                  onClick={() =>
                    deleteSingleSegment(myPeaks, seg.id, segments, setSegments)
                  }
                >
                  Delete
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        ))}
    </>
  );
}
