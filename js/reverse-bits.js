function reverseBits(n) {
  n = n.toString(2);
  n = n.length < 32 ? '0'.repeat(32 - n.length) + n : n;

  return parseInt(n.split('').reverse().join(''), 2);
}

console.log(reverseBits(43261596));