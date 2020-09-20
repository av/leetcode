type Point = [number, number];

function maxDistance(grid: number[][]): number {
  let max = -1;
  const lands: Point[] = [];
  const size = grid[0].length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col]) {
        lands.push([row, col]);
      }
    }
  }

  if (lands.length === 0) return max;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === 0) {
        const nearest = nearestLand(lands, [row, col]);

        if (nearest > max) {
          max = nearest;
        }
      }
    }
  }

  return max;
}

function nearestLand(lands: Point[], point: Point) {
  let nearest = Number.MAX_VALUE;

  for (const land of lands) {
    const dist = distance(land, point);

    if (dist < nearest) {
      nearest = dist;
    }
  }

  return nearest;
}

function distance(a: Point, b: Point) {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
}

//////////////////////////////////////////////////////////////////////

[
  [
    [1, 0, 1],
    [0, 0, 1],
    [0, 0, 0],
  ],
].forEach((grid) => {
  console.log(maxDistance(grid));
});
