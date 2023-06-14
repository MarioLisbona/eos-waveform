import { TestSegmentProps } from "@/app/types";
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
import { useEffect, useState, ChangeEvent } from "react";
import { deleteSingleSegment } from "@/app/lib/waveform-utils";
import { ClipDataProps } from "@/app/types";

export default function ClipGrid({
  segments,
  setSegments,
  myPeaks,
}: {
  segments: TestSegmentProps[];
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>;
  myPeaks: PeaksInstance | undefined;
}) {
  // console.log("in ClipGrid", segments[0].startTime, segments[0].endTime);

  // segments[0].startTime = 200;
  // segments[0].endTime = 400;

  // console.log(
  //   "in ClipGrid, after edit",
  //   segments[0].startTime,
  //   segments[0].endTime
  // );

  const handleFilenameChange = (
    idx: number,
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const newState = segments.map((obj) => {
      if (obj.id === segments[idx].id) {
        return { ...obj, id: evt.target.value };
      }

      return obj;
    });

    setSegments(newState);
  };

  console.log("inside ClipGrid", segments);

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
              <Input
                value={seg.id}
                onChange={(evt) => handleFilenameChange(idx, evt)}
              ></Input>
            </GridItem>
            <GridItem colStart={3} colEnd={5}>
              <Input
              // value={format(seg.startTime * 1000, {
              //   leading: true,
              //   ms: true,
              // })}
              ></Input>
            </GridItem>
            <GridItem colStart={5} colEnd={7}>
              <Input
              // value={format(seg.endTime * 1000, { leading: true, ms: true })}
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
