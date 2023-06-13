import { Grid, GridItem, Input, Button, Flex } from "@chakra-ui/react";

export default function ClipGrid() {
  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={6} w={"100%"}>
      <GridItem colStart={1} colEnd={3}>
        <Input></Input>
      </GridItem>
      <GridItem colStart={3} colEnd={5}>
        <Input></Input>
      </GridItem>
      <GridItem colStart={5} colEnd={7}>
        <Input></Input>
      </GridItem>
      <GridItem colStart={7} colEnd={9}>
        <Flex w={"100%"} justify={"flex-end"}>
          <Button variant={"waveformOutlined"}>Create</Button>
          <Button variant={"waveformOutlined"}>Delete</Button>
        </Flex>
      </GridItem>
    </Grid>
  );
}
