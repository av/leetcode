module.exports = {
  s2b: (s) => parseInt(s, 2),
  b2s: (n) => n.toString(2),
  bitsCount: (n) => {
    return Math.min(53, Math.max(1, Math.floor(Math.log2(Math.abs(n)) + 1)));
  },
};
