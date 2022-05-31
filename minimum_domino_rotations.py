# In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the
# domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile)
# We may rotate the i^th domino, so that tops[i] and bottoms[i] swap values.
# Return the minimum number of rotations so that all the values in tops are the same, or all the
# values in bottoms are the same.
# Ex: tops = [2,1,2,4,2,2], 
#  bottoms = [5,2,6,2,3,2]
# result: 
# tops =    [2,2,2,2,2,2]
# bottoms = [5,1,6,4,3,2]
def minDominoRotations(tops, bottoms):
    if len(tops) == 0 or len(bottoms) == 0:
        return -1
    hash = dict()
    for i in range(0 , len(tops)):
        make_hash(hash, i, tops[i])
        make_hash(hash, i, bottoms[i])
    listHash = list(hash)
    key0, key1 = listHash[0], listHash[1]
    count0, _ = hash.get(key0)
    if count0 >= len(tops) -1:
        return hash.get(key0)
    return hash.get(key1)
    
    
def make_hash(hash, i, key):
    if hash.get(key) == None:
        arr = 6 * [0]
        arr[i] = key
        hash[key] = [1, arr]
        return
    count, poses = hash.get(key)
    poses[i] = key
    hash[key] = [count + 1, poses]

tops =    [2,1,1,3,2,2]
bottoms = [1,2,1,1,1,1]
print(minDominoRotations(tops, bottoms))