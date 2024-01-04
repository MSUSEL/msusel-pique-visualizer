import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Select, DropdownMenu, Separator, Flex, Text } from "@radix-ui/themes";
import { CaretSortIcon } from "@radix-ui/react-icons";

export const SortButton = () => {
  const dataset = useAtomValue(State.dataset);

  return (

      <Flex gap="3" align="center">

        {/* Sorting */}
        <Select.Root>
        
          <Select.Trigger placeholder="No Sorting" variant="soft" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Values</Select.Label>
              <Select.Item value="value-asc">Value - Ascending</Select.Item>
              <Select.Item value="value-desc">Value - Descending</Select.Item>
            </Select.Group>

            <Select.Separator />

            <Select.Group>
              <Select.Label>Weights</Select.Label>
              <Select.Item value="weight-asc">Weight - Ascending</Select.Item>
              <Select.Item value="weight-desc">Weight - Descending</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>


      </Flex>




  );
};