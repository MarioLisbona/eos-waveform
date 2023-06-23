import { TestSegmentProps } from "@/app/types";
import { PeaksInstance } from "peaks.js";
import Timecode from "react-timecode";
import {
  Box,
  Grid,
  GridItem,
  Input,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  deleteSingleSegment,
  handleFileNameChange,
  handleStartTimeChange,
  handleEndTimeChange,
  handlePlayheadSeek,
} from "@/app/lib/waveform-utils";

export default function ClipGrid({
  segments,
  setSegments,
  myPeaks,
}: {
  segments: TestSegmentProps[];
  myPeaks: PeaksInstance | undefined;
  setSegments: React.Dispatch<React.SetStateAction<TestSegmentProps[]>>;
}) {
  return (
    <Box display="block" overflowY="scroll" maxH={"35vh"}>
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
              <FormControl isInvalid={seg.formErrors.fileNameError}>
                <Input
                  onClick={() =>
                    handlePlayheadSeek(seg.id, myPeaks, segments, true)
                  }
                  value={seg.fileName}
                  onChange={(evt) =>
                    handleFileNameChange(seg.id!, evt, segments, setSegments)
                  }
                />
                {seg.formErrors.fileNameError && (
                  <FormErrorMessage>File Name is required.</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem colStart={3} colEnd={5}>
              {/* <Input
                value={seg.startTime}
                onChange={(evt) =>
                  handleStartTimeChange(seg.id!, evt, segments, setSegments)
                }
              ></Input> */}
              <Flex
                onClick={() =>
                  handlePlayheadSeek(seg.id, myPeaks, segments, true)
                }
                cursor={"pointer"}
                ps={"1rem"}
                borderRadius={"0.3rem"}
                height={"40px"}
                border={"1px solid black"}
                align={"center"}
              >
                <Timecode format="HH:mm:ss.SSS" time={seg.startTime * 1000} />
              </Flex>
            </GridItem>
            <GridItem colStart={5} colEnd={7}>
              {/* <Input
                value={seg.endTime}
                onChange={(evt) =>
                  handleEndTimeChange(
                    seg.id!,
                    evt,
                    segments,
                    setSegments,
                    myPeaks
                  )
                }
              ></Input> */}
              <Flex
                onClick={() => handlePlayheadSeek(seg.id, myPeaks, segments)}
                cursor={"pointer"}
                ps={"1rem"}
                borderRadius={"0.3rem"}
                height={"40px"}
                border={"1px solid black"}
                align={"center"}
              >
                <Timecode format="HH:mm:ss.SSS" time={seg.endTime * 1000} />
              </Flex>
            </GridItem>
            <GridItem colStart={7} colEnd={9}>
              <Flex w={"100%"} justify={"flex-end"}>
                <Button variant={"waveformOutlined"}>Create</Button>
                <Button
                  variant={"waveformOutlined"}
                  onClick={() =>
                    deleteSingleSegment(myPeaks, seg.id!, setSegments)
                  }
                >
                  Delete
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        ))}
    </Box>
  );
}
