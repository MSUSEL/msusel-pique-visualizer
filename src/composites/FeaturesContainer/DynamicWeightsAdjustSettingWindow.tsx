import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { GearIcon } from "@radix-ui/react-icons";

export const DynamicWeightsButton = () => {
    return (

        <Flex gap="3" align="center">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button size="2" variant="soft" highContrast>
                        <GearIcon width="18" height="18" />  Weights Adjustment
                    </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Button size="2" variant="soft" highContrast>
                        Characteristics Weights
                    </Button>
                </DropdownMenu.Label>


                </DropdownMenu.Content>
            </DropdownMenu.Root>


        </Flex>




    );
};