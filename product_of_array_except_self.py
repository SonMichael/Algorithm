# Given an array nums of n integers where n > 1, return an array
# output such that output[i] is equal to the product of all the 
# elements of nums except nums[i]
# Example: :
# - Input: [1,2,3,4]
# 24 = 4*3*2, 12 = 4*3*1, 8 = 4*2*1
# output: [24,12,8,6]
def productExceptSelf(nums):
    if len(nums) == 0:
        return []
    sol = [None] * len(nums)
    sol[0] = 1
    for i in range(1, len(nums)):
        sol[i] = sol[i -1] * nums[i - 1]
    
    rightNumber = 1
    for i in range (len(nums) - 1 , -1, -1):
        sol[i] = sol[i] * rightNumber
        rightNumber *= nums[i]
    return sol
        

productExceptSelf([1,2,3,4])