import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Switch, Flex, DropdownMenu, Button, Text } from "@radix-ui/themes";
import { CaretDownIcon, SwitchIcon } from "@radix-ui/react-icons";
import { HideZeroWeightsSwitch } from "./HideZeroWeightsSwitch";


export const QuickActionButton = () => {

  return (

    <Flex gap="3" align="center">
      {/* quick actions */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            <SwitchIcon />
            Quick Actions for Decluttering
            <CaretDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <HideZeroWeightsSwitch />
          <DropdownMenu.Separator />
          <Text as="label" size="2">
            <Flex gap="2">
              <Switch /> Show Top 5 Problematic Objects
            </Flex>
          </Text>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};