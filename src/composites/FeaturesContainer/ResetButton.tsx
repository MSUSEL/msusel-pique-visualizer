import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Button } from "@radix-ui/themes";
import { ResetIcon } from "@radix-ui/react-icons";

export const ResetButton = () => {
    const dataset = useAtomValue(State.dataset);

    return (

        <Flex gap="3" align="center">

            <Button size="2" variant="soft" highContrast>
                <ResetIcon width="18" height="18" />Reset
            </Button>

        </Flex>




    );
};