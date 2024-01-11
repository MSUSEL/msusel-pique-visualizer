import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Select, DropdownMenu, Separator, Flex, Text } from "@radix-ui/themes";
import { HideZeroWeightsSwitch } from "./HideZeroWeightsSwitch";


export const QuickActionButton = () => {
  const dataset = useAtomValue(State.dataset);

  return (

      <Flex gap="3" align="center">

        {/* quick actions */}
        <Select.Root>
        
          <Select.Trigger placeholder="None" variant="soft" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Options</Select.Label>
              {/* <Select.Item value="remove 0s">Remove weight = 0</Select.Item> */}
              <HideZeroWeightsSwitch/>
            </Select.Group>

       
          </Select.Content>
        </Select.Root>


      </Flex>




  );
};