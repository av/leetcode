import { ListNode } from "./utils";

//////////////////////////////////////////////////////////////////////

function insertionSortList(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;

  let output = head;
  let curr = head.next;

  // Unlink
  head.next = null;

  while (curr) {
    const next = curr.next;
    const insertion = curr;

    output = insert(output, insertion);
    curr = next as ListNode;
  }

  return output;
}

function insert(head: ListNode, other: ListNode) {
  let curr = head;
  const val = other.val;

  if (val <= head.val) {
    other.next = head;
    return other;
  }

  while (curr) {
    if ((val > curr.val && curr.next && val <= curr.next.val) || !curr.next) {
      other.next = curr.next;
      curr.next = other;

      return head;
    }

    curr = curr.next as ListNode;
  }

  return head;
}

//////////////////////////////////////////////////////////////////////

// [[4], [1, 3], [-1, 0], [-10, 0, 10], [-10, -5, 0, 3]].forEach((arr) => {
//   const list = ListNode.fromArray(arr);

//   console.log(
//     `arr: ${arr}`,
//     ListNode.flatten(insert(list as ListNode, new ListNode(2)))
//   );
// });

[
  [4, 2, 1, 3],
  [-1, 5, -3, 4, 0],
  [-1, -52, -1, 2, -50, -1, -2],
  [1, 1, 1]
].forEach((arr) => {
  const list = ListNode.fromArray(arr);

  console.log(ListNode.flatten(insertionSortList(list)));
});