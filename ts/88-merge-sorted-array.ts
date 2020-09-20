function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  n > 0 && nums1.splice(-n);

  nums2.forEach((num) => {
    let maybeIndex;

    if (nums1[0] > num) {
      maybeIndex = 0;
    } else if (nums1[nums1.length - 1] < num) {
      maybeIndex = nums1.length;
    } else {
      maybeIndex = nums1.findIndex((n) => n > num);
    }

    nums1.splice(maybeIndex, 0, num);
  });
}

//////////////////////////////////////////////////////////////////////

const args: [[number[], number, number[], number]] = [
  // [[1, 2, 3, 0, 0, 0], 6, [2, 5, 6], 3],
  // [[0, 0, 3, 0, 0, 0, 0, 0, 0], 3, [-1, 1, 1, 1, 2, 3], 6],
  [[-1, 0, 1, 1, 0, 0, 0, 0, 0], 4, [-1, 0, 2, 2, 3], 5],
];

args.forEach((args) => {
  merge(...args);
  console.log(args[0]);
});
