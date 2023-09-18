import React, { useState } from 'react';
import "../fileHandling/UploadFile.css";

export const RenderNestedData = ({ data, level = 0, parentKey = '' }) => {
    const [showContent, setShowContent] = useState({});
    let nameValue = {};

    const toggleContent = (key) => {
        setShowContent((prevShowContent) => ({
            ...prevShowContent,
            [key]: !prevShowContent[key],
        }));
    };

    return (
        <ul className={"nested-list-level-" + level}>
            {Object.keys(data).sort((a, b) => {
                const order = ['tqi', 'quality_aspects', 'product_factors', 'measures', 'diagnostics'];
                return order.indexOf(a) - order.indexOf(b);
            }).map((key, index) => {
                if (key === "name" || key === "value") {
                    nameValue[key] = data[key];
                    if (nameValue["name"] && nameValue["value"] !== undefined) {
                        return (
                            <li key={index} className="nested-list-item">
                                <span className={"nested-list-key-value level-" + level}>
                                    {nameValue["name"]}: {nameValue["value"]}
                                </span>
                            </li>
                        );
                    }
                    return null;
                }

                if (
                    key === "product_factors" ||
                    key === "quality_aspects" ||
                    key === "tqi" ||
                    key === "measures" ||
                    key === "diagnostics"
                ) {
                    return (
                        <li key={index} className="nested-list-item">
                            <button onClick={() => toggleContent(key)}>
                                <span className={"nested-list-key level-" + level}>{key}:</span>
                            </button>
                            {showContent[key] && typeof data[key] === "object" ? <RenderNestedData data={data[key]} level={level + 1} key={key} /> : null}
                        </li>
                    );
                }

                if (typeof data[key] === "object") {
                    return <RenderNestedData data={data[key]} level={level + 1} key={key} />;
                }

                return null;
            })}
        </ul>
    );
};

//export default RenderNestedData;
