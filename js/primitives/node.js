class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, size = 18, color='black') {
        const rad = size / 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        ctx.fill();
    }

    move(x, y, color='black') {
        this.x = x;
        this.y = y;
    }

    equals(other) {
        return this.x == other.x && this.y == other.y;
    }
}