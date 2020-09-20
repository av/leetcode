/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode(headA, headB) {
  const intersections = new Map();

  while (headA || headB) {
    if (headA) {
      if (!intersections.has(headA)) {
        intersections.set(headA, true);
      } else {
        return headA;
      }
    }

    if (headB) {
      if (!intersections.has(headB)) {
        intersections.set(headB, true);
      } else {
        return headB;
      }
    }

    headA = headA?.next;
    headB = headB?.next;
  }

  return null;
}

////////////////////////////////////////////////////////////////////
