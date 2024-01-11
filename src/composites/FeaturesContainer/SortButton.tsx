import { useAtom } from "jotai";
import { State } from "../../state";
import { Select, Flex, HoverCard, Link, Text } from "@radix-ui/themes";
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
            <Select.Label>Based on Values</Select.Label>
            <Select.Item value="value-asc"> Value - {' '}
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Link href="#">Ascending</Link>
                </HoverCard.Trigger>
                <HoverCard.Content size="2">
                  <Text as="div" size="2" style={{ maxWidth: 325 }}>
                    Ascending: For the tree view, the ascending sorting will sort the smallest on the right and the largest on the right.
                  </Text>
                </HoverCard.Content>

              </HoverCard.Root>
              {' '}
            </Select.Item>
            <Select.Item value="value-desc">Value - {' '}
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Link href="#">Descending</Link>
                </HoverCard.Trigger>
                <HoverCard.Content size="2">
                  <Text as="div" size="2" style={{ maxWidth: 325 }}>
                    Descending: For the tree view, the descending sorting will sort the largest on the right and the smallest on the right.
                  </Text>
                </HoverCard.Content>

              </HoverCard.Root>
              {' '}</Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Label>Based on Weights</Select.Label>
            <Select.Item value="weight-asc">Weight - {' '}
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Link href="#">Ascending</Link>
                </HoverCard.Trigger>
                <HoverCard.Content size="2">
                  <Text as="div" size="2" style={{ maxWidth: 325 }}>
                    Ascending: For the tree view, the ascending sorting will sort the smallest on the right and the largest on the right.
                  </Text>
                </HoverCard.Content>

              </HoverCard.Root>
              {' '}</Select.Item>
            <Select.Item value="weight-desc">Weight - <HoverCard.Root>
              <HoverCard.Trigger>
                <Link href="#">Descending</Link>
              </HoverCard.Trigger>
              <HoverCard.Content size="2">
                <Text as="div" size="2" style={{ maxWidth: 325 }}>
                  Descending: For the tree view, the descending sorting will sort the largest on the right and the smallest on the right.
                </Text>
              </HoverCard.Content>

            </HoverCard.Root></Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
