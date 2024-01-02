class Node {
    constructor(x, y, size = 18) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(ctx, {color='black', outline = false, fill = false } = {}) {
        const rad = this.size / 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        ctx.fill();
        if (outline) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'orange';
            ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }

        if (fill) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
    }

    move(x, y, color='black') {
        this.x = x;
        this.y = y;
    }

    equals(other) {
        return this.x == other.x && this.y == other.y;
    }
}