function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
  carry = 0
): ListNode | null {
  if (l1 || l2) {
    const next1 = getNextNode(l1);
    const next2 = getNextNode(l2);
    const sum = getNodeValue(l1) + getNodeValue(l2) + carry;
    const nextCarry = sum >= 10 ? 1 : 0;

    return new ListNode(
      sum % 10,
      addTwoNumbers(next1, next2, nextCarry)
    );
  } else if (carry) {
    return new ListNode(1);
  }

  return null;
}

function getNodeValue(node: ListNode | null): number {
  return node && node.val ? node.val : 0;
}

function getNextNode(node: ListNode | null): ListNode | null {
  return node && node.next ? node.next : null;
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
  return traverse(addTwoNumbers(construct(a), construct(b))!);
}

function addRaw(a: number, b: number): ListNode | null {
  return addTwoNumbers(construct(a), construct(b));
}

// console.log(traverse(construct(123)));
// console.log(add(20, 20));
// console.log(add(120, 20));
// console.log(add(20, 180));
console.log(addRaw(342, 465));
console.log(add(5, 5));
// console.log(construct(120));
// console.log(construct(20));
