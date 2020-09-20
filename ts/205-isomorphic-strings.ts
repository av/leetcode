function isIsomorphic(s: string, t: string): boolean {
  return getInvariant(s) === getInvariant(t);
}

function getInvariant(s: string): string {
  const symbols: string[] = [];
  let invariant = "";

  for (const char of s) {
    let maybeIndex = symbols.indexOf(char);

    if (maybeIndex === -1) {
      symbols.push(char);
      maybeIndex = symbols.length - 1;
    }

    invariant += maybeIndex.toString();
  }

  return invariant;
}

//////////////////////////////////////////////////////////////////////

[
  ["ab", "aa"]
]
  .forEach(([a, b]) => {
    console.log(`"${a}":"${getInvariant(a)}", "${b}":"${getInvariant(b)}": ${isIsomorphic(a, b)}`);
  });

// console.log(getInvariant("aabb"));
// console.log(getInvariant("ababc"));
// console.log(getInvariant("abcdef"));