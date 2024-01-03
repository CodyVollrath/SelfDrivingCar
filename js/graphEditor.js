class GraphEditor {
    constructor(viewport, graph) {
        this.viewport = viewport;
        this.canvas = viewport.canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext('2d');
        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = false;
        this.actions = [];
        // Private event listeners
        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.addEventListener('mousedown', evt => this.#handleMouseDown(evt));
        this.canvas.addEventListener('mousemove', evt => this.#handleMouseMove(evt));
        this.canvas.addEventListener('mouseup', evt => this.#handleMouseUp(evt));
        document.addEventListener('keydown', evt => this.#handleUndo(evt));
        this.canvas.addEventListener('contextmenu', evt => {
            evt.preventDefault();
        });
    }

    #handleMouseDown(event) {
        if (event.button == 2) { // Right Click
            if (this.selected) {
                this.selected = null;
            } else if (this.hovered) {
                let edges = this.graph.getEdgesOfNode(this.hovered);
                this.#addUndoEvent(new UndoAction(this.hovered, edges,'removed'));
                this.#removePoint(this.hovered);
            }
        } 

        if (event.button == 0) { // left click
            this.mouse = this.viewport.getMouse(event);
            
            if (this.hovered) {
                let ifEdgeAded = false;
                if (this.selected) {
                    let edge = new Edge(this.selected, this.hovered);
                    ifEdgeAded = this.graph.tryAddSegment(edge);
                    if (ifEdgeAded) this.#addUndoEvent(new UndoAction(this.mouse, [edge], 'add_seg'));
                }
                this.selected = this.hovered;
                this.dragging = true;
                if (!ifEdgeAded) this.#addUndoEvent(new UndoAction(this.selected, null, 'selected'))
                return;
            }
            this.graph.addPoint(this.mouse);
            this.#addUndoEvent(new UndoAction(this.mouse, null, 'add'))
            
            if (this.selected) {
                let edge = new Edge(this.selected, this.mouse);
                let bool = this.graph.tryAddSegment(edge);
            }
            this.selected = this.mouse;
            this.hovered = this.mouse;
        }
        
    }

    #handleMouseMove(event) {
        this.mouse = this.viewport.getMouse(event);
        this.hovered = getNearestPoint(this.mouse, this.graph.nodes, 1.5 * this.viewport.zoom);
        if (this.dragging == true) {
            this.selected.move(this.mouse.x, this.mouse.y);
        }
    }

    #addUndoEvent(undoEvent) {
        if (this.actions.length > 100) {
            this.actions.splice(0, 1);
        }
        this.actions.push(undoEvent);
    }

    #handleMouseUp(event) {
        this.dragging = false;
    }

    #handleUndo(event) {
        if (event.ctrlKey) {
            if (event.key == 'z') {
                let lastAction = this.actions.pop();
                if (lastAction && lastAction.type == 'removed') {
                    let point = lastAction.node;
                    let edges = lastAction.edges;
                    this.graph.tryAddPoint(point);
                    edges.forEach(edge => this.graph.tryAddSegment(edge));
                } else if (lastAction && lastAction.type == 'add') {
                    let point = lastAction.node;
                    if (this.selected && !this.hovered) this.selected = null;
                    this.graph.removePoint(point);
                } else if (lastAction && lastAction.type == 'selected') {
                    let point = lastAction.node;
                    point.move(lastAction.lastX, lastAction.lastY);
                    this.selected = null;
                } else if (lastAction && lastAction.type == 'add_seg') {
                    let edge = lastAction.edges[0];
                    this.graph.removeSegment(edge);
                    this.selected = null;
                }
            }
        }
    }

    #removePoint(node) {
        this.graph.removePoint(node);
        this.hovered = null;
        if (this.selected && this.selected.equals(node)) {
            this.selected = null;
        }
        this.dragging = false;
    }

    display() {
        this.graph.draw(this.ctx);
        if (this.hovered) {
            this.hovered.draw(this.ctx, {fill: true});
        }
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse;
            new Edge(this.selected, intent).draw(ctx, {dash: [3, 3]});
            this.selected.draw(this.ctx, {outline: true});
        }
    }
}