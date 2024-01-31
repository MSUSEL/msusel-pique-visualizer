import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Text, Box, Strong } from "@radix-ui/themes";
import "../FeaturesContainer/Separator.css"

export const NodeValueAdjustment = () => {
    const dataset = useAtomValue(State.dataset);

    return (
        // Change Flex direction to 'column' for vertical layout
        <Flex>
            <Box>
                <Text size={'3'}> Dynamic Values Adjustment</Text>
            </Box>

        </Flex >
    );
};
