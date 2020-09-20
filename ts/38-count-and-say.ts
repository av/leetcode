type Group = [number, string];
const results: { [key: string]: string } = {
  "1": "1",
};

function countAndSay(n: number): string {
  if (n > 30) {
    throw new Error(`Max n exceeded`);
  }

  if (!results[n]) {
    results[n] = sayGroup(getGroups(countAndSay(n - 1)));
  }
  
  return results[n];
}

function sayGroup(groups: Group[]): string {
  return groups
    .map(([count, symbol]) => {
      return `${count}${symbol}`;
    })
    .join("");
}

function getGroups(str: string) {
  const groups: [number, string][] = [];
  let lastGroup: [number, string];

  str.split("").reduce((prev, curr, i) => {
    if (prev !== curr) {
      lastGroup = [0, curr];
      groups.push(lastGroup);
    }

    lastGroup[0]++;

    return curr;
  }, "");

  return groups;
}

//////////////////////////////////////////////////////////////////////

// console.log(getGroups("11122233111"));
console.log(countAndSay(1));
console.log(countAndSay(2));
console.log(countAndSay(3));
console.log(countAndSay(4));
console.log(countAndSay(5));
