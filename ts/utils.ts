export class ListNode {
  static fromArray(nums: number[]): ListNode | null {
    let tail = null;
    let head = null;
    nums = [...nums];

    while (nums.length) {
      const next = new ListNode(nums.shift());

      if (tail) {
        tail.next = next;
      }

      tail = next;

      if (!head) {
        head = tail;
      }
    }

    return head;
  }

  static fromNumber(num: number): ListNode {
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

  static traverseNumber(node: ListNode): number {
    const num: number[] = [];
    let currentNode: ListNode | null = node;

    do {
      num.push(currentNode.val);
      currentNode = currentNode.next;
    } while (currentNode);

    return parseInt(num.reverse().join(""));
  }

  static flatten(head: ListNode | null) {
    if (!head) return null;

    const out = [];

    do {
      out.push(head.val);
      head = head.next;
    } while (head)

    return out;
  }

  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
