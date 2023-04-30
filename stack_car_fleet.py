# There are n cars going to the same destination along a one-lane road. The destination is target miles away.
# You are given two integer array position and speed, both of length n, where position[i] is the position of
# the i^th car and speed[i] is the speed of the i^th car (in miles per hour).
# A car can never pass another car ahead of it, but it can catch up to it, and drive bumper to bumper at the same
# The distance between these two cars is ignored (i.e., they are assumed to have the same position).
# A car fleet is some non-empty set of cars driving at the  same position and same speed. Note that a single car
# also a car fleet.
# If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.
# Return the number of car fleets that will arrive at the destination.
# Example 1: 
# Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
# Output: 3
# Explanation: 8,10,11


def carFleet(target, position, speed):
    pairs = zip(position, speed)
    stack = []
    pairs_sorted = sorted(pairs)[::-1]
    for pos, sped in pairs_sorted:
        # Why minus:
        # We only care before time targer, after target we don't care (It's mean time = 0)
        stack.append((target - pos) / sped)
        print(stack)
        if len(stack) >= 2 and stack[-1] <= stack[-2]:
            stack.pop()
    return len(stack)

# target = 12
# position = [10,8,0,5,3]
# speed = [2,4,1,1,3]
target = 10
position = [3,5,7]
speed = [3,2,1]
# result = 1
# target = 5
# position = [1,2,3,5]
# speed = [1,1,1,1]
# result = 4
print(carFleet(target, position, speed))
