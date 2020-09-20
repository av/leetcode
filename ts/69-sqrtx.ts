function mySqrt(x: number): number {
  const err = .00001;
  let s = x / 2;

  while((s - x / s) > err)  {
    s = (s + x / s) / 2;
  }

  return Math.floor(s);
}

//////////////////////////////////////////////////////////////////////

console.log(mySqrt(2147395599)); 