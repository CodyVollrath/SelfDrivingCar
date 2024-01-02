class UndoAction{
    constructor(node, edges, type) {
        this.type = type;
        this.node = node;
        this.lastX = node.x;
        this.lastY = node.y;
        this.edges = edges;
    }
}