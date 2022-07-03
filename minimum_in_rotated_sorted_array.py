# Suppose an array sorted in ascending order is rotated at
# some pivot unknown to you beforehand
# (ie, [0,1,2,4,5,6,7] might become
# [4,5,6,7,0,1,2]).
# Find the minimum element.
# You may assume no duplicate exists in the array.
# Example 1
# Input: [2,3,4,5,1]
# Output: 1
# Input: [4,5,6,7,0,1,2]
# Output: 0
# Note: complexity time: log(n)

def findMin(nums):
    if len(nums) == 0 :
        return -1
    i = 0 
    length = len(nums) -1
    min = nums[i]
    while i <= length:
        guess = ( i + length ) / 2
        if nums[guess] > min:
            i = guess + 1
        else:
            length = guess -1
            min = nums [guess]
    return min

nums = [4,5,6,7,0,1,2]
findMin(nums)