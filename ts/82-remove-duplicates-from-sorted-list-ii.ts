import { ListNode } from "./utils";

//////////////////////////////////////////////////////////////////////

function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  if (!head.next) {
    return head;
  }

  // begginning of a returned linked list
  let fakeHead = new ListNode(undefined, head);

  // start of the group with same values
  let prev = fakeHead;

  // pointer
  let current = head;

  // While we've got a node remaining
  // in the list
  while (current) {
    // move through the current group until new value is seen
    while (current.next && prev.next && prev.next.val === current.next.val) {
      current = current.next;
    }


    if (prev.next === current) {
      // If group has only one member,
      // move prev to current
      prev = prev.next;
    } else {
      // Otherwise, exclude the group
      prev.next = current.next;
    }

    // Move to the next node
    current = current.next as ListNode;
  }

  return fakeHead.next;
}

//////////////////////////////////////////////////////////////////////

[
  // [1, 2, 3, 3, 4, 4, 5],
  // [1, 1, 1],
  // [1, 1, 2],
  [1],
].forEach((val) => {
  const list = ListNode.fromArray(val);

  console.log(ListNode.flatten(deleteDuplicates(list)));
});
