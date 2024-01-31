import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Text, Tabs, Box, Strong } from "@radix-ui/themes";
import * as Separator from '@radix-ui/react-separator';
import "../FeaturesContainer/Separator.css"

export const ConfigurationSummary = () => {
    const dataset = useAtomValue(State.dataset);

    return (
        // Change Flex direction to 'column' for vertical layout
        <Flex>
            <Box>
                <Text size={'3'}> Globel Configurations</Text>
                <Text size={'2'} as="p"> <Strong>* Benchmark Strategy: </Strong>{dataset?.global_config.benchmark_strategy}</Text>
                <Text size={'2'} as="p"> <Strong>* Weights Strategy: </Strong>{dataset?.global_config.weights_strategy}</Text>
                <Text size={'2'} as="p"> <Strong>* Current Profile: </Strong> Default </Text>
                
                <Separator.Root className="SeparatorRoot" style={{ margin: '15px 0' }} />
                <Text size={'2'} as="p"> * Here we will add description for the configuration window. </Text>
                <Text size={'2'} as="p"> * We will also insert hyperlinks or provied brief descriptions of those strategies </Text>

            </Box>

        </Flex >
    );
};
 