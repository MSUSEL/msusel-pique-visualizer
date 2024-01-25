import { useMemo } from 'react';
import { useAtomValue } from "jotai";
import { State } from "../../state";
import { Box, Flex, Avatar, Text, HoverCard, Link, Separator, Badge } from "@radix-ui/themes";
import { classifyRiskLevel } from "../LegendContainer/ClassifyRiskLevel";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Tooltip, Cell } from 'recharts';
import * as schema from '../../data/schema';


interface FilterableItem {
    name: string;
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

// define a function classifyRiskLevels for a high-level object, such as tqi, quality_aspects, product_factors
// input: an object: NestedObject
// ouput: two arrays or a dictionary: risk level counts, and objects.names in each level

function classifyNestedObjRiskLevel(obj: Record<string, FilterableItem>): [number[], string[][]] {
    const riskCounts = [0, 0, 0, 0, 0];
    const riskSubObjNames: string[][] = [[], [], [], [], []];

    for (const key in obj) {
        const item = obj[key];
        if (item.value < 0.2) {
            riskCounts[0]++;
            riskSubObjNames[0].push(item.name);
        } else if (item.value >= 0.2 && item.value < 0.4) {
            riskCounts[1]++;
            riskSubObjNames[1].push(item.name);
        } else if (item.value >= 0.4 && item.value < 0.6) {
            riskCounts[2]++;
            riskSubObjNames[2].push(item.name);
        } else if (item.value >= 0.6 && item.value < 0.8) {
            riskCounts[3]++;
            riskSubObjNames[3].push(item.name);
        } else if (item.value >= 0.8) {
            riskCounts[4]++;
            riskSubObjNames[4].push(item.name);
        }
    }


    return [riskCounts, riskSubObjNames];
};

function hasWeights(obj: any): obj is { weights: Record<string, number> } {
    return obj && typeof obj === 'object' && 'weights' in obj;
}

const generateChartData = (riskData: [number[], string[][]] | null) => {
    if (!riskData) return [];
    const [riskCounts] = riskData;
    return ['Severe', 'High', 'Medium', 'Low', 'Insignificant'].map((level, index) => ({
        name: level,
        Count: riskCounts[index]
    }));
};

export const AlternativeOverviewTab = () => {
    const dataset = useAtomValue(State.dataset);
    const tqiRiskData = useMemo(() => dataset ? classifyNestedObjRiskLevel(dataset.factors.tqi) : null, [dataset]);
    const qualityAspectsRiskData = useMemo(() => dataset ? classifyNestedObjRiskLevel(dataset.factors.quality_aspects) : null, [dataset]);
    const productFactorsRiskData = useMemo(() => dataset ? classifyNestedObjRiskLevel(dataset.factors.product_factors) : null, [dataset]);

    // Determine the risk level and name for TQI
    const tqiRiskLevel = useMemo(() => {
        if (!tqiRiskData || !dataset) return { level: '', name: '' };
        const [riskCounts, riskSubObjNames] = tqiRiskData;
        const levelIndex = riskCounts.findIndex(count => count > 0);
        const levelName = levelIndex >= 0 ? ['Severe', 'High', 'Medium', 'Low', 'Insignificant'][levelIndex] : '';
        const name = levelIndex >= 0 ? riskSubObjNames[levelIndex][0] : '';
        const value = Object.values(dataset.factors.tqi)[0].value;
        return { level: levelName, name, value };
    }, [tqiRiskData]);

    // Prepare data for the chart
    const qualityAspectsChartData = useMemo(() => generateChartData(qualityAspectsRiskData), [qualityAspectsRiskData]);
    const productFactorsChartData = useMemo(() => generateChartData(productFactorsRiskData), [productFactorsRiskData]);


    // Define colors for each slice of the pie chart
    const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE', '#8884d8'];

    // Get top 3 problematic objects
    const topProblematicQualityAspects = useMemo(() => {
        if (!qualityAspectsRiskData || !dataset) return [];

        // Assuming there's only one subobject in dataset.factors.tqi
        const tqiSubObject = Object.values(dataset.factors.tqi)[0];
        const tqiWeights = hasWeights(tqiSubObject) ? tqiSubObject.weights : {};

        const [_, riskSubObjNames] = qualityAspectsRiskData;
        return riskSubObjNames.flat().slice(0, 3).map(name => {
            const details = dataset.factors.quality_aspects[name];
            const weight = name in tqiWeights ? tqiWeights[name] : 'N/A';

            return { name, details, weight: weight.toString() };
        });
    }, [qualityAspectsRiskData, dataset]);

    const topProblematicProductFactors = useMemo(() => {
        if (!productFactorsRiskData || !dataset) return [];

        const [_, riskSubObjNames] = productFactorsRiskData;
        return riskSubObjNames.flat().slice(0, 3).map(name => {
            const details = dataset.factors.product_factors[name];
            const qualityAspectWeights = Object.values(dataset.factors.quality_aspects)[0].weights;
            const weight = name in qualityAspectWeights ? qualityAspectWeights[name] : 'N/A';

            return { name, details, weight: weight.toString() };
        });
    }, [productFactorsRiskData, dataset]);



    return (

        <Flex direction={"column"} gap={"3"} align={"center"} style={{ width: '100%' }}>

            <Flex direction={"row"} gap={"3"} align={"center"} style={{ width: '100%' }} justify="center">
                <Box>
                    <Avatar size="5" fallback="TQI" />
                </Box>
                <Flex direction={'column'}>
                    <Text> Project Name: {tqiRiskLevel.name}</Text>
                    <Text> Total Quality Index: {tqiRiskLevel.value?.toFixed(3)}</Text>
                    <Text> Risk Level: {tqiRiskLevel.level}</Text>
                </Flex>

                
            </Flex>

            <Separator my="3" size="4" />

            <Flex direction={"row"} style={{ width: '100%' }} justify="between">
                <Flex direction={"column"} align={'center'} gap={'5'} style={{ flexBasis: '30%' }}>
                    <Box> <Badge size="2">Charactortistics</Badge> </Box>
                    <Box>
                        {/* Display risk counts here */}
                        {qualityAspectsChartData.map((data, index) => (
                            <Text key={index}><p>{data.name}: {data.Count}</p></Text>
                        ))}
                    </Box>
                </Flex>

                <Flex direction={"column"} align={'center'} gap={'5'} style={{ flexBasis: '30%' }}>
                    <Box><Text> Risk Level Distribution</Text></Box>
                    <Box>
                        {/* Pie chart visualization */}
                        <PieChart width={300} height={300}>
                            <Pie
                                data={qualityAspectsChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="Count"
                                label
                            >
                                {
                                    qualityAspectsChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </Box>
                </Flex>

                <Flex direction={"column"} align={'center'} gap={'5'} style={{ flexBasis: '30%' }}>
                    <Box><Text>Top 3 lowest Quality Characteristics:</Text></Box>
                    <Box>
                        {topProblematicQualityAspects.map((item, index) => (
                            <HoverCard.Root key={index}>
                                <HoverCard.Trigger>
                                    <p><Link href="#">{item.name}: {item.details.value.toFixed(3)}</Link></p>
                                </HoverCard.Trigger>
                                <HoverCard.Content>
                                    <Text as="div" size="1" style={{ maxWidth: 325 }}>
                                        <p><strong>Name:</strong> {item.name}</p>
                                        <p><strong>Value:</strong> {item.details.value.toFixed(3)}</p>
                                        <p><strong>Impact to TQI:</strong> {item.weight}</p>
                                        <p><strong>Description:</strong> {item.details.description}</p>
                                    </Text>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        ))}
                    </Box>
                </Flex>
            </Flex>

            <Separator my="3" size="4" />

            <Flex direction={"row"} style={{ width: '100%' }} justify="between">
                <Flex direction={"column"} align={'center'} gap={'5'} style={{ flexBasis: '30%' }}>
                    <Box> <Badge size="2">Factors</Badge> </Box>
                    <Box>
                        {/* Display risk counts here */}
                        {productFactorsChartData.map((data, index) => (
                            <Text key={index}><p>{data.name}: {data.Count}</p></Text>
                        ))}
                    </Box>
                </Flex>

                <Flex direction={"column"} align={'center'} gap={'5'} style={{ flexBasis: '30%' }}>
                    <Box><Text> Risk Level Distribution</Text></Box>
                    <Box>
                        {/* Pie chart visualization */}
                        <PieChart width={300} height={300}>
                            <Pie
                                data={productFactorsChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="Count"
                                label
                            >
                                {
                                    productFactorsChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </Box>
                </Flex>

                <Flex direction={"column"} align={'center'} gap={'5'} style={{ flexBasis: '30%' }}>
                    <Box><Text>Top 3 lowest Quality Characteristics:</Text></Box>
                    <Box>
                        {topProblematicProductFactors.map((item, index) => (
                            <HoverCard.Root key={index}>
                                <HoverCard.Trigger>
                                    <p><Link href="#">{item.name}: {item.details.value.toFixed(3)}</Link></p>
                                </HoverCard.Trigger>
                                <HoverCard.Content>
                                    <Text as="div" size="1" style={{ maxWidth: 325 }}>
                                        <p><strong>Name:</strong> {item.name}</p>
                                        <p><strong>Value:</strong> {item.details.value.toFixed(3)}</p>
                                        <p><strong>Impact to TQI:</strong> {item.weight}</p>
                                        <p><strong>Description:</strong> {item.details.description}</p>
                                    </Text>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        ))}
                    </Box>
                </Flex>
            </Flex>

        </Flex>
    )
}