/**
 * Return the correct node from the PIQUE .json output file.
 *
 * @param fileData PIQUE .json output file.
 * @param clicked_ID ID of the clicked description clicker box.
 */
export function findPIQUENode(fileData,clicked_ID) {
    const split_clicked_ID = clicked_ID.split("^");

    const node_type = split_clicked_ID[1];
    const node_name = split_clicked_ID[2];

    const jsonDepthDecider = ((node_type === "measures" || node_type === "diagnostics") ? 0 : 1)

    if (jsonDepthDecider === 1) {
        return fileData.factors[node_type][node_name]
    }
    else if (jsonDepthDecider === 0) {
        return fileData[node_type][node_name]
    }

}

/**
 * Determines the color of the description clicker (the box in the top right corner of each node)
 * Shouldn't be a costly algorithm since there are a max 100+ description clickers on screen, and
 * the side panel can only hold <= 5 nodes... so max ~500 comparisons
 *
 * @param nodesForPanelBoxes the nodes in the side panel
 * @param selected_id ID of description clicker box that was clicked
 */
export function determineDescriptionClickerColor(nodesForPanelBoxes,selected_id) {
    const panel_names = nodesForPanelBoxes.map(
        node => node.name
    )

    const id_name = selected_id.split("^")[1];

    if (panel_names.includes(id_name)) return "red"
    else return "blue"
}
