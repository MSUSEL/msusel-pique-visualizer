import React, {useState} from "react";
import "./DescriptiveStats.css";
import DescriptiveStatistics from "./index.js";


const DSSide = ({data}) => {
    const [cDropStates, setCDropStates] = useState(Array(15).fill(false));

    { /* Creates the array of tallies for each risk level */ }
    const NodeCount = DescriptiveStatistics.nodeRiskTally(data);

    return (            
        <div>
        {/* Quality Characteristics */}
        <h4>Quality Characteristics</h4>
        
        <p class = "SevereLevelCard">Severe: {NodeCount.qChar[0]}
        <button onClick={() => {
            { /* Swaps visibility state for given index */ }
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[0] = !prevStates[0];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[0] && <DescriptiveStatistics.DisplayDSList section='quality_aspects' riskLvl='severe' NodeCount={NodeCount}/>
        }

        <p class = "HighLevelCard">High: {NodeCount.qChar[1]} 
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[1] = !prevStates[1];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[1] && <DescriptiveStatistics.DisplayDSList section='quality_aspects' riskLvl='high' NodeCount={NodeCount}/>
        }

        <p class = "ModerateLevelCard">Moderate: {NodeCount.qChar[2]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[2] = !prevStates[2];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[2] && <DescriptiveStatistics.DisplayDSList section='quality_aspects' riskLvl='moderate' NodeCount={NodeCount}/>
        }

        <p class = "MinorLevelCard">Minor: {NodeCount.qChar[3]}
        <button onClick={() => {
            const updatedDropStates = [...cDropStates];
            updatedDropStates[3] = !cDropStates[3];
            setCDropStates(updatedDropStates);
            }}>&or;</button></p>
        {
            cDropStates[3] && <DescriptiveStatistics.DisplayDSList section='quality_aspects' riskLvl='minor' NodeCount={NodeCount}/>
        }
        
        <p class = "InsignificantLevelCard">Insignificant: {NodeCount.qChar[4]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[4] = !prevStates[4];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[4] && <DescriptiveStatistics.DisplayDSList section='quality_aspects' riskLvl='insignificant' NodeCount={NodeCount}/>
        }


        {/* Quality Factors */}
        <h4>Quality Factors</h4>
        <p class = "SevereLevelCard">Severe: {NodeCount.qFact[0]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[5] = !prevStates[5];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[5] && <DescriptiveStatistics.DisplayDSList section='product_factors' riskLvl='severe' NodeCount={NodeCount}/>
        }
        
        <p class = "HighLevelCard">High: {NodeCount.qFact[1]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[6] = !prevStates[6];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[6] && <DescriptiveStatistics.DisplayDSList section='product_factors' riskLvl='high' NodeCount={NodeCount}/>
        }
        
        <p class = "ModerateLevelCard">Moderate: {NodeCount.qFact[2]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[7] = !prevStates[7];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[7] && <DescriptiveStatistics.DisplayDSList section='product_factors' riskLvl='moderate' NodeCount={NodeCount}/>
        }
        
        <p class = "MinorLevelCard">Minor: {NodeCount.qFact[3]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[8] = !prevStates[8];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[8] && <DescriptiveStatistics.DisplayDSList section='product_factors' riskLvl='minor' NodeCount={NodeCount}/>
        }
        
        <p class = "InsignificantLevelCard">Insignificant: {NodeCount.qFact[4]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[9] = !prevStates[9];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[9] && <DescriptiveStatistics.DisplayDSList section='product_factors' riskLvl='insignificant' NodeCount={NodeCount}/>
        }

        {/* Quality Factors Measures */}
        <h4>Measures for Quality Factors</h4>
        <p class = "SevereLevelCard">Severe: {NodeCount.qfMeas[0]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[10] = !prevStates[10];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[10] && <DescriptiveStatistics.DisplayDSList section='measures' riskLvl='severe' NodeCount={NodeCount}/>
        }
        
        <p class = "HighLevelCard">High: {NodeCount.qfMeas[1]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[11] = !prevStates[11];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[11] && <DescriptiveStatistics.DisplayDSList section='measures' riskLvl='high' NodeCount={NodeCount}/>
        }
        
        <p class = "ModerateLevelCard">Moderate: {NodeCount.qfMeas[2]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[12] = !prevStates[12];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[12] && <DescriptiveStatistics.DisplayDSList section='measures' riskLvl='moderate' NodeCount={NodeCount}/>
        }
        
        <p class = "MinorLevelCard">Minor: {NodeCount.qfMeas[3]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[13] = !prevStates[13];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[13] && <DescriptiveStatistics.DisplayDSList section='measures' riskLvl='minor' NodeCount={NodeCount}/>
        }
        
        <p class = "InsignificantLevelCard">Insignificant: {NodeCount.qfMeas[4]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[14] = !prevStates[14];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[14] && <DescriptiveStatistics.DisplayDSList section='measures' riskLvl='insignificant' NodeCount={NodeCount}/>
        }            
        </div>
    );
};

export default DSSide;