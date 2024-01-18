import { useAtom } from "jotai";
import { State } from "../../state";
import { DropdownMenu, Flex, HoverCard, Link, Text, Button } from "@radix-ui/themes";
import { CaretSortIcon } from "@radix-ui/react-icons";

export const SortButton = () => {
  // Retrieve both the value and setter for sortState
  const [sortState, setSortState] = useAtom(State.sortingState);

  const handleSortChange = (value: string) => {
    if (["no-sort", "value-asc", "value-desc", "weight-asc", "weight-desc"].includes(value)) {
      setSortState(value as "no-sort" | "value-asc" | "value-desc" | "weight-asc" | "weight-desc");
    }
  };

  // Log the current sort state whenever it changes
  console.log("Current Sort State:", sortState);

  return (
    <Flex gap="3" align="center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
        <Button variant="soft">
            <CaretSortIcon />
            {sortState === "no-sort" ? "No Sorting" : sortState}
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          
            <DropdownMenu.Label>Based on Values</DropdownMenu.Label>
            <DropdownMenu.Item onSelect={() => handleSortChange("value-asc")}> Value - {' '}
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
            </DropdownMenu.Item>

            <DropdownMenu.Item onSelect={() => handleSortChange("value-desc")}>Value - {' '}
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
              {' '}</DropdownMenu.Item>
          

          <DropdownMenu.Separator />

          
            <DropdownMenu.Label>Based on Weights</DropdownMenu.Label>
            <DropdownMenu.Item onSelect={() => handleSortChange("weight-asc")}>Weight - {' '}
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
              {' '}</DropdownMenu.Item>

            <DropdownMenu.Item onSelect={() => handleSortChange("weight-desc")}>Weight - {' '}
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
              {' '}</DropdownMenu.Item>
          
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};
