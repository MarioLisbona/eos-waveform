import { TestSegmentProps } from "@/app/types";
import { PeaksInstance } from "peaks.js";

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
import format from "format-duration";
import {
  deleteSingleSegment,
  handleFileNameChange,
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
  const handleClipDragEnd = (evt) => {
    console.log(evt);

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

  return (
    <Box display="block" overflowY="scroll" height={"35vh"}>
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
                  value={seg.fileName} // Added unknown to types in index.d.ts
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
              <Input
                value={format(seg.startTime * 1000, {
                  leading: true,
                  ms: true,
                })}
                onChange={myPeaks?.on("segments.dragend", handleClipDragEnd)}
              ></Input>
            </GridItem>
            <GridItem colStart={5} colEnd={7}>
              <Input
                value={format(seg.endTime * 1000, {
                  leading: true,
                  ms: true,
                })}
              ></Input>
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
