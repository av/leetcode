import { ListNode } from "./utils";

//////////////////////////////////////////////////////////////////////

function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;

  let prev = head;
  let curr = head.next;

  while (curr) {
    while (curr && curr.val === prev.val) {
      curr = curr.next as ListNode;
    }

    prev.next = curr;
    prev = curr;

    if (curr) {
      curr = curr.next as ListNode;
    }
  }

  return head;
}

//////////////////////////////////////////////////////////////////////

[
  // [1, 1, 2, 3, 3, 3, 4],
  [1, 1, 1, 1],
].forEach((arr) => {
  const list = ListNode.fromArray(arr);

  console.log(arr, ListNode.flatten(deleteDuplicates(list)));
});
