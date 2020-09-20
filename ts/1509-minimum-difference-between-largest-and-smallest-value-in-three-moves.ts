function minDifference(nums: number[]): number {
  if (nums.length <= 4) return 0;

  nums.sort((a, b) => a - b);

  let opts = [
    nums[nums.length - 4] - nums[0],
    nums[nums.length - 3] - nums[1],
    nums[nums.length - 2] - nums[2],
    nums[nums.length - 1] - nums[3],
  ];

  return Math.min(...opts);
}

//////////////////////////////////////////////////////////////////////

[
  [1, 2, 3],
  [1, 5, 0, 10, 14],
  [1, 5, 6, 14, 15],
].forEach((arr) => {
  console.log(minDifference(arr));
});
