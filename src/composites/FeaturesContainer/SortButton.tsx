import { useAtom } from "jotai";
import { State } from "../../state";
import { Flex, HoverCard, Link, Text, Strong, Em, RadioGroup } from "@radix-ui/themes";
import * as Separator from '@radix-ui/react-separator';
import { CaretSortIcon } from "@radix-ui/react-icons";
import './Separator.css';

export const SortButton = () => {
  // Retrieve both the value and setter for sortState
  const [sortState, setSortState] = useAtom(State.sortingState);

  const handleSortChange = (value: string) => {
    if (["no-sort", "value-asc", "value-desc", "weight-asc", "weight-desc"].includes(value)) {
      setSortState(value as "no-sort" | "value-asc" | "value-desc" | "weight-asc" | "weight-desc");
    }
  };

  // Log the current sort state whenever it changes
  // console.log("Current Sort State:", sortState);

  return (

    <Flex gap="3" align="center">
      <div style={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
        {/* Title */}
        <div className="Text" style={{ fontWeight: 500 }}>
          <Text>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Link href="#" size='3'>
                  <CaretSortIcon /> Sorting
                </Link>

              </HoverCard.Trigger>
              <HoverCard.Content>
                <Text as="div" size="1" style={{ maxWidth: 325 }}>
                  <Strong>Sort</Strong> the evaluation results, consisting of quality characteristics, factors, measures and diagnostics,
                  based on their <Em>values or wegihts</Em>, in the <Em> ascending or decesding </Em> order.

                </Text>
              </HoverCard.Content>
            </HoverCard.Root>
          </Text>
        </div>

        <RadioGroup.Root value={sortState} onValueChange={handleSortChange} defaultValue="default">

          {/* Default: as the same sorting as the uploaded file */}
          <Text as="label" size="2">
            <RadioGroup.Item value="no-sort" /> Default Order
          </Text>

          {/* based on value */}
          <Text as="div" size="2" style={{ maxWidth: 325 }}>
            <Strong>Based on Value</Strong>
          </Text>

          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item value="value-asc" onSelect={() => handleSortChange("value-asc")} />
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Link href="#">Value - Ascending</Link>
                </HoverCard.Trigger>
                <HoverCard.Content size="2">
                  <Text as="div" size="2" style={{ maxWidth: 325 }}>
                    Ascending: For the tree view, the ascending sorting will sort the smallest on the left and the largest on the right.
                  </Text>
                </HoverCard.Content>
              </HoverCard.Root>
            </Flex>
          </Text>

          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item value="value-desc" onSelect={() => handleSortChange("value-desc")} />
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Link href="#">Value - Descending</Link>
                </HoverCard.Trigger>
                <HoverCard.Content size="2">
                  <Text as="div" size="2" style={{ maxWidth: 325 }}>
                    Descending: For the tree view, the descending sorting will sort the largest on the left and the smnallest on the right.
                  </Text>
                </HoverCard.Content>
              </HoverCard.Root>
            </Flex>
          </Text>


          {/* based on weights */}
          <Text as="div" size="2" style={{ maxWidth: 325 }}>
            <Strong>Based on Weights</Strong>
          </Text>

          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item value="weight-asc" onSelect={() => handleSortChange("weight-asc")} />
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Link href="#">Weights - Ascending</Link>
                </HoverCard.Trigger>
                <HoverCard.Content size="2">
                  <Text as="div" size="2" style={{ maxWidth: 325 }}>
                    Ascending: For the tree view, the ascending sorting will sort the smallest on the left and the largest on the right.
                  </Text>
                </HoverCard.Content>
              </HoverCard.Root>
            </Flex>
          </Text>

          <Text as="label" size="2">
            <Flex gap="2">
              <RadioGroup.Item value="weight-desc" onSelect={() => handleSortChange("weight-desc")} />
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Link href="#">Weights - Descending</Link>
                </HoverCard.Trigger>
                <HoverCard.Content size="2">
                  <Text as="div" size="2" style={{ maxWidth: 325 }}>
                    Descending: For the tree view, the descending sorting will sort the largest on the left and the smnallest on the right.
                  </Text>
                </HoverCard.Content>
              </HoverCard.Root>
            </Flex>
          </Text>

        </RadioGroup.Root>


      </div>
    </Flex>

  );
};
