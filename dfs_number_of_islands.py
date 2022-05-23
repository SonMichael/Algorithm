# Given a 2d grid map of '1' s (land) and
# '0' s (water), count the number of islands
# An island is surrounded by water and is
# formed by connecting adjacent lands
# horizontally or vertically. You may assume
# all four edges of the grid are all
# surrounded by water.
# Example 1:
# Input:
# 11110
# 11010
# 11000
# 00000
# output: 1

# Example 2:
# Input: 
# 11000
# 11000
# 00100
# 00011
# Output: 3

def numIsLands(grid):
    count = 0
    for i in range(0, len(grid)):
        for j in range(0, len(grid[i])):
            if grid[i][j] == 1:
                dffMark(grid, i, j)
                count += 1
    return count

def dffMark(grid, row, col):
    if row >= len(grid) or col >= len(grid[0]):
        return
    if grid[row][col] == 0:
        return
    grid[row][col] = 0
    dffMark(grid, row, col-1)
    dffMark(grid, row, col+1)
    dffMark(grid, row-1, col)
    dffMark(grid, row+1, col)

# grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0], [0,0,0,0,0]]
grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0], [0,0,0,1,1]]
print(numIsLands(grid))