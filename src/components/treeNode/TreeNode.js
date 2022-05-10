

export default class TreeNode {
    constructor(info,width,height,x,y) {
        this.json_data = info;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.children = [];
        this.edge_weights = this.json_data.weights;
        this.nz_edge_weights = this.non_zero_edges();
    }

    get node_center_x() {
        return (this.x + this.width/2);
    }

    get node_center_y() {
        return (this.y + this.height/2);
    }

    get name() {
        return this.json_data.name;
    }

    non_zero_edges() {
        let non_zero_edges = [];
        for (let edge in this.edge_weights) {
            if (this.edge_weights[edge] != 0) {
                //console.log("this weight is",this.edge_weights[edge]);
                non_zero_edges.push([edge,this.edge_weights[edge]])
            }
        }
        return non_zero_edges;
    }


}
