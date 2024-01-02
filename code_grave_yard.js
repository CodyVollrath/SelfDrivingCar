        
        // Event Listeners
        myCanvas.addEventListener('mousedown', handleMouseDown);
        myCanvas.addEventListener('mousemove', handleMouseMove);
        myCanvas.addEventListener('mouseup', handleMouseUp);

        // Functions

        function removeRandomSegment() {
            if (graph.edges.length) {
                const index = Math.floor(Math.random() * graph.edges.length);
                graph.removeSegment(graph.edges[index]);
                redraw();
            } else {
                console.log("No Segment");
            }
        }

        function removeRandomPoint() {
            if (graph.nodes.length) {
                const index = Math.floor(Math.random() * graph.nodes.length);
                graph.removePoint(graph.nodes[index]);
                redraw();
            } else {
                console.log("No Points");
            }
        }

        function addRandomPoint() {
            const isAdded = graph.tryAddPoint(
                new Node(
                    Math.random() * myCanvas.width,
                    Math.random() * myCanvas.height
                )
            );

            if (isAdded){
                redraw();
            }

        }

        function removeAll() {
            graph.dispose();
            redraw();
        }

        function addRandomSegment() {
            const idx1 = Math.floor(Math.random() * graph.nodes.length);
            const idx2 = Math.floor(Math.random() * graph.nodes.length);
            const didAdd = graph.tryAddSegment(new Edge(
                graph.nodes[idx1],
                graph.nodes[idx2]
            ));

            if (didAdd) {
                redraw();
            }

        }

        

        function handleMouseDown(event) {
            const mousePos = getMousePos(event);
            
            graph.nodes.forEach(function(element) {
                if (detectMouseElementCollision(mousePos, element, nodeSize)) {
                    draggedNode = element;
                }
            });
        }

        function handleMouseMove(event) {
            const mousePos = getMousePos(event);
            if (draggedNode) {
                draggedNode.move(mousePos.x, mousePos.y);
                redraw();
            }
        }

        function handleMouseUp() {
            draggedNode = null;
        }

        function getMousePos(event) {
            const rect = myCanvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        function redraw() {
            clearCanvas();
            graph.draw(ctx);
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        }

        // Uses distance formula between two points
        // where point a is (element.x, element.y) and point b is (mousePos.x, mousePos.y)
        function detectMouseElementCollision(mousePos, element, size) {
            const r = size / 2;
            const a = Math.abs(element.x - mousePos.x);
            const b = Math.abs(element.y - mousePos.y);
            const v = a * a + b * b;
            const w = r * r;
            return v <= w;
        }

        // Initial Draw
        graph.draw(ctx);