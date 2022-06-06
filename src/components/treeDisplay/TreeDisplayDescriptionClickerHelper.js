/**
 * Return the correct node from the PIQUE .json output file.
 *
 * @param fileData PIQUE .json output file.
 * @param clicked_ID the ID of the clicked description clicker box.
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
        console.log(fileData)
        console.log(fileData[node_type])
        return fileData[node_type][node_name]
    }

}