import { useAtom } from "jotai";
import { State } from "../../state";
import { Select, Flex } from "@radix-ui/themes";
import { CaretSortIcon } from "@radix-ui/react-icons";

export const SortButton = () => {
  // Retrieve both the value and setter for sortState
  const [sortState, setSortState] = useAtom(State.sortingState);

  const handleSortChange = (value: string) => {
    if (["no-sort", "value-asc", "value-desc", "weight-asc", "weight-desc"].includes(value)) {
      setSortState(value as "no-sort" | "value-asc" | "value-desc" | "weight-asc" | "weight-desc");
      // For testing: Log the current sort state after it changes
      // console.log("Sort State set to:", value);
    }
  };

  // Log the current sort state whenever it changes
  console.log("Current Sort State:", sortState);

  return (
    <Flex gap="3" align="center">
      <Select.Root onValueChange={handleSortChange}>
        <Select.Trigger placeholder="No Sorting" variant="soft" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Values</Select.Label>
            <Select.Item value="value-asc">Value - Ascending</Select.Item>
            <Select.Item value="value-desc">Value - Descending</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Label>Weights</Select.Label>
            <Select.Item value="weight-asc">Weight - Ascending</Select.Item>
            <Select.Item value="weight-desc">Weight - Descending</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
