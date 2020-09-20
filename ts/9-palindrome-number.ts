function isPalindrome(x: number): boolean {
  if (x < 0) return false;

  let multipliers = [1];
  let range = 1;

  while((x % range) < x) {
    multipliers.push(range *= 10);
  }

  multipliers.pop();

  for (let i = 0; i < multipliers.length; i++) {
    const currentMultiplier = multipliers[i];
    const reverseMultiplier = multipliers[multipliers.length - (i + 1)];

    if (getDigit(x, currentMultiplier) !== getDigit(x, reverseMultiplier)) {
      return false;
    }
  }

  return true;
}

function getDigit(n: number, p: number) {
  return Math.floor(n / p % 10);
}

//////////////////////////////////////////////////////////////////////

[
  121, 
  -121, 
  10,
  4554,
  124,
  506605
].forEach((number) => {
  // isPalindrome(number);
  console.log(number, isPalindrome(number));
});
