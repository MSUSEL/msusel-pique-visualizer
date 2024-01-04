import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Switch, Flex, Text } from "@radix-ui/themes";


export const HideZeroWeights = () => {
    const dataset = useAtomValue(State.dataset);

    return (

        <Flex gap="3" align="center">

            <Text as="label" size="2">
                <Flex gap="2">
                    <Switch /> Remove Weight = 0 edge-node pairs
                </Flex>
            </Text>


        </Flex>




    );
};