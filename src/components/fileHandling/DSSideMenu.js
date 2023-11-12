import React, {useState} from "react";
import {countChars, DisplayDSList} from "./DescriptiveStats";


const DSSide = ({data}) => {
    const [cDropStates, setCDropStates] = useState(Array(15).fill(false));

    const DescStats = countChars(data);

    return (            
        <div>
        {/* <h3>Descriptive Statistics</h3> */}
        {/* Quality Characteristics */}
        <h4>Quality Characteristics</h4>
        
        <p class = "dsSevereLevelCard">Severe: {DescStats.qChar[0]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[0] = !prevStates[0];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[0] && <DisplayDSList section='quality_aspects' riskLvl='severe' DescStats={DescStats}/>
        }

        <p class = "dsHighLevelCard">High: {DescStats.qChar[1]} 
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[1] = !prevStates[1];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[1] && <DisplayDSList section='quality_aspects' riskLvl='high' DescStats={DescStats}/>
        }

        <p class = "dsModerateLevelCard">Moderate: {DescStats.qChar[2]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[2] = !prevStates[2];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[2] && <DisplayDSList section='quality_aspects' riskLvl='moderate' DescStats={DescStats}/>
        }

        <p class = "dsMinorLevelCard">Minor: {DescStats.qChar[3]}
        <button onClick={() => {
            const updatedDropStates = [...cDropStates];
            updatedDropStates[3] = !cDropStates[3];
            setCDropStates(updatedDropStates);
            }}>&or;</button></p>
        {
            cDropStates[3] && <DisplayDSList section='quality_aspects' riskLvl='minor' DescStats={DescStats}/>
        }
        
        <p class = "dsInsignificantLevelCard">Insignificant: {DescStats.qChar[4]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[4] = !prevStates[4];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[4] && <DisplayDSList section='quality_aspects' riskLvl='insignificant' DescStats={DescStats}/>
        }


        {/* Quality Factors */}
        <h4>Quality Factors</h4>
        <p class = "dsSevereLevelCard">Severe: {DescStats.qFact[0]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[5] = !prevStates[5];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[5] && <DisplayDSList section='product_factors' riskLvl='severe' DescStats={DescStats}/>
        }
        
        <p class = "dsHighLevelCard">High: {DescStats.qFact[1]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[6] = !prevStates[6];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[6] && <DisplayDSList section='product_factors' riskLvl='high' DescStats={DescStats}/>
        }
        
        <p class = "dsModerateLevelCard">Moderate: {DescStats.qFact[2]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[7] = !prevStates[7];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[7] && <DisplayDSList section='product_factors' riskLvl='moderate' DescStats={DescStats}/>
        }
        
        <p class = "dsMinorLevelCard">Minor: {DescStats.qFact[3]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[8] = !prevStates[8];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[8] && <DisplayDSList section='product_factors' riskLvl='minor' DescStats={DescStats}/>
        }
        
        <p class = "dsInsignificantLevelCard">Insignificant: {DescStats.qFact[4]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[9] = !prevStates[9];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[9] && <DisplayDSList section='product_factors' riskLvl='insignificant' DescStats={DescStats}/>
        }

        {/* Quality Factors Measures */}
        <h4>Measures for Quality Factors</h4>
        <p class = "dsSevereLevelCard">Severe: {DescStats.qfMeas[0]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[10] = !prevStates[10];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[10] && <DisplayDSList section='measures' riskLvl='severe' DescStats={DescStats}/>
        }
        
        <p class = "dsHighLevelCard">High: {DescStats.qfMeas[1]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[11] = !prevStates[11];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[11] && <DisplayDSList section='measures' riskLvl='high' DescStats={DescStats}/>
        }
        
        <p class = "dsModerateLevelCard">Moderate: {DescStats.qfMeas[2]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[12] = !prevStates[12];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[12] && <DisplayDSList section='measures' riskLvl='moderate' DescStats={DescStats}/>
        }
        
        <p class = "dsMinorLevelCard">Minor: {DescStats.qfMeas[3]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[13] = !prevStates[13];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[13] && <DisplayDSList section='measures' riskLvl='minor' DescStats={DescStats}/>
        }
        
        <p class = "dsInsignificantLevelCard">Insignificant: {DescStats.qfMeas[4]}
        <button onClick={() => {
            setCDropStates(prevStates => {
                const updatedDropStates = [...prevStates];
                updatedDropStates[14] = !prevStates[14];
                return updatedDropStates;
            });
            }}>&or;</button></p>
        {
            cDropStates[14] && <DisplayDSList section='measures' riskLvl='insignificant' DescStats={DescStats}/>
        }            
        </div>
    );
};

export default DSSide;