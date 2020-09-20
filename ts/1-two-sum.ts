function twoSum(nums: number[], target: number): number[] {
  let indices: { [key: string]: number } = {};
  let response: number[] = [];

  for (let [index, num] of nums.entries()) {
    const difference = target - num;

    if (indices[difference] !== undefined) {
      response = [index, indices[difference]!];
    } else {
      indices[num] = index;
    }
  }

  return response;
}

//////////////////////////////////////////////////////////////////////////////////////////

console.log(twoSum([3, 3], 6));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([2, 7, 11, 15], 9));
