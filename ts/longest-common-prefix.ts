function longestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) {
    return "";
  }

  if (strings.length === 1) {
    return strings[0];
  }

  let possiblePrefix = "";
  
  while (strings.every((str) => str.startsWith(possiblePrefix))) {
    const newPossiblePrefix = strings[0].substr(0, possiblePrefix.length + 1);

    if (newPossiblePrefix.length > possiblePrefix.length) {
      possiblePrefix = newPossiblePrefix;
    } else if (newPossiblePrefix.length === possiblePrefix.length) {
      return possiblePrefix;
    } else {
      break;
    }
  }

  return possiblePrefix.slice(0, -1);
}

//////////////////////////////////////////////////////////////////////

[
  ["flower", "flow", "flight"],
  ["dog", "racecar", "car"],
  ["a", "b"],
  ["", ""],
  ["c", "c"],
  ["aa", "a"]
].forEach((strings) => {
  console.log(strings, longestCommonPrefix(strings));
});
