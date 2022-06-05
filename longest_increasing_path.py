# Given an m x n integers matrix, return the length of the longest increasing path in matrix .
# From each cell, you can either move in four directions: left, right, up, or down. You may not
# move diagonally or move outside the boundary (i.e. wrap-around is not allowed)
# Input: matrix = [[9,9,4],
#                  [6,6,8],
#                  [2,1,1]]
# Output: 4
# Explain: [1,2,6,9]
def longestIncreasingPath(matrix):
    if len(matrix) == 0:
        return 0
    maxCount = 0
    hashmap = dict()
    for i in range(0 , len(matrix)):
        for j in range(0, len(matrix[0])):
            dff(matrix, hashmap, i, j, -1)
    print(hashmap)
    print(max(hashmap.values()))
    return maxCount

def dff(matrix, hashMap, i, j, prevValue):
    if i < 0 or i >= len(matrix) or j < 0 or j >= len(matrix[0]) or matrix[i][j] <= prevValue:
        return 0
    if (i, j) in hashMap:
        return hashMap[(i, j)]
    res = 1
    res = max(res, 1 + dff(matrix, hashMap, i + 1, j, matrix[i][j]))
    res = max(res, 1 + dff(matrix, hashMap, i - 1, j, matrix[i][j]))
    res = max(res, 1 + dff(matrix, hashMap, i, j + 1, matrix[i][j]))
    res = max(res, 1 + dff(matrix, hashMap, i , j - 1, matrix[i][j]))
    hashMap[(i, j)] = res
    return res
matrix = [
        [9,9,4],
        [6,6,8],
        [2,1,1]
    ]
print(longestIncreasingPath(matrix))