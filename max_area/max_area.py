# Given n non-negative integers ay, az, .., a,, where each
# represents a point at coordinate (i, ai). n vertical lines are
# drawn such that the two endpoints of line i is at (i, ai) and
# (i, 0). Find two lines, which together with x-axis forms a
# container, such that the container contains the most water.
# Note: You may not slant the container and n is at least 2.
# The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. 
# In this case, the max area of water (blue section) the container can contain is 49
# Input: height = [1,8,6,2,5,4,8,3,7]
# Qutput: 49 = (8 - 1) * 7
# Explanation: The above vertical lines ane represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container
# can contain is 49.

def max_area(nums):
    if len(nums) == 0:
        return 0
    l = 0
    r = len(nums) -1
    max_area = 0
    while l < r:
        max_area = max(max_area, (r - l) * min(nums[l], nums[r]))
        if nums[l] < nums[r]:
            l += 1
        else:
            r -= 1
    return max_area

nums = [1,8,6,2,5,4,8,3,7]
print(max_area(nums))