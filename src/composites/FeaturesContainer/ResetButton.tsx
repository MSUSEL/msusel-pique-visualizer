import { useSetAtom } from "jotai";
import { State } from "../../state";
import { Flex, Button, Box, HoverCard, Link, Text } from "@radix-ui/themes";
import { ResetIcon } from "@radix-ui/react-icons";

export const ResetButton = () => {
    // Get the setter functions for each state
    const setSortingState = useSetAtom(State.sortingState);
    const setFilteringState = useSetAtom(State.filteringState);
    const setHideZeroWeightEdgeState = useSetAtom(State.hideZeroWeightEdgeState);
    const setFilteringByRiskLevelCheckboxStates = useSetAtom(State.filteringByRiskLevelCheckboxStates);
    const setMinValueState = useSetAtom(State.minValueState);
    const setmaxValueState = useSetAtom(State.maxValueState);
    const setMinWeightState = useSetAtom(State.minWeightState);
    const setMaxWeightState = useSetAtom(State.maxWeightState);

    // Define a function to handle the reset action
    const handleReset = () => {
        setSortingState("no-sort");
        setFilteringState("no-filter");
        setHideZeroWeightEdgeState("not-hidding");
        setFilteringByRiskLevelCheckboxStates({
            Insignificant: true,
            Low: true,
            Medium: true,
            High: true,
            Severe: true,
        });
        setMinValueState(-100000);
        setmaxValueState(10000);
        setMinWeightState(0);
        setMaxWeightState(1);
    };

    // Define a function to handle the reset action
    const handleSortingReset = () => {
        setSortingState("no-sort");

    };

    // Define a function to handle the reset action
    const handleFilteringReset = () => {
        setFilteringState("no-filter");
        setFilteringByRiskLevelCheckboxStates({
            Insignificant: true,
            Low: true,
            Medium: true,
            High: true,
            Severe: true,
        });
        setMinValueState(-100000);
        setmaxValueState(10000);
        setMinWeightState(0);
        setMaxWeightState(1);
    };

    return (
        <Flex gap="3" align="start" direction={"column"}>
            <Box>
                <HoverCard.Root>
                    <HoverCard.Trigger>
                        <Link href="#" size='3'><ResetIcon /> Reset</Link>
                    </HoverCard.Trigger>
                    <HoverCard.Content>
                        <Text as="div" size="1" style={{ maxWidth: 325 }}>
                            Users are available to select to reset the existing sorting or/and filtering.
                        </Text>
                    </HoverCard.Content>
                </HoverCard.Root>
            </Box>

            <Flex direction={"row"} align={"center"} justify="between" style={{ width: '100%' }}>
                <Box style={{flexBasis:'30%'}}>
                    <Button size="2" variant="soft" highContrast onClick={handleSortingReset} style={{ width: '100%'}}>
                        <ResetIcon width="12" height="12" />  Sorting
                    </Button>
                </Box>

                <Box style={{flexBasis:'30%'}}>
                    <Button size="2" variant="soft" highContrast onClick={handleFilteringReset} style={{ width: '100%'}}>
                        <ResetIcon width="12" height="12" /> Filtering
                    </Button>
                </Box>

                <Box style={{flexBasis:'30%'}}>
                    <Button size="2" variant="soft" highContrast onClick={handleReset} style={{ width: '100%'}}>
                        <ResetIcon width="12" height="12" /> Both
                    </Button>
                </Box>
            </Flex>

        </Flex>
    );
};
