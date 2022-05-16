# Suppose an array sorted in ascending order is rotated at i
# - some pivot unknown to you beforehand.
# (e, [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
# You are given a target value to search. If found in the array
# return its index, otherwise return -1.
# You may assume no duplicate exists in the array.
# Your algorithm's runtime complexity must be in the order of O(log n).


def search(nums , value):
    if len(nums) == 0:
        return -1
    i = 0
    length = len(nums) -1
    min = nums[i]
    pos =  0
    while i <= length:
        mid = ( i + length ) / 2
        if nums[mid] > min:
            i = mid + 1
        else:
            length = mid -1
            min = nums[mid]
            pos = mid
    result = binarySearch(nums, value, 0, pos + 1)
    if result == 1:
        return 1
    result1 = binarySearch(nums, value, pos, len(nums))
    return result1

def binarySearch(nums, value, from_index , to_index):
    pivot = ((from_index + to_index) / 2) 
    if nums[pivot] == value:
        return 1
    if from_index >= to_index or pivot <= from_index or pivot >= to_index:
        return -1
    if nums[pivot] > value:
        return binarySearch(nums, value, from_index, pivot)
    if nums[pivot] < value:
        return binarySearch(nums, value, pivot, to_index)
    return -1

nums = [6,7,0,1,2,4,5]
value = 5
print("search", search(nums , value))