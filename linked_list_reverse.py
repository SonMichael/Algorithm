
class LinkedList:
    def __init__(self, value, next):
        self.val = value
        self.next = next

    def reverse(self, root):
        prev = None
        cur = root
        while cur != None:
            # We have some notes:
            # 1: cur = root ; next = cur
            # when we change next (next = None), cur and root don't change anything

            # 2: cur = root ; next = cur
            # when we change next (next.next = None), cur and root will change
            # when we change cur (cur.next = None), next and root will change
            # Because ".next" of variables have then same reference

            # 3: cur = root ; next = cur.next
            # when we change next (next = None), cur and root don't change anything

            # 4: cur = root ; next = cur.next
            # when we change next (next.next = None), cur and root will change
            # when we change cur (cur.next = None), root will change but "next" don't change
            # Because "next" has the difference reference

            next = cur.next
            cur.next = prev
            prev = cur
            cur = next
        return prev



listNode4 = LinkedList(5, None)
listNode3 = LinkedList(4, listNode4)
listNode2 = LinkedList(3, listNode3)
listNode1 = LinkedList(2, listNode2)
root = LinkedList(1, listNode1)
root = root.reverse(root)
while root != None:
    print(root.val)
    root = root.next

