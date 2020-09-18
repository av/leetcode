function hammingWeight(n) {
  return n.toString(2).split('').filter(n => n === '1').length;
}