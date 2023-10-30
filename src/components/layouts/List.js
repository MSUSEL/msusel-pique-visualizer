import "./List.css"
// Define the function that returns the list panel JSX
export const ListDisplay = (fileData) => {
    try {
        return (
            <div className="list-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    </div>
                    <h2>List Layout</h2>
                </div>
                {/* Display fileData.name, fileData.additionalData, and fileData.global_config */}
                <h3>Project Name: {fileData.name}</h3>
                {/* <div>Additional Data: {JSON.stringify(fileData.additionalData, null, 2)}</div>
                    {/* <div>Global Config: {JSON.stringify(fileData.global_config, null, 2)}</div>

                    {/* Loop through the high-level keys and display them */}
                {fileData && Object.keys(fileData).map((key, index) => {
                    try {
                        if (key === 'diagnostics' || key === 'name' || key === 'additionalData' || key === 'global_config') {
                            return null;  // Skip rendering fileData.diagnostics
                        }
                        return (
                            <div key={index}>
                                <strong>{key}:</strong>
                                {(key === 'factors' || key === 'measures') ? (
                                    <div style={{ marginLeft: '20px' }}>
                                        {/* Loop through the keys */}
                                        {Object.keys(fileData[key]).map((subKey) => (
                                            <div key={subKey}>
                                                <strong>{subKey}:</strong>
                                                {fileData[key][subKey] ? (  // Check if this object exists
                                                    <div style={{ marginLeft: '20px' }}>
                                                        {/* Display individual categories */}
                                                        {Object.keys(fileData[key][subKey]).map((categoryKey, catIndex) => {
                                                            const category = fileData[key][subKey][categoryKey];
                                                            return (
                                                                <div key={catIndex}>
                                                                    <strong>Name:</strong> {category.name}<br />
                                                                    <strong>Value:</strong> {category.value}<br />
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
                                                            );
                                                        })}
                                                    </div>
                                                ) : (<div>
                                                    <em>Information not available</em>
                                                </div>)}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        {/* For other keys, just stringify */}
                                        {JSON.stringify(fileData[key])}
                                    </div>
                                )}
                            </div>
                        );
                    } catch (error) {
                        return <div>Error while displaying {key}: {error.message}</div>
                    }
                })}
            </div>
        );
    } catch (error) {
        return <div>Error while displaying panel: {error.message}</div>;
    }
};
