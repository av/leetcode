const cache: number[] = [];
function climbStairs(n: number): number {
  if (n <= 2) return n;
  if (!cache[n]) {
    cache[n] = climbStairs(n - 2) + climbStairs(n - 1);
  }
  return cache[n];
}

//////////////////////////////////////////////////////////////////////

[1, 2, 3, 4, 5].forEach((n) => {
  console.log(`n: ${n}`, climbStairs(n));
});
