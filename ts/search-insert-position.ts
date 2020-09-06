function searchInsert(nums: number[], target: number): number {
  let min = 0;
  let max = nums.length - 1;

  while (true) {
    const middle = Math.floor((min + max) / 2);
    const num = nums[middle];

    if (max - min <= 1) {
      if (target <= nums[min]) {
        return min;
      } else if (target <= nums[max]) {
        return max;
      } else {
        return max + 1;
      }
    }

    if (num > target) {
      max = middle;
    } else if (num < target) {
      min = middle;
    } else {
      return middle;
    }
  }
}

//////////////////////////////////////////////////////////////////////

type example = [number[], number];
const examples: example[] = [
  // [[1, 3, 5, 6], 0],
  // [[1, 3, 5, 6], 1],
  // [[1, 3, 5, 6], 2],
  // [[1, 3, 5, 6], 3],
  // [[1, 3, 5, 6], 4],
  // [[1, 3, 5, 6], 5],
  // [[1, 3, 5, 6], 6],
  // [[1, 3, 5, 6], 7],
  // [[1, 3, 5, 6], 2],
  // [[1, 3, 5, 6], 7],
  // [[1, 3, 5, 6], 0],
  [[1], 2],
];

examples.forEach(([arr, target]) => {
  console.log(arr, target, searchInsert(arr, target));
});
