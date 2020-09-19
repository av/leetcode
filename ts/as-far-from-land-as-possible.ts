function maxDistance(grid: number[][]): number {
  const size = grid[0].length;
  const output: number[] = [];
  const set = (row: number, col: number, val: number) => {
    output[size * row + col] = val;
  };
  const get = (row: number, col: number) => {
    return output[size * row + col] || 0;
  };

  for (const [rowIndex, row] of grid.entries()) {
    for (const [colIndex, isLand] of row.entries()) {
      if (isLand) {
        set(rowIndex, colIndex, 0);
      } else {
        const min = Math.min(
          get(rowIndex - 1, colIndex),
          get(rowIndex, colIndex + 1),
          get(rowIndex + 1, colIndex),
          get(rowIndex, colIndex - 1)
        );

        set(rowIndex, colIndex, min + 1);
      }
    }
  }

  return Math.max(...output);
}

//////////////////////////////////////////////////////////////////////

[
  [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
].forEach((grid) => {
  console.log(maxDistance(grid));
});
