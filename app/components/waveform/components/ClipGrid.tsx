import { TestSegmentProps } from "@/app/data/segmentData";
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

export default function ClipGrid({
  segments,
}: {
  segments: TestSegmentProps[];
}) {
  return (
    <>
      <Flex
        px={"3rem"}
        h={"50px"}
        w={"100%"}
        direction={"column"}
        align={"center"}
      >
        <Grid templateColumns="repeat(8, 1fr)" gap={6} w={"100%"} mb={"1rem"}>
          <GridItem colStart={1} colEnd={3}>
            <Text textStyle={"smBold"} fontSize={"16px"}>
              File Name
            </Text>
          </GridItem>
          <GridItem colStart={3} colEnd={5}>
            <Text textStyle={"smBold"} fontSize={"16px"}>
              Start Time
            </Text>
          </GridItem>
          <GridItem colStart={5} colEnd={7}>
            <Text textStyle={"smBold"} fontSize={"16px"}>
              End Time
            </Text>
          </GridItem>
        </Grid>
      </Flex>

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
              <Input value={format(seg.startTime * 1000)}></Input>
            </GridItem>
            <GridItem colStart={5} colEnd={7}>
              <Input value={format(seg.endTime * 1000)}></Input>
            </GridItem>
            <GridItem colStart={7} colEnd={9}>
              <Flex w={"100%"} justify={"flex-end"}>
                <Button variant={"waveformOutlined"}>Create</Button>
                <Button variant={"waveformOutlined"}>Delete</Button>
              </Flex>
            </GridItem>
          </Grid>
        ))}
    </>
  );
}
