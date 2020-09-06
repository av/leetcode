function removeDuplicates(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i + 1] === nums[i]) {
      nums.splice(i, 1);
      i--;
    }
  }

  return nums.length;
}

//////////////////////////////////////////////////////////////////////

[
  [1,1,2],
  [0,0,1,1,1,2,2,3,3,4],
  // [1, 1, 1, 2, 2, 2]
]
  .forEach(arr => {
    console.log(removeDuplicates(arr), arr);
  })