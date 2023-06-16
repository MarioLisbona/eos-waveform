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
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import format from "format-duration";
import {
  deleteSingleSegment,
  handleFileNameChange,
  handleRangeSlider,
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
    <Box display="block" overflowY="scroll" height={"35vh"}>
      {segments.length > 0 &&
        segments.map((seg, idx) => (
          <Grid
            templateColumns="repeat(9, 1fr)"
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
            <GridItem colStart={3} colEnd={6}>
              <Flex height={"100%"} align={"center"}>
                <RangeSlider
                  defaultValue={[seg.startTime, seg.endTime]}
                  onChangeEnd={(val) =>
                    handleRangeSlider(seg.id, val, segments, setSegments)
                  }
                  min={0}
                  max={myPeaks?.player.getDuration()}
                  step={1}
                >
                  <RangeSliderTrack bg="#BEBBBB">
                    <RangeSliderFilledTrack bg="brandBlue" />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={4} index={0} />
                  <RangeSliderThumb boxSize={4} index={1} />
                </RangeSlider>
              </Flex>
            </GridItem>
            <GridItem colStart={6} colEnd={7}>
              <Input
                value={format(seg.startTime * 1000, {
                  ms: true,
                  leading: true,
                })}
              ></Input>
            </GridItem>
            <GridItem colStart={7} colEnd={8}>
              <Input
                value={format(seg.endTime * 1000, { ms: true, leading: true })}
              ></Input>
            </GridItem>
            <GridItem colStart={8} colEnd={10}>
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
