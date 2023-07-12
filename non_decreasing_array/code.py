def can_decrease(nums):
    if len(nums) == 0:
        return False
    for i in range(len(nums) - 1):
        if i == 0 or nums[i + 1] >= nums[i - 1]:
            nums[i] = nums[i + 1]
            continue
        return False
    return True
        
nums = [4, 2 ,1]

print(can_decrease(nums))