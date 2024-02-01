import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { CharacteristicsTableGenerator } from "./DynamicWeightsAdjustment/CharacteristicsTable";
import { Button, Flex, Text, HoverCard, Link, Strong, Callout, Box, Inset, IconButton } from "@radix-ui/themes";
import { InfoCircledIcon, GearIcon, Cross2Icon, Cross1Icon } from "@radix-ui/react-icons";
import * as Dialog from '@radix-ui/react-dialog';
import "../Style/Dialog.css"


export const DynamicWeightsButton = () => {
    return (

        <Flex direction="column" gap="3" align="start">

            {/* dynamic weight adjustment title, right now we will keep it as "weight" */}
            <Box>
                <HoverCard.Root>
                    <HoverCard.Trigger>
                        <Link href="#" size='3' style={{ margin: '0px', }} > <GearIcon />  Dynamic Weights Adjustment</Link>
                    </HoverCard.Trigger>
                    <HoverCard.Content>
                        <Text as="div" size="1" style={{ maxWidth: 325 }}>

                            For Quality Chracteristics, <Strong>weights, </Strong> shown as numbers alonging on edges in the tree display,
                            indicate the relative importance among the quality aspects in consideration.
                            Since the industry requirements could be various,
                            users are welcome to tune the weights by adjusting the corresponding importance to prioritize different characteristics.

                        </Text>
                    </HoverCard.Content>
                </HoverCard.Root>

            </Box>

            {/* callout card information */}
            <Box>
                <Callout.Root>
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        Currently, the adjsutment is only applicable for <Strong>Quality Characteristics</Strong>
                        (i.e., the 2nd level of the tree display, and the 2nd expandable box in the list display).
                    </Callout.Text>
                </Callout.Root>

            </Box>

            <Box position={'relative'} left={'50%'} top={'50%'}>
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button size="2" className="Button violet"> Adjust </Button>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay className="DialogOverlay" />
                        <Dialog.Content className="DialogContent">
                            <Dialog.Title className="DialogTitle">Characteristics and corresponding weights</Dialog.Title>
                            <Dialog.Description className="DialogDescription">
                                {/* Dialog description content */}
                                Adjust the importance of chrachteristics, the weights will be recalculated automaticly.
                            </Dialog.Description>

                            

                            <Inset side="x" my="5">
                                <CharacteristicsTableGenerator />
                            </Inset>

                            {/* Position the close button absolutely within the Dialog.Content */}
                            <Dialog.Close asChild>
                                <IconButton  className="IconButton" aria-label="Close">
                                    <Cross2Icon />
                                </IconButton>
                            </Dialog.Close>

                        </Dialog.Content>

                    </Dialog.Portal>
                </Dialog.Root>

            </Box>

        </Flex>


    );
};