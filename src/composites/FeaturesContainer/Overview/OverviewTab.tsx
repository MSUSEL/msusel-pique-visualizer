import { useEffect, useState } from 'react';
import { useAtomValue } from "jotai";
import { State } from "../../../state";
import { Flex, Text, Box, Button } from "@radix-ui/themes";
import { HamburgerMenuIcon, PinLeftIcon, PinRightIcon } from '@radix-ui/react-icons';
import { classifyRiskLevel } from "../../LegendContainer/ClassifyRiskLevel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { DSSide } from '.';
import "./DescriptiveStats.css"

interface FilterableItem {
    value: number;
    weights: Record<string, number>;
    [key: string]: any;
}

interface CategoryRiskLevelData {
    [riskLevel: string]: string[]; // Array of item keys
}

interface RiskLevelData {
    tqi: CategoryRiskLevelData;
    quality_aspects: CategoryRiskLevelData;
    product_factors: CategoryRiskLevelData;
}

export const OverviewTab = () => {

    

    const dataset = useAtomValue(State.dataset);

    const initialRiskLevelData: RiskLevelData = {
        tqi: {},
        quality_aspects: {},
        product_factors: {},
    };

    const [riskLevelData, setRiskLevelData] = useState<RiskLevelData>(initialRiskLevelData);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [isDSSideOpen, setDSSideOpen] = useState(false);

    const toggleDSSide = () => {
        setDSSideOpen(!isDSSideOpen);
    };

    const parseAndClassifyData = (data: any) => {
        let categorizedData: RiskLevelData = {
            tqi: {},
            quality_aspects: {},
            product_factors: {},
        };

        Object.keys(categorizedData).forEach(category => {
            const items = data[category];
            if (items) {
                Object.keys(items).forEach(itemKey => {
                    const item = items[itemKey] as FilterableItem;
                    if (item && typeof item.value === 'number') {
                        if (item.value >= -1 && item.value <= 1) {
                            const riskLevel = classifyRiskLevel(item.value);
                            categorizedData[category][riskLevel] = categorizedData[category][riskLevel] || [];
                            categorizedData[category][riskLevel].push(itemKey);
                        }
                    }
                });
            }
        });

        setRiskLevelData(categorizedData);
    };

    const createChartData = (categoryData: CategoryRiskLevelData) => {
        return [
            { name: 'Severe', count: categoryData['Severe']?.length || 0 },
            { name: 'High', count: categoryData['High']?.length || 0 },
            { name: 'Medium', count: categoryData['Medium']?.length || 0 },
            { name: 'Low', count: categoryData['Low']?.length || 0 },
            { name: 'Insignificant', count: categoryData['Insignificant']?.length || 0 },
        ];
    };

    useEffect(() => {
        if (dataset) {
            parseAndClassifyData(dataset);
        }
    }, [dataset]);

    return (
        <Flex className='overviewContainer' direction="row">
            <Box className='chartsContainer' style={{ flex: '1' }}>
                <Flex gap="3" align="center" direction="column">

                    <Text>Overview information of the uploaded JSON file.</Text>

                    {/* Quality Aspects Chart */}
                    <BarChart width={600} height={300} data={createChartData(riskLevelData.quality_aspects)}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>

                    {/* Product Factors Chart */}
                    <BarChart width={600} height={300} data={createChartData(riskLevelData.product_factors)}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#ffc658" />
                    </BarChart>

                    {/* Interactive elements for selecting risk levels and displaying sub-object names */}
                    {
                        selectedCategory && (
                            <Flex direction="column">
                                <Text size="4">Sub-Objects in {selectedCategory} Risk Level:</Text>
                                {
                                    // Assuming riskLevelData[selectedCategory] is an array of strings
                                    riskLevelData[selectedCategory]?.map((item, index) => (
                                        <Text key={index}>{item}</Text>
                                    ))
                                }
                            </Flex>
                        )
                    }
                </Flex>
            </Box>
            
            {/* Toggle Button */}
            <Button onClick={toggleDSSide} style={{}}>
                Lists {isDSSideOpen ? <PinRightIcon /> : <PinLeftIcon />}
            </Button>

            {/* DSSide panel */}
            <Box className='OverviewListContainer' style={{ flex: '0 0 auto', display: isDSSideOpen ? 'block' : 'none' }}>
                <DSSide />
            </Box>

        </Flex>
    );
};
