import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Select, Flex, DropdownMenu, Button } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { HideZeroWeightsSwitch } from "./HideZeroWeightsSwitch";


export const QuickActionButton = () => {

  return (

      <Flex gap="3" align="center">
        {/* quick actions */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
            Quick Actions for Decluttering 
            <CaretDownIcon/>
            </Button>
          </DropdownMenu.Trigger> 
          <DropdownMenu.Content>
              <HideZeroWeightsSwitch/>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
  );
};