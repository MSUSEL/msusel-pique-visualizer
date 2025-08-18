
# Using the PIQUE Visualizer

The PIQUE Visualizer offers an intuitive interface for visualizing software quality assessments. This guide provides an overview of how to use the visualizer, from uploading your data to exploring the results.

## File Upload

- **Process:** To begin, upload the compact JSON version of your PIQUE results. The visualizer accepts JSON files structured according to the [Input File Schema Requirements](input-file-schema-requirements). Use the "Upload" button on the main interface to select and upload your file.
- **Benefits:** Uploading a compact JSON file reduces redundancy, decreases file size, and preserves the essential data for visualization, enabling a smoother and faster analysis process.

## Initial Display

- **Overview:** Upon successfully uploading your file, the PIQUE Visualizer displays the results in a hierarchical tree structure. This visualization represents the software quality score and its components, including tqi, quality aspects, and product factors.
- **Interpreting the Display:** The tree structure allows you to see at a glance how different factors contribute to the overall quality score. Each node represents a factor, measure, or diagnostic, with edges indicating relationships and dependencies.

## Viewing Children and Parents

- **Viewing Children:** Click on any node to expand and view its children. This action reveals how each sub-factor contributes to its parent, helping you understand the finer details of the quality assessment.
- **Viewing Parents:** Similarly, you can view a node's parents by clicking on a designated icon or area in the node. This feature helps trace the contribution of individual elements to the overall quality score.

## Navigating the Tree

- **Exploring Levels:** Navigate through different levels of the tree to examine the software quality structure in detail. The visualizer allows you to zoom in and out, providing a flexible view of both the broader picture and specific details.
- **Information Panel:** Clicking on a node also brings up an information panel on the side, displaying detailed data about that element. This panel includes quality impact scores and other relevant metrics, offering deeper insights into each component's significance.

## Dynamic Weight Adjustment

- **Adjustment Feature:** The visualizer includes a feature for dynamically adjusting the weights of various factors. This allows you to experiment with different scenarios and see how changes in factor importance affect the overall quality score.
- **Guidelines for Adjustment:** Use the adjustment feature judiciously, considering the real-world implications of altering factor weights. The documentation provides guidelines and use cases to help you make informed adjustments.

## Other Display Options

- **Sorting and Filtering:** The visualizer supports sorting and filtering options, allowing you to organize the displayed data according to specific criteria. These features aid in focusing on the most relevant factors or measures.
- **Resetting Views:** You can easily reset your adjustments to return to the original view, ensuring you can experiment with different analyses without losing your baseline.

## Conclusion

The PIQUE Visualizer is a powerful tool for understanding and improving software quality. By following this guide, you'll be well-equipped to explore your quality assessment results and gain valuable insights into your software projects.
