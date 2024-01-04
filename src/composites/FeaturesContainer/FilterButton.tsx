import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Select, DropdownMenu, Separator, Flex, Text } from "@radix-ui/themes";


export const FilterButton = () => {
  const dataset = useAtomValue(State.dataset);

  return (

      <Flex gap="3" align="center">
        <Select.Root>
          <Select.Trigger placeholder="No Filtering" variant="soft"/>
          <Select.Content>
            <Select.Group>
              <Select.Label>Risk Level</Select.Label>
              <Select.Item value="risk-level">risk level</Select.Item>
            </Select.Group>

            <Select.Separator />

            <Select.Group>
              <Select.Label>Value</Select.Label>
              <Select.Item value="value-range">value range</Select.Item>
              
            </Select.Group>
          </Select.Content>
        </Select.Root>

      </Flex>




  );
};