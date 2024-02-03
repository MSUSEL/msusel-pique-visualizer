import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Text, Box, Strong } from "@radix-ui/themes";
import * as Tabs from '@radix-ui/react-tabs';
import { ConfigurationSummary } from "./Summary";
import { DynamicWeightsButton } from "./DynamicWeightsAdjustSettingWindow";
import { DynamicImportanceButton } from "./ImportanceAdjustment";
import { NodeValueAdjustment } from "./NodeValueAdjustment";
import "../Style/Separator.css"

export const ConfigurationContainer = () => {

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
                        <Tabs.Trigger value="summary" style={{fontSize: "small"}}>Summary</Tabs.Trigger>
                        <Tabs.Trigger value="weight" style={{fontSize: "small"}}>Weight Adjustment</Tabs.Trigger>
                        <Tabs.Trigger value="importance" style={{fontSize: "small"}}>Importance Adjustment</Tabs.Trigger>
                        <Tabs.Trigger value="value" style={{fontSize: "small"}}>Value Adjustment</Tabs.Trigger>
                    </Tabs.List>

                    <Flex>

                        {/* Current Configuration Summary */}
                        <Tabs.Content value="summary">
                            <Box width="100%">
                                <ConfigurationSummary />
                            </Box>
                        </Tabs.Content>

                        {/* dynamic weight adjustment */}
                        <Tabs.Content value="weight">
                            <Box width="100%">
                                <DynamicWeightsButton />
                            </Box>
                        </Tabs.Content>

                        {/* dynamic importance adjustment */}
                        <Tabs.Content value="importance">
                            <Box width="100%">
                                <DynamicImportanceButton />
                            </Box>
                        </Tabs.Content>

                        {/* dynamic value adjustment */}
                        <Tabs.Content value="value">
                            <Box width="100%">
                                <NodeValueAdjustment />
                            </Box>
                        </Tabs.Content>
                    </Flex>
                </Tabs.Root>
            </Flex>
        </Flex >
    );
};
