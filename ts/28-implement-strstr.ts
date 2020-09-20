function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  return haystack.indexOf(needle);
}