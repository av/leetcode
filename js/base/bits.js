module.exports = {
  s2b,
  b2s,
  bitsCount,
  countOnes
};


function s2b(s) {
  return parseInt(s, 2);
}

function b2s(n) {
  return n.toString(2);
}

function bitsCount(n) {
  return Math.min(53, Math.max(1, Math.floor(Math.log2(Math.abs(n)) + 1)));
}

function countOnes(n) {
  let i = bitsCount(n);
  let mask = 0b1;
  let ones = 0;

  while (i > 0) {
    if (n & mask) {
      ones++;
    }

    mask = mask << 1;
    i--;
  }

  return ones;
}