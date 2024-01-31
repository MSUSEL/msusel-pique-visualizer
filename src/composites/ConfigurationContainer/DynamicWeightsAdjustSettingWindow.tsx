import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { CharacteristicsTableGenerator } from "./DynamicWeightsAdjustment/CharacteristicsTable";
import { Button, Dialog, Flex, Text, HoverCard, Link, Strong, Callout, Box, Inset, IconButton } from "@radix-ui/themes";
import { InfoCircledIcon, GearIcon, CrossCircledIcon, Cross1Icon } from "@radix-ui/react-icons";

export const DynamicWeightsButton = () => {
    return (

        <Flex direction="column" gap="3" align="start">

            <Box>
                <HoverCard.Root>
                    <HoverCard.Trigger>
                        <Link href="#" size='3' style={{ margin: '0px', }} > <GearIcon />  Dynamic Weights Adjustment</Link>
                    </HoverCard.Trigger>
                    <HoverCard.Content>
                        <Text as="div" size="1" style={{ maxWidth: 325 }}>

                            <Strong>Weights, </Strong> shown as numbers alonging on edges in the tree display,
                            indicate the relative importance among the quality aspects in consideration.
                            Since the industry requirements could be various,
                            tuning the weights allows users to prioritize different aspects.

                        </Text>
                    </HoverCard.Content>
                </HoverCard.Root>

            </Box>

            <Box>
                <Callout.Root>
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        Currently, the adjsutment of weights is only applicable for Quality Characteristics (i.e., the 2nd level of the tree display).
                    </Callout.Text>
                </Callout.Root>

            </Box>

            <Box>
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button size="2" variant="surface">
                            Adjust quality characteristics weights
                        </Button>
                    </Dialog.Trigger>
                    <Dialog.Content style={{ position: 'relative' }}>
                        <Dialog.Title>Characteristics and corresponding weights</Dialog.Title>
                        <Dialog.Description>
                            {/* Dialog description content */}
                        </Dialog.Description>

                        {/* Position the close button absolutely within the Dialog.Content */}
                        <Dialog.Close style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <IconButton radius="full" color="gray">
                                <Cross1Icon width="15" height="15" />
                            </IconButton>
                        </Dialog.Close>

                        <Inset side="x" my="5">
                            <CharacteristicsTableGenerator />
                        </Inset>

                        {/* Other dialog content */}
                    </Dialog.Content>
                </Dialog.Root>

            </Box>

        </Flex>


    );
};