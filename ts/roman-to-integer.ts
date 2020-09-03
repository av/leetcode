const multipliers: { [key: string]: number } = {
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const tokens = Object.keys(multipliers);

function romanToInt(s: string): number {
  function next(): string {
    for (const token of tokens) {
      if (s.startsWith(token)) {
        s = s.substr(token.length);
        return token;
      }
    }

    throw new Error(`Unknown token: ${s}`);
  }

  const chars: string[] = [];

  while (s.length > 0) {
    chars.push(next());
  }

  return chars.reduce((sum, char) => {
    return sum += multipliers[char];
  }, 0);
}

//////////////////////////////////////////////////////////////////////

[
  "III",
  "CCCXCIX",
  "IV",
  "IX",
  "LVIII",
  "MCMXCIV",
].forEach((roman) => {
  console.log(roman, romanToInt(roman));
});
