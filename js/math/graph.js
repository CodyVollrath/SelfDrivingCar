class Graph {
    constructor(nodes = [], edges = []) {
        this.nodes = nodes;
        this.edges = edges;
    }

    tryAddPoint(node) {
        if (this.contiansPoint(node)) {
            return false;
        }
        this.addPoint(node);
        return true;
    }

    tryAddSegment(edge) {
        if (this.containsSegment(edge) || edge.p1.equals(edge.p2)) {
            return false;
        }
        this.addSegment(edge);
        return true;
    }

    addPoint(node) {
        this.nodes.push(node);
    }
    

    addSegment(edge) {
        this.edges.push(edge);
    }

    dispose() {
        this.nodes.length = 0;
        this.edges.length = 0;
    }

    removeSegment(edge) {
        this.edges.splice(this.edges.indexOf(edge), 1);
    }

    removePoint(node) {
        let i = this.edges.length;
        while (i--) {
            let edge = this.edges[i];
            if (edge.includes(node)) {
                this.removeSegment(edge);
            }
        }
        this.nodes.splice(this.nodes.indexOf(node), 1);
    }

    containsSegment(edge) {
        return this.edges.find((e) => e.equals(edge));
    }

    contiansPoint(node) {
        return this.nodes.find((p) => p.equals(node));
    }

    getEdgesOfNode(node) {
        return this.edges.filter(edge => {
            return edge.includes(node);
        });
    }

    draw(context) {
        for (const edge of this.edges) {
            edge.draw(context);
        }

        for (const node of this.nodes) {
            node.draw(context);
        }
    }
}