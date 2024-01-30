import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Text, Tabs, Box, Strong } from "@radix-ui/themes";
import { ConfigurationSummary } from "./ConfigurationSummary";
import { DynamicWeightsButton } from "./DynamicWeightsAdjustSettingWindow";
import * as Separator from '@radix-ui/react-separator';
import "../FeaturesContainer/Separator.css"

export const ConfigurationContainer = () => {
    const dataset = useAtomValue(State.dataset);

    return (
        // Change Flex direction to 'column' for vertical layout
        <Flex direction={'column'} gap={'3'} align={'start'}>

            <Flex direction={'column'}>
                <Box>
                    <Text size={'5'}>Configuration</Text>
                </Box>

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
                                <ConfigurationSummary />
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
        </Flex >
    );
};
