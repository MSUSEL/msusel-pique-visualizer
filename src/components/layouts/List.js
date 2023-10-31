import "./List.css"
import React, { useState } from 'react';
import { legendData } from "../legend/legend";


export const ListDisplay = ({ fileData }) => {

    const [showTQI, setShowTQI] = useState(false);
    const [showQualityAspects, setShowQualityAspects] = useState(false);
    const [showProductFactors, setShowProductFactors] = useState(false);
    const [showMeasures, setShowMeasures] = useState(false);

    const toggleSection = (sectionName) => {
        switch (sectionName) {
            case 'TQI':
                setShowTQI(!showTQI);
                break;
            case 'QualityAspects':
                setShowQualityAspects(!showQualityAspects);
                break;
            case 'ProductFactors':
                setShowProductFactors(!showProductFactors);
                break;
            case 'Measures':
                setShowMeasures(!showMeasures);
                break;
            default:
                break;
        }
    };



    const CategoryItem = ({ category }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const getBackgroundColor = (value) => {
            for (const legendItem of legendData) {
                const [low, high] = legendItem.range.split(" - ").map(Number);
                if (low <= value && value <= high) {
                    return legendItem.colorCode;
                }
            }
            return null; // Default case if value does not fit into any range
        };
        const backgroundColor = getBackgroundColor(category.value);

        return (
            <div>
                <button className="list-layout-button" 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ backgroundColor }}
                >
                    <strong className="object-text">{category.name} : </strong>  {category.value} 
                </button>
                {isExpanded && (
                    <div style={{ marginLeft: '20px' }}>
                        <strong>Description:</strong> {category.description}<br />
                        <strong>Eval Strategy:</strong> {category.eval_strategy}<br />
                        <strong>Normalizer:</strong> {category.normalizer}<br />
                        <strong>Utility Function:</strong> {category.utility_function}<br />
                        <strong>Weights:</strong>
                        <div style={{ marginLeft: '20px' }}>
                            {Object.keys(category.weights).map((weightKey) => (
                                <div key={weightKey}>
                                    <strong>{weightKey}:</strong> {category.weights[weightKey]}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };


    const renderSection = (data) => {
        return (
            <div>
                {Object.keys(data).map((categoryKey, catIndex) => {
                    const category = data[categoryKey];
                    return (
                        <CategoryItem key={catIndex} category={category} />
                    );
                })}
            </div>
        );
    };


    try {
        return (
            <div className="list-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                <button className={`list-layout-button section-button ${showTQI ? 'expanded-main-section' : ''}`} onClick={() => toggleSection('TQI')}>
                    Total Quality Index (TQI)
                </button>
                {showTQI && renderSection(fileData.factors.tqi)}

                <button className={`list-layout-button section-button ${showQualityAspects ? 'expanded-main-section' : ''}`} onClick={() => toggleSection('QualityAspects')}>
                    Quality Characteristics
                </button>
                {showQualityAspects && renderSection(fileData.factors.quality_aspects)}

                <button className={`list-layout-button section-button ${showProductFactors ? 'expanded-main-section' : ''}`} onClick={() => toggleSection('ProductFactors')}>
                    Quality Factors
                </button>
                {showProductFactors && renderSection(fileData.factors.product_factors)}

                <button className={`list-layout-button section-button ${showMeasures ? 'expanded-main-section' : ''}`} onClick={() => toggleSection('Measures')}>
                    Measures for Quality Factors
                </button>
                {showMeasures && renderSection(fileData.measures)}
            </div>
        );
    } catch (error) {
        return <div>Error while displaying panel: {error.message}</div>;
    }
};
