#  -*- coding: utf-8 -*-
# - Given an m x n matrix of non-negative integers representing the height of each unit cell in a
# continent, the "Pacific ocean” touches the left and top edges of the matrix and the "Atlantic ocean”
# touches the right and bottom edges.
# Water can only flow in four directions (up, down, left, or right) from a cell to another one with height
# equal or lower.
# Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.
# Note:
# 1. The order of returned grid coordinates does not matter.
# 2. Both m and n are less than 150.
# Example:
# Given the following 5x5 matrix:
# Pacific ~ ~ ~ ~ ~
# ~ 1  2  2  3 (5) *
# ~ 3  2  3 (4)(4) *
# ~ 2  4 (5) 3  1  *
# ~(6)(7) 1  4  5  *
# ~(5) 1  1  2  4  *
#   *  *  *  *  *  *Atlantic
# Return:
# [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).
def positions(matrix):
    if(len(matrix) == 0):
        return
    pacific = [[0 for i in range(len(matrix[0]))] for i  in range(len(matrix))]
    atlantic = [[0 for i in range(len(matrix[0]))] for i  in range(len(matrix))]

    for i in range(0, len(matrix[0])):
        dff(matrix, 0, i, -1, pacific)
        dff(matrix, len(matrix[0]) - 1, i, -1, atlantic)

    for i in range(0, len(matrix)):
        dff(matrix, i, 0, -1, pacific)
        dff(matrix, i, len(matrix) - 1, -1, atlantic)
    result = []
    for i in range(len(pacific)):
        for j in range(len(pacific[0])):
            if pacific[i][j] == atlantic[i][j] == 1:
                result.append([i , j])
    return result

def dff(matrix, row, col, prevValue, ocean):
    # because 7 can flow to 6 so we must compare matrix[row][col] < prevValue
    if row < 0 or row > len(matrix) -1 or col < 0 or col > len(matrix[0]) - 1 or matrix[row][col] < prevValue or ocean[row][col] == 1:
        return
    ocean[row][col] = 1
    dff(matrix, row -1, col, matrix[row][col], ocean)
    dff(matrix, row + 1, col, matrix[row][col], ocean)
    dff(matrix, row, col - 1, matrix[row][col], ocean)
    dff(matrix, row, col + 1, matrix[row][col], ocean)
    
matrix = [
    [1, 2,  2,  3, 5],
    [3, 2,  3,  4 ,4],
    [2, 4,  5 , 3  ,1],
    [6, 7 , 1 , 4  ,5],
    [5, 1 , 1 , 2 , 4]
]
print(positions(matrix))