import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
export default function ClipGridHeader() {
  return (
    <Flex
      px={"3rem"}
      h={"50px"}
      w={"100%"}
      direction={"column"}
      align={"center"}
    >
      <Grid templateColumns="repeat(9, 1fr)" gap={4} w={"100%"} mb={"1rem"}>
        <GridItem colStart={1} colEnd={3}>
          <Text textStyle={"smBold"} fontSize={"16px"}>
            File Name
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={6}>
          <Text textStyle={"smBold"} fontSize={"16px"}>
            Adjust in and out with the slider
          </Text>
        </GridItem>
        <GridItem colStart={6} colEnd={7}>
          <Text textStyle={"smBold"} fontSize={"16px"}>
            Start Time
          </Text>
        </GridItem>
        <GridItem colStart={7} colEnd={8}>
          <Text textStyle={"smBold"} fontSize={"16px"}>
            End Time
          </Text>
        </GridItem>
      </Grid>
    </Flex>
  );
}
