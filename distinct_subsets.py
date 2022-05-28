# Given a set of distinct integers, nums, return all possible subsets
# Note: The solution set must not contain duplicate subsets.
# Nums: [1, 2, 3] 
# Output: [
#     [1],
#     [2],
#     [3],
#     [1,2],
#     [1,3],
#     [2,3],
#     [1,2,3],
#     [],
# ]

def subsets(nums):
    n = len(nums)
    numSubsets = 2 ** n
    result = []
    for i in range(0 , numSubsets):
        items = []
        for j in range(0 , n):
            if (i >> j) & 1:
                items.append(nums[j])
        result.append(items)
    return result
print(subsets([1, 2, 3] ))