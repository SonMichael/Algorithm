# In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the
# domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile)
# We may rotate the i^th domino, so that tops[i] and bottoms[i] swap values.
# Return the minimum number of rotations so that all the values in tops are the same, or all the
# values in bottoms are the same.
# Ex: tops = [1,2,1,4,1,1]
#  bottoms = [5,1,6,1,3,2]
# result: 2
# 2 <-> 1 , 4 <-> 1 => 2

# Ex2: tops = [1,2,1,1,1,1]
#  bottoms =  [5,1,6,1,3,2]
# result: 1
#  2 <-> 1 => 1

def minDominoRotations(tops, bottoms):
    if len(tops) == 0 or len(bottoms) == 0:
        return -1

    for target in [tops[0], bottoms[0]]:
        missingT , missingB = 0, 0
        for i, pair in enumerate(zip(tops, bottoms)):
            top, bottom = pair
            if  target != top and target  != bottom:
                break
            if top != target: missingT += 1
            elif bottom != target: missingB += 1
            if i == len(tops) - 1:
                return min(missingT, missingB)
    return -1
    
tops =    [1,2,1,4,1,1]
bottoms = [5,1,6,1,3,2]
print(minDominoRotations(tops, bottoms))