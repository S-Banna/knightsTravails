class boardGraph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjList = new Map();
    this.fillAdjList();
  }

  fillAdjList() {
    let X = [2, 1, -1, -2, -2, -1, 1, 2];
    let Y = [1, 2, 2, 1, -1, -2, -2, -1];
    this.vertices.forEach((square) => {
      let [i, j] = square;
      let nodes = [];

      for (let k = 0; k < 8; k++) {
        let x = square[0] + X[k];
        let y = square[1] + Y[k];
        if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
          nodes.push([x, y]);
        }
      }
      this.adjList.set(square, nodes);
    });
  }

  arraysEqual(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] == arr2[1];
  }

  search(start, end) {
    if (this.arraysEqual(start, end)) {
      return "Same Square";
    }

    let queue = [];
    let visited = new Array(this.adjList.length).fill(false);
    let returner = new Map()

    visited[vertices[vertices.findIndex(v => this.arraysEqual(v, start))]] = true;
    queue.push(start);

    while (queue.length != 0) {
      let current = queue.shift();
      let neighbors = this.adjList.get(vertices[vertices.findIndex(v => this.arraysEqual(v, current))])

      for (let neighbor of neighbors) {
        if (this.arraysEqual(neighbor, end)) {
            returner.set(neighbor, current)
            return this.reconstruct(returner, neighbor, start)
        }
        if (!visited[vertices[vertices.findIndex(v => this.arraysEqual(v, neighbor))]]) {
            visited[vertices[vertices.findIndex(v => this.arraysEqual(v, neighbor))]] = true
            queue.push(neighbor)
            returner.set(neighbor, current)
        }
      }
    }
    return "error"
  }

  reconstruct(map, current, end) {
    let path = [];
    while (current) {
        path.push(current) 
        current = map.get(current)
    }
    return path.reverse()
  }
}

let vertices = [];
for (let j = 0; j <= 7; j++) {
  for (let i = 0; i <= 7; i++) {
    vertices.push([i, j]);
  }
}

let board = new boardGraph(vertices);
console.log(board.search([3, 4], [6, 7]))
