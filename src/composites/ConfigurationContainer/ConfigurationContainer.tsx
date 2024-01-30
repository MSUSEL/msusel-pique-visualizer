import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Text, Tabs, Box, Heading } from "@radix-ui/themes";
import { DynamicWeightsButton } from "./DynamicWeightsAdjustSettingWindow";
import * as Separator from '@radix-ui/react-separator';
import "../FeaturesContainer/Separator.css"

export const ConfigurationContainer = () => {
    const dataset = useAtomValue(State.dataset);

    return (
        // Change Flex direction to 'column' for vertical layout
        <Flex direction={'column'} gap={'3'} align={'start'}>

            <Flex direction={'column'}>
                <Text size={'5'}>Configuration</Text>
                <Text size={'2'}>Here we will add description for the configuration window</Text>
            </Flex>

            <Flex>
                <Tabs.Root defaultValue="summary">
                    <Tabs.List>
                        <Tabs.Trigger value="summary">Summary</Tabs.Trigger>
                        <Tabs.Trigger value="dynamic">Weight Adjustment</Tabs.Trigger>
                    </Tabs.List>

                    {/* Current Configuration Summary */}
                    <Flex>
                        <Tabs.Content value="summary">
                            <Box width="100%">
                                <Text>Here will be a summary of what the current configuration is.</Text>
                            </Box>
                        </Tabs.Content>

                        {/* dynamic weight adjustment */}
                        <Tabs.Content value="dynamic">
                            <Box width="100%">
                                <DynamicWeightsButton />
                            </Box>
                        </Tabs.Content>

                    </Flex>
                </Tabs.Root>
            </Flex>
        </Flex>
    );
};
