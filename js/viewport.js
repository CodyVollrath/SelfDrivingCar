class Viewport{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.zoom = 1;
        this.center = new Node(canvas.width / 2, canvas.height / 2);
        this.offset = scale(this.center, -1);
        
        this.drag = {
            start: new Node(0,0),
            end: new Node(0,0),
            offset: new Node(0,0),
            active: false
        };
        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.addEventListener('mousewheel', evt => this.#handleMouseWheel(evt));
        this.canvas.addEventListener('mousedown', evt => this.#handleMouseDown(evt));
        this.canvas.addEventListener('mousemove', evt => this.#handleMouseMove(evt));
        this.canvas.addEventListener('mouseup', evt => this.#handleMouseUp(evt));
    }

    getMouse(event) {
        return new Node(
            (event.offsetX - this.center.x) * this.zoom - this.offset.x,
            (event.offsetY - this.center.y) * this.zoom - this.offset.y
        );
    }

    getOffset() {
        return add(this.offset, this.drag.offset);
    }

    reset() {
        this.ctx.restore();
        this.ctx.clearRect(0,0, myCanvas.width, myCanvas.height);
        this.ctx.save();
        this.ctx.translate(this.center.x, this.center.x);
        this.ctx.scale(1 / this.zoom, 1 / this.zoom);
        const offset = this.getOffset();
        this.ctx.translate(offset.x, offset.y);
    }

    #handleMouseWheel(event) {
        const dir = Math.sign(event.deltaY);
        const step = 0.1;
        this.zoom += dir * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));
    }

    #handleMouseDown(event) {
        if (event.button == 1) {
            this.drag.start = this.getMouse(event);
            this.drag.active = true;
        }
    }
    

    #handleMouseMove(event) {
        if (this.drag.active) {
            this.drag.end = this.getMouse(event);
            this.drag.offset = subtract(this.drag.end, this.drag.start);
        }
    }

    #handleMouseUp(event) {
        if (this.drag.active) {
            this.offset = add(this.offset, this.drag.offset);
            this.drag = {
                start: new Node(0,0),
                end: new Node(0,0),
                offset: new Node(0,0),
                active: false
            };
        }
    }
}