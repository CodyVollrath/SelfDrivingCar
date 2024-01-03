function getNearestPoint(mousePos, nodes, threshold = 1.5) {
    for (var node of nodes) {
        const r = (node.size * threshold) / 2;
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

/**
 * Adds two nodes as a compositional vector
 * @param {Node} p1 Node v_1
 * @param {Node} p2 Node v_2
 * @returns the Node vector resultant
 */
function add(p1, p2) {
    return new Node(p1.x + p2.x, p1.y + p2.y);
}

/**
 * Subtracts two nodes as a compositional vector
 * @param {NOde} p1 Node v_1
 * @param {Node} p2 Node v_2
 * @returns the node vector differnce
 */
function subtract(p1, p2) {
    return new Node(p1.x - p2.x, p1.y - p2.y);
}

/**
 * Scales the node as a compositional vector
 * @param {Node} point Node v
 * @param {Number} scalar Number n
 * @returns The scaled vector
 */
function scale(point, scalar) {
    return new Node(point.x * scalar, point.y * scalar);
}

/**
 * The absolute value of the Node vector compoinents
 * @param {*} point Node v
 * @returns v(|x|, |y|)
 */
function abs(point) {
    return new Node(Math.abs(point.x), Math.abs(point.y));
}

/**
 * Determines origin component signs
 * @note origin is (0,0)
 * @param {*} point 
 * @returns 0 if both are less than origin, 1 if neither are less than origin, 2 if x is less than origin, and 3 if y is less than origin
 */
function pointComponmentSignCategory(point) {
    if (point.x < 0 && point.y < 0) {
        return 0;
    } 

    if (point.x < 0) {
        return 2;
    }

    if (point.y < 0) {
        return 3;
    }

    return 1;
}
