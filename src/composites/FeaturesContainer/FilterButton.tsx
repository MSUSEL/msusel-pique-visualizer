import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Select, TextField, Dialog, Button, Flex, Text } from "@radix-ui/themes";


export const FilterButton = () => {
  const dataset = useAtomValue(State.dataset);
  const [checkboxStates, setCheckboxStates] = useAtom(State.filteringByRiskLevelCheckboxStates);

  const handleCheckboxChange = (label: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStates({ ...checkboxStates, [label]: e.target.checked });
  };

  console.log("Current filter checkboxes status", checkboxStates);

  return (

    <Flex gap="3" align="center">
      <Select.Root>
        <Select.Trigger placeholder="No Filtering" variant="soft" />
        <Select.Content>
          {/* filter by risk level*/}
          <Select.Group>
            <Select.Label>Risk Level</Select.Label>
            {["Insignificant", "Low", "Medium", "High", "Severe"].map((label) => (
              <label key={label}>
                <input
                  type="checkbox"
                  checked={checkboxStates[label]}
                  onChange={handleCheckboxChange(label)}
                />
                {label}
              </label>
            ))}
          </Select.Group>

          <Select.Separator />
          {/* filter by objects value range*/}
          <Select.Group>
            <Select.Label>Value</Select.Label>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button>By value range</Button>
              </Dialog.Trigger>

              <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>By value range</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  Type in the miniman and maximum range of values.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Min
                    </Text>
                    <TextField.Input
                      defaultValue="0"
                      placeholder="Enter your minimun range"
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Max
                    </Text>
                    <TextField.Input
                      defaultValue="1"
                      placeholder="Enter your maximum range"
                    />
                  </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button>Save</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>

          </Select.Group>

          <Select.Separator />
          {/* filter by objects weights range*/}
          <Select.Group>
            <Select.Label>Weight</Select.Label>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button>By weight range</Button>
              </Dialog.Trigger>

              <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>By weight range</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  Type in the miniman and maximum range of weights.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Min
                    </Text>
                    <TextField.Input
                      defaultValue="0"
                      placeholder="Enter your minimun range"
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Max
                    </Text>
                    <TextField.Input
                      defaultValue="1"
                      placeholder="Enter your maximum range"
                    />
                  </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button>Save</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>


          </Select.Group>
        </Select.Content>
      </Select.Root>

    </Flex>

  );
};