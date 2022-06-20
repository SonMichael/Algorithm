
class LinkedList:
    def __init__(self, value, next):
        self.val = value
        self.next = next

    def reverse(self, root):
        prev = None
        current = root
        while (current is not None):
            next = current.next
            current.next = prev
            prev = current
            current = next
            root = prev
        return root



listNode4 = LinkedList(5, None)
listNode3 = LinkedList(4, listNode4)
listNode2 = LinkedList(3, listNode3)
listNode1 = LinkedList(2, listNode2)
root = LinkedList(1, listNode1)
root = root.reverse(root)
while root != None:
    print(root.val)
    root = root.next

