class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

tree3 = TreeNode(3, None, None)
tree4 = TreeNode(4, None, None)
tree2 = TreeNode(2, tree4, None)
tree = TreeNode(1, tree2, tree3)


def construct_string_from_binary_tree(root):
    arr = []
    def pre_order(root):
        if not root:
            return
        arr.append('(')
        arr.append(str(root.val))
        pre_order(root.left)
        pre_order(root.right)
        arr.append(')')
    pre_order(root)
    return "".join(arr)

print(construct_string_from_binary_tree(tree))