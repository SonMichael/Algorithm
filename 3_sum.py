# - Given an array nums of n integers, are there elements a, b, c in nums
# such that a + b + c = 0 ? Find all unique triplets in the array which
# - gives the sum of zero
# Note:
# The solution set must not contain duplicate triplets.
# Given array nums = [-1, 0, 1, 2, -1, -4]
# A solution set is:
# [
# [-1, 0, 1],
# [-1, -1, 2]
# ]


def threeSum(nums):
    if len(nums) == 0:
        return 0
    nums.sort()
    result = []
    i = 0
    while i < len(nums):
        target = 0 - nums[i]
        l = i + 1
        r = len(nums) - 1
        while l < r:
            if nums[l] + nums[r] == target:
                sol =[nums[l], nums[r], nums[i]]
                result.append(sol)
                while nums[l] == nums[l + 1]:
                    l += 1
                while nums[r] == nums[r -1]:
                    r -= 1
                l += 1
                r -= 1
            elif nums[l] + nums[r] > target:
                r -= 1
            elif nums[l] + nums[r] < target:
                l += 1
        while i < len(nums) -2 and nums[i] == nums[i+ 1]:
            i += 1
        i += 1

    return result
        

nums = [-1, 0, 1, 2, -1, -4]
print(threeSum(nums))
