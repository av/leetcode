function findMedianSortedArrays_(
  nums1: number[],
  nums2: number[]
): number | undefined {
  const medianLocation = (nums1.length + nums2.length - 1) / 2;
  const result = [];

  for (let i = 0, max = Math.max(nums1.length, nums2.length); i < max; i++) {
    result.push(nums1[i] > nums2[i] ? nums2[i] : nums1[i]);

    if (result.length > medianLocation) {
      return (
        (result[Math.floor(medianLocation)] +
          result[Math.ceil(medianLocation) + 1]) /
        2
      );
    }
  }
}

function findMedianSortedArrays(
  nums1: number[],
  nums2: number[]
): number | undefined {
  const result = nums1.concat(nums2).sort((a, b) => a - b);
  const medianLocation = (result.length - 1) / 2;

  return (
    (result[Math.floor(medianLocation)] + result[Math.ceil(medianLocation)]) / 2
  );
}

/////////////////////////////////////////////////////////////////

[
  [[1, 3], [2]],
  [
    [1, 2],
    [3, 4],
  ],
  [
    [0, 0],
    [0, 0],
  ],
  [[], [1]],
].forEach(([a, b]) => {
  console.log(a, b, findMedianSortedArrays(a, b));
});
