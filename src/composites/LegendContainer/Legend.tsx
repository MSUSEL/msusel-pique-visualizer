import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Badge, Flex, Text, Strong } from "@radix-ui/themes";



export const LegendContainer = () => {
  return (

    <Flex gap="2" align='center'>
      <Text weight="bold" as="div" color="gray" size="5"> <Strong>Risk Level   </Strong></Text>
      <Badge color="red" size="2">Severe</Badge>
      <Badge color="orange" size="2">High</Badge>
      <Badge color="yellow" size="2">Medium</Badge>
      <Badge color="blue" size="2">Low</Badge>
      <Badge color="green" size="2">Insignificant</Badge>
    </Flex>

  );
};