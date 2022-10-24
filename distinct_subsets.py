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
    # 2 ^ n mean: we get all cases:
    # For ex:
    # [1] => n = 1 => 2 ^ n = 2 => [[], [1]]
    # [1, 2] => n = 2 => 2 ^ n = 4 => [[], [1], [2], [1,2]]
    # bits is present for number so
    # if number can't duplicate we will have bits can't duplicate and we only choose with bit = 1 because
    # we only have value at bit = 1 position and
    # if we choose with bit = 0 we will have duplicate subsets
    numSubsets = 2 ** n
    result = []
    for i in range(0 , numSubsets):
        items = []
        for j in range(0 , n):
            # we only care the last bit
            # For ex:
            # 4 = 0000 0100 & 14 = 0000 1110  = 0000 0100
            # Because 2 ^ n is total case and we only select with bit = 1 
            # so we only need shift n steps, we can cover all case
            # if we shift more than n we only receive with result = 0
            # if we shift less than n we can't select all cases
            if (i >> j) & 1:
                print(i, j)
                items.append(nums[j])
        result.append(items)
    return result
print(subsets([1, 2, 3] ))