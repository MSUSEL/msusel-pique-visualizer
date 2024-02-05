import { useAtom, useAtomValue } from "jotai";
import React, { useMemo, useState } from 'react';
import { State } from "../../../state";
import { Button, Flex, Text, HoverCard, Link, Strong, Table, Box, Card, Avatar } from "@radix-ui/themes";
import { ResetIcon, DownloadIcon } from "@radix-ui/react-icons";
import SingleTableRow from "./SingleRowInTable";
import { Profile } from '../../../types';


interface Weights {
    [key: string]: number;
}

interface TQIEntry {
    weights: Weights;
}

interface AdjustmentTableProps {
    selectedProfile?: Profile[];
    isProfileApplied: boolean;
    onResetApplied: () => void; // New prop for reset handler
}


export const AdjustmentTable: React.FC<AdjustmentTableProps> = ({ selectedProfile, isProfileApplied, onResetApplied }) => {

    const dataset = useAtomValue(State.dataset);
    if (!dataset) return null;

     // Define a function to calculate initial weights
     const getInitialWeights = (useDataset: boolean = false) => {
        let weights: Weights = {};
        if (selectedProfile && selectedProfile.length > 0 && !useDataset) {
            // Use weights from the first selected profile
            const profileWeights = selectedProfile[0].importance;
            Object.entries(profileWeights).forEach(([aspect, importance]) => {
                weights[aspect] = importance;
            });
        } else {
            // Fallback to dataset weights
            Object.entries(dataset.factors.tqi).forEach(([_, tqiEntry]) => {
                const entry = tqiEntry as TQIEntry;
                Object.assign(weights, entry.weights);
            });
        }
        return weights;
    };

    // State for slider values
    const [sliderValues, setSliderValues] = useState<Weights>(getInitialWeights);

    // Reset sliders to initial weights (dataset or selected profile)
    const resetAllAdjustments = () => {
        setSliderValues(getInitialWeights(true)); // Force use of dataset weights
        onResetApplied(); // Signal to parent that reset was triggered
    };

   // Calculate total importance for normalization
   const totalImportance = useMemo(() => Object.values(sliderValues).reduce((sum, importance) => sum + importance, 0), [sliderValues]);


    // Recalculate weights based on slider adjustments
    const recalculatedWeights = useMemo(() => {
        const newWeights: Weights = {};
        Object.keys(sliderValues).forEach(name => {
            newWeights[name] = sliderValues[name] / totalImportance;
        });
        return newWeights;
    }, [sliderValues, totalImportance]);


    // Handle slider value change
    const handleSliderChange = (name: string, newImportance: number) => {
        setSliderValues(prev => ({ ...prev, [name]: newImportance }));
    };

    // Update sliderValues when selectedProfile changes
    if (isProfileApplied) {
        const newInitialWeights = getInitialWeights();
        if (JSON.stringify(newInitialWeights) !== JSON.stringify(sliderValues)) {
            setSliderValues(newInitialWeights);
        }
    }




    // TQI calculation
    const currentTQI = Object.values(dataset.factors.tqi)[0]?.value || 0;
    const updatedTQI = useMemo(() => {
        return Object.entries(recalculatedWeights).reduce((total, [name, weight]) => {
            return total + (dataset.factors.quality_aspects[name]?.value || 0) * weight;
        }, 0);
    }, [recalculatedWeights, dataset]);


    

    return (
        <Flex direction={"column"} align={"center"}>
            <Box>
                <Table.Root variant='surface'>
                    <Table.Header>
                        <Table.Row align={'center'}>
                            <Table.ColumnHeaderCell justify={'center'} width={'25%'}>
                                <HoverCard.Root>
                                    <HoverCard.Trigger>
                                        <Link href="#">Characteristics</Link>
                                    </HoverCard.Trigger>
                                    <HoverCard.Content>
                                        <Text as="div" style={{ maxWidth: 325 }}>
                                            These are the Quality Characteristics that have impacts towards the TQI (Total Quality Index).
                                        </Text>
                                    </HoverCard.Content>
                                </HoverCard.Root>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell justify={'center'} width={'15%'}>Current Value</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell justify={'center'} width={'15%'}>Current Weight</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell justify={'center'} width={'30%'}>
                                <HoverCard.Root>
                                    <HoverCard.Trigger>
                                        <Link href="#">Importance Adjustment Slider</Link>
                                    </HoverCard.Trigger>
                                    <HoverCard.Content>
                                        <Text as="div" style={{ maxWidth: 325 }}>
                                            Please drag the thumb on the slider to adjust the improtance.
                                            The importance could be between 0 and 1.
                                            The next column <Strong>Adjusted Weight</Strong> renders the updated weight values based on the adjusted importance.
                                            The <Strong>Updated TQI</Strong> is updated while adjustment immediately.
                                        </Text>
                                    </HoverCard.Content>
                                </HoverCard.Root></Table.ColumnHeaderCell>

                            <Table.ColumnHeaderCell justify={'center'} width={'15%'}>Adjusted Weight</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {Object.entries(dataset.factors.tqi).map(([_, tqiEntry]) => {
                            return Object.entries(tqiEntry.weights).map(([name, weight]) => {
                                return (
                                    <SingleTableRow
                                        key={name}
                                        name={name}
                                        qualityAspectValue={dataset.factors.quality_aspects[name]?.value || 0}
                                        qualityAspectDescription={dataset.factors.quality_aspects[name]?.description || ''}
                                        weightValue={weight}
                                        sliderValue={sliderValues[name]}
                                        recalculatedWeight={recalculatedWeights[name]}
                                        onSliderChange={handleSliderChange}
                                    />
                                );
                            });
                        })}
                    </Table.Body>


                </Table.Root>
            </Box>

            <Flex direction={"row"} align={"center"} justify="between" style={{ width: '100%' }}>
                <Box style={{ flexBasis: '40%' }}>
                    <Card size="1">
                        <Flex gap="3" align="center">
                            <Avatar size="3" radius="full" fallback="Ini" color="indigo" />
                            <Box>
                                <Text as="div" size="2" weight="bold">
                                    Initial TQI
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    {currentTQI.toFixed(4)}
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
                </Box>
                <Box style={{ flexBasis: '40%' }}>
                    <Card size="1">
                        <Flex gap="3" align="center">
                            <Avatar size="3" radius="full" fallback="New" color="indigo" />
                            <Box>
                                <Text as="div" size="2" weight="bold">
                                    Updated TQI
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    {updatedTQI.toFixed(4)}
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
                </Box>
                <Flex direction={"column"} style={{ width: '20%' }}>
                    <Box> {/* Add some spacing between buttons */}
                        <Button variant="surface" onClick={() => { resetAllAdjustments }} style={{ width: '100%', height: '30px' }}>
                            <ResetIcon width="16" height="16" />
                            Reset
                        </Button>

                    </Box>
                    <Box>
                        <Button variant={"surface"} style={{ width: '100%', height: '30px' }}>
                            <DownloadIcon width="16" height="16" />
                            Download
                        </Button>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
}