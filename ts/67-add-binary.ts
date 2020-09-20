function addBinary(a: string, b: string): string {
  let result = "";
  let carry = 0;

  let length = Math.max(a.length, b.length);
  let i = 1;

  const its = [];
  while (i <= length) {
    let x = Number(a[a.length - i] || 0);
    let y = Number(b[b.length - i] || 0);
    let sum = x + y + carry;

    if (sum > 1) {
      carry = 1;
    } else {
      carry = 0;
    }

    result = (sum % 2) + result;

    its.push({
      i,
      x,
      y,
      carry,
      sum,
      result,
    })

    i++;
  }

  if (carry) {
    result = carry.toString(2) + result;
  }

  console.table(its);

  return result;
}

//////////////////////////////////////////////////////////////////////

[
  // ["1", "1"],
  // ["0", "1"],
  // ["1", "0"],
  // ["0", "0"],
  // ["11", "1"],
  // ["1010", "1011"],
  ["1111", "1111"],
].forEach(([a, b]) => {
  console.log(addBinary(a, b));
});
