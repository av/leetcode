function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
  carry?: boolean
): ListNode {
  if (l1 || l2) {
    const val1 = l1?.val ?? 0;
    const val2 = l2?.val ?? 0;
    const next1 = l1?.next ?? null;
    const next2 = l2?.next ?? null;
    const sum = val1 + val2 + (carry ? 1 : 0);

    console.log("ADD:", l1, l2, carry, sum);

    return new ListNode(
      sum % 10,
      next1 || next2 ? addTwoNumbers(next1, next2, sum >= 10) : sum >= 10 ? new ListNode(1) : null
    );
  } else if (carry) {
    return new ListNode(1);
  }

  return new ListNode(0);
}

//////////////////////////////////////////////////////////////////////////////////////////

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function construct(num: number): ListNode {
  const nums = num
    .toString()
    .split("")
    .map((n) => parseInt(n));
  let node: ListNode | null = null;

  nums.forEach((num) => {
    if (node) {
      node = new ListNode(num, node);
    } else {
      node = new ListNode(num);
    }
  });

  return node!;
}

function traverse(node: ListNode) {
  const num: number[] = [];
  let currentNode: ListNode | null = node;

  do {
    num.push(currentNode.val);
    currentNode = currentNode.next;
  } while (currentNode);

  return parseInt(num.reverse().join(""));
}

function add(a: number, b: number): number {
  return traverse(addTwoNumbers(construct(a), construct(b)));
}

function addRaw(a: number, b: number): ListNode {
  return addTwoNumbers(construct(a), construct(b));
}

console.log(traverse(construct(123)));
console.log(add(20, 20));
console.log(add(120, 20));
console.log(add(20, 180));
console.log(addRaw(342, 465));
console.log(add(5, 5));
console.log(construct(120));
console.log(construct(20));
