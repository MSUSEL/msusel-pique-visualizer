import { useSetAtom } from "jotai";
import { State } from "../../state";
import { Flex, Button } from "@radix-ui/themes";
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

    return (
        <Flex gap="3" align="center">
            <Button size="2" variant="soft" highContrast onClick={handleReset}>
                <ResetIcon width="18" height="18" /> Reset
            </Button>
        </Flex>
    );
};
