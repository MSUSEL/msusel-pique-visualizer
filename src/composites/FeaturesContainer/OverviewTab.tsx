import { useAtom, useAtomValue } from "jotai";
import { State } from "../../state";
import { Button, IconButton, Flex, Text } from "@radix-ui/themes";
import { BarChartIcon } from "@radix-ui/react-icons";
import { classifyRiskLevel } from "../LegendContainer/ClassifyRiskLevel";
import { base } from "../../data/schema";


interface RiskLevelData {
    Severe: string[];
    High: string[];
    Medium: string[];
    Low: string[];
    Insignificant: string[];
}

interface Item {
    name: string;
    value: number;
}


export const OverviewTab = () => {
    const dataset = useAtomValue(State.dataset);
    const parsedDataset = JSON.parse(JSON.stringify(dataset))



    return (

        <Flex gap="3" align="center">

            <Text>
                Proview the overview information of the uploaded json fileData, remove the content in descriptive statistics button  to here.
            </Text>


        </Flex>




    );
};