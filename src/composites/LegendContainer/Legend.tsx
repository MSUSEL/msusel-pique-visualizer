import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Badge, Flex, Text, Strong } from "@radix-ui/themes";



export const LegendContainer = () => {
  return (

    <Flex gap="2" align='center'>
      <Text weight="bold" as="div" color="gray" size="5"> <Strong>Risk Level   </Strong></Text>
      <Badge color="red" size="2">Severe (0-0.2)</Badge>
      <Badge color="orange" size="2">High (0.2-0.4)</Badge>
      <Badge color="yellow" size="2">Medium (0.4-0.6)</Badge>
      <Badge color="blue" size="2">Low (0.6-0.8)</Badge>
      <Badge color="green" size="2">Insignificant (0.8-1)</Badge>
    </Flex>

  );
};