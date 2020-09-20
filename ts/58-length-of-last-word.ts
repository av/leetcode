function lengthOfLastWord(s: string): number {
  const words = s.split(" ").filter((v) => v);
  const maybeLast = words[words.length - 1];

  return maybeLast ? maybeLast.length : 0;
}
