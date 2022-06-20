# Given the head of a sorted linked list, delete all duplicates such that each element :
# appears only once. Return the linked list sorted as well.
# input: head = [1,1,2]
# output = [1,2]
class ListNode:
    def __init__(self, val, next):
        self.val = val
        self.next = next
listNode4 = ListNode(4, None)
listNode3 = ListNode(2, listNode4)
listNode2 = ListNode(2, listNode3)
listNode1 = ListNode(2, listNode2)
root = ListNode(1, listNode1)
# 1 -> 2 -> 2 -> 2 -> 4
def removeDup(root):
    if root.val == None:
        return None
    cur = root
    while cur != None:
        while cur.next != None and cur.val == cur.next.val:
            cur.next = cur.next.next
        cur = cur.next
    return root
root1 = removeDup(root)
while root1 != None:
    print(root1.val)
    root1 = root1.next
