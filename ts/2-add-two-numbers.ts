import { ListNode } from "./utils";

//////////////////////////////////////////////////////////////////////

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

    return new ListNode(sum % 10, addTwoNumbers(next1, next2, nextCarry));
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

function add(a: number, b: number): number {
  return ListNode.traverseNumber(
    addTwoNumbers(ListNode.fromNumber(a), ListNode.fromNumber(b))!
  );
}

function addRaw(a: number, b: number): ListNode | null {
  return addTwoNumbers(ListNode.fromNumber(a), ListNode.fromNumber(b));
}

// console.log(traverse(construct(123)));
// console.log(add(20, 20));
// console.log(add(120, 20));
// console.log(add(20, 180));
console.log(addRaw(342, 465));
console.log(add(5, 5));
// console.log(construct(120));
// console.log(construct(20));
