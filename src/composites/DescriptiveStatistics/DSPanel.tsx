import { useState } from "react";
import "./DescriptiveStats.css";
import {nodeRiskTally, DisplayDSList} from './index.ts';

export function DSSide(): JSX.Element {
    const [cDropStates, setCDropStates] = useState<Array<boolean>>(Array(15).fill(false));

    { /* Creates the array of tallies for each risk level */ }
    const descriptiveStatisticData = nodeRiskTally();

    return (            
        <div>
        {/* Quality Characteristics */}
        <h4>Quality Characteristics</h4>
        
        <p className = "SevereLevelCard">Severe: {descriptiveStatisticData.qualityAspectsCount[0]}
        <button onClick={() => {
            { /* Swaps visibility state for given index */ }
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[0] = !prevStates[0];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[0] && DisplayDSList('severe', 'quality_aspects', descriptiveStatisticData)
        }

        <p className = "HighLevelCard">High: {descriptiveStatisticData.qualityAspectsCount[1]} 
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[1] = !prevStates[1];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[1] && DisplayDSList('high', 'quality_aspects', descriptiveStatisticData)
        }

        <p className = "ModerateLevelCard">Moderate: {descriptiveStatisticData.qualityAspectsCount[2]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[2] = !prevStates[2];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[2] && DisplayDSList('moderate', 'quality_aspects', descriptiveStatisticData)
        }

        <p className = "MinorLevelCard">Minor: {descriptiveStatisticData.qualityAspectsCount[3]}
        <button onClick={() => {
            const updatedDropStates = [...cDropStates];
            updatedDropStates[3] = !cDropStates[3];
            setCDropStates(updatedDropStates);
            }}>&or;</button></p>
        {
            cDropStates[3] && DisplayDSList('minor', 'quality_aspects', descriptiveStatisticData)
        }
        
        <p className = "InsignificantLevelCard">Insignificant: {descriptiveStatisticData.qualityAspectsCount[4]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[4] = !prevStates[4];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[4] && DisplayDSList('insignificant', 'quality_aspects', descriptiveStatisticData)
        }


        {/* Quality Factors */}
        <h4>Quality Factors</h4>
        <p className = "SevereLevelCard">Severe: {descriptiveStatisticData.qualityFactorsCount[0]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[5] = !prevStates[5];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[5] && DisplayDSList('severe', 'product_factors', descriptiveStatisticData)
        }
        
        <p className = "HighLevelCard">High: {descriptiveStatisticData.qualityFactorsCount[1]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[6] = !prevStates[6];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[6] && DisplayDSList('high', 'product_factors', descriptiveStatisticData)
        }
        
        <p className = "ModerateLevelCard">Moderate: {descriptiveStatisticData.qualityFactorsCount[2]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[7] = !prevStates[7];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[7] && DisplayDSList('high', 'product_factors', descriptiveStatisticData)
        }
        
        <p className = "MinorLevelCard">Minor: {descriptiveStatisticData.qualityFactorsCount[3]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[8] = !prevStates[8];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[8] && DisplayDSList('minor', 'product_factors', descriptiveStatisticData)
        }
        
        <p className = "InsignificantLevelCard">Insignificant: {descriptiveStatisticData.qualityFactorsCount[4]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[9] = !prevStates[9];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[9] && DisplayDSList('insignificant', 'product_factors', descriptiveStatisticData)
        }

        {/* Quality Factors Measures */}
        <h4>Measures for Quality Factors</h4>
        <p className = "SevereLevelCard">Severe: {descriptiveStatisticData.measuresCount[0]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[10] = !prevStates[10];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[10] && DisplayDSList('severe', 'measures', descriptiveStatisticData)
        }
        
        <p className = "HighLevelCard">High: {descriptiveStatisticData.measuresCount[1]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[11] = !prevStates[11];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[11] && DisplayDSList('high', 'measures', descriptiveStatisticData)
        }
        
        <p className = "ModerateLevelCard">Moderate: {descriptiveStatisticData.measuresCount[2]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[12] = !prevStates[12];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[12] && DisplayDSList('moderate', 'measures', descriptiveStatisticData)
        }
        
        <p className = "MinorLevelCard">Minor: {descriptiveStatisticData.measuresCount[3]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[13] = !prevStates[13];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[13] && DisplayDSList('minor', 'measures', descriptiveStatisticData)
        }
        
        <p className = "InsignificantLevelCard">Insignificant: {descriptiveStatisticData.measuresCount[4]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[14] = !prevStates[14];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[14] && DisplayDSList('insignificant', 'measures', descriptiveStatisticData)
        }            
        </div>
    );
};