import { useSetAtom } from "jotai";
import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Flex, Button, Box, HoverCard, Link, Text } from "@radix-ui/themes";
import { ResetIcon } from "@radix-ui/react-icons";
import * as schema from '../../data/schema';

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

    const dataset = useAtomValue(State.dataset);

    const findMinMaxValues = (dataset: schema.base.Schema | undefined): [number, number] => {
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;

        const findValues = (obj: any) => {
            for (const key in obj) {
                if (key === 'diagnostics' || key === 'measures') continue;

                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    findValues(obj[key]);
                } else if (key === 'value' && typeof obj[key] === 'number') {
                    min = Math.min(min, obj[key]);
                    max = Math.max(max, obj[key]);
                }
            }
        };

        if (dataset) {
            findValues(dataset);
        }

        return [min, max];
    };

    // Determine the min and max values for the slider
    const [sliderMin, sliderMax] = dataset ? findMinMaxValues(dataset) : [0, 1];


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
        setMinValueState(sliderMin);
        setmaxValueState(sliderMax);
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
        setMinValueState(sliderMin);
        setmaxValueState(sliderMax);
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
                <Box style={{ flexBasis: '30%' }}>
                    <Button size="2" variant="soft" highContrast onClick={handleSortingReset} style={{ width: '100%' }}>
                        <ResetIcon width="12" height="12" />  Sorting
                    </Button>
                </Box>

                <Box style={{ flexBasis: '30%' }}>
                    <Button size="2" variant="soft" highContrast onClick={handleFilteringReset} style={{ width: '100%' }}>
                        <ResetIcon width="12" height="12" /> Filtering
                    </Button>
                </Box>

                <Box style={{ flexBasis: '30%' }}>
                    <Button size="2" variant="soft" highContrast onClick={handleReset} style={{ width: '100%' }}>
                        <ResetIcon width="12" height="12" /> Both
                    </Button>
                </Box>
            </Flex>

        </Flex>
    );
};
