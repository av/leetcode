function plusOne(digits: number[]): number[] {
  digits = digits.reverse();

  let carry = 1;
  let digit = 0;

  while (carry) {
    digits[digit] = digits[digit] || 0;
    digits[digit] += carry;
    if (digits[digit] >= 10) {
      carry = 1;
      digits[digit] = digits[digit] % 10;
      digit++;
    } else {
      carry = 0;
    }
  }

  if (carry) {
    digits.push(1);
  }

  return digits.reverse();
}
