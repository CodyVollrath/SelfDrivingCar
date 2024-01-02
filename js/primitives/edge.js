class Edge {
    constructor(p1, p2, cost = 1) {
        this.p1 = p1;
        this.p2 = p2;
    }

    draw(ctx, width = 2, color='black') {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
    }

    equals(other) {
        return this.includes(other.p1) && this.includes(other.p2);
    }

    includes(node){
        return this.p1.equals(node) || this.p2.equals(node);
    }
}