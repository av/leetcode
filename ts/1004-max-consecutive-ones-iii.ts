function longestOnes(A: number[], K: number): number {
  let i = 0;
  let j = 0;

  let its = [];
  for (; j < A.length; j++) {
    if (A[j] == 0) {
      K--;
    }

    if (K < 0) {
      if (A[i] == 0) {
        K++;
      }

      i++;
    }
  }

  return j - i;
}

//////////////////////////////////////////////////////////////////////

// [
//   [1, 1, 1, 0, 0, 1, 1],
//   [1, 0, 1, 1, 0, 1, 1],
// ].forEach((nums) => console.log(group(nums)));

type Case = [number[], number];
const cases: Case[] = [
  // [[1, 1, 1, 0, 0, 1, 1], 1],
  // [[1, 0, 1, 1, 0, 1, 1], 1],
  // [[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2],
  [[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2],
];
cases.forEach(([nums, K]) => {
  console.log(longestOnes(nums, K));
});

// console.log(combinations([1, 2, 3, 4], 2));
