
# Input File Schema Requirements

The PIQUE Visualizer utilizes a specific JSON structure to accurately visualize the quality assessment of software projects. This page details the schema's requirements, ensuring that users prepare their input files correctly for optimal visualization.

## Overview

A well-structured input file is crucial for the PIQUE Visualizer to function correctly. The file should follow a predefined schema that includes several key components: `name`, `global_config`, `factors`, `measures`, `diagnostics`, and `additionalData`. Each component plays a vital role in the visualization process.

## Schema Components

### General Dataset Structure

- **`name`**: `string`
  - The dataset's name, providing a unique identifier.
- **`global_config`**: `Record<string, any>`
  - Global configuration settings that apply to the entire dataset.
- **`factors`**: `Record<Record<Factor>>`
  - A nested record structure detailing the factors, including `tqi`, `quality_aspects`, and `product_factors`.
- **`measures`**: `Record<Measure>`
  - A collection of measures assessing specific quality aspects.
- **`diagnostics`**: `Record<Diagnostic>`
  - Diagnostic information useful for deeper analysis.
- **`additionalData`**: `Record<string, any>`
  - Any additional data that might be relevant for the visualization but doesn't fit into the other categories.

### Understanding "Record" in the Schema

In TypeScript, a `Record<K, T>` type represents an object with keys of type `K` and values of type `T`. This structure allows for dynamic and flexible data models where the exact keys might not be known in advance but are constrained to a specific type.

### Factors, Measures, and Diagnostics

- **Factors**
  - Represented as `Record<Factor>`, factors are key components in evaluating the overall quality. Each factor includes a `name`, `value`, `eval_strategy`, `normalizer`, `utility_function`, `description`, and `weights`.
  
- **Measures**
  - Each measure, detailed in a `Record<Measure>`, focuses on specific quality aspects. Fields include `description`, `eval_strategy`, `normalizer`, `positive`, `thresholds`, `utility_function`, `value`, and `weights`.

- **Diagnostics**
  - Diagnostics provide insight into the evaluation process, including `description`, `eval_strategy`, `name`, `normalizer`, `toolName`, `utility_function`, `value`, and `weights`.

### Utility Function Structure

Utility functions describe how factor and measure values are calculated and interpreted. They can be specified as a simple string or a detailed object, including fields like `name`, `description`, and optionally, `benchmarkTag`, `utilityFunctionImageURIs`, `benchmarkQualityMetrics`, `utilityFunctionQualityMetrics`, and `sensitivityAnalysisResults`.

## Compatibility Note

For the PIQUE Visualizer to accurately process and visualize your data, ensure that your input JSON file meticulously follows the detailed schema. Proper adherence to this schema is paramount for the tool's effectiveness.
