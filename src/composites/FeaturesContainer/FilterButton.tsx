import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Select, TextField, Dialog, Button, Flex, Text, DropdownMenu } from "@radix-ui/themes";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

export const FilterButton = () => {
  const dataset = useAtomValue(State.dataset);
  const [checkboxStates, setCheckboxStates] = useAtom(State.filteringByRiskLevelCheckboxStates);

  const handleCheckboxChange = (label: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxStates({ ...checkboxStates, [label]: e.target.checked });
  };

  console.log("Current filter checkboxes status", checkboxStates);

  return (

    <Flex gap="3" align="center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger >
          <Button variant="soft">
            <MixerHorizontalIcon />
            No Filtering
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {/* filter by risk level*/}
          <DropdownMenu.Group>
            <DropdownMenu.Label>Risk Level</DropdownMenu.Label>
            {["Insignificant", "Low", "Medium", "High", "Severe"].map((label) => (
              <DropdownMenu.Item key={label}>
                <label>
                  <input
                    type="checkbox"
                    checked={checkboxStates[label]}
                    onChange={handleCheckboxChange(label)}
                  />
                  {label}
                </label>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          {/* filter by objects value range*/}
          <DropdownMenu.Group>
            <DropdownMenu.Label>Value</DropdownMenu.Label>
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

          </DropdownMenu.Group>

          <DropdownMenu.Separator />

          {/* filter by objects weights range*/}
          <DropdownMenu.Group>
            <DropdownMenu.Label>Weight</DropdownMenu.Label>
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


          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

    </Flex>

  );
};