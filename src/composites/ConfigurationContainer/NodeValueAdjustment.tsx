import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Text, Box, Strong, Switch } from "@radix-ui/themes";
import "../Style/Separator.css";

export const NodeValueAdjustment = () => {
  const dataset = useAtomValue(State.dataset);

  return (
   
    <Flex direction={"column"}>
      <Box>
        <Text size={"3"}> Dynamic Values Adjustment</Text>
      </Box>

      <Box>
        <Text as="label" size="2">
          <Flex gap="2">
            Turn on this switch to allow adjustment <Switch />
          </Flex>
        </Text>
      </Box>
    </Flex>
  );
};
