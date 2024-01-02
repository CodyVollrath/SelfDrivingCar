function getNearestPoint(mousePos, nodes) {
    for (var node of nodes) {
        const r = (node.size * 1.5) / 2;
        const a = Math.abs(node.x - mousePos.x);
        const b = Math.abs(node.y - mousePos.y);
        const v = a * a + b * b;
        const w = r * r;
        if (v <= w) {
            return node;
        }
    }
    return null;

}