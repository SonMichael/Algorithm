// Lay nhung diem doc lap 
function getCriticalPaths (paths) {
  const n  = paths.length
  if(n <= 0 ){
    return []
  }
  // save all points
  let hashmap = {};
  for(let i = 0; i < n ; i++){
    // point must to two points
    if(paths[i].length < 2){
        continue
    }
    // add point to hashmap
    addData(hashmap, paths[i])
  }
  // get result from all points saved
  const result = getPaths(hashmap)
  return result
}

function getPaths(hashmap)
{
  let result = []
  for(let i in hashmap){
    // If point is -1. We will continue
      if(hashmap[i] === -1){
        continue
      }
      result.push(hashmap[i])
  }
  return result
}

function addData(hashmap , arrI )
{
  const key = arrI[0]
  const key1 = arrI[1]
  // add first point
  add(hashmap, key , arrI)
  // add second point
  add(hashmap, key1 , arrI)
}

function add (hashmap, key, value){
  // If point have already
  if(typeof hashmap[key] !== "undefined") {
    // if point is -1. We will nothing
    hashmap[key] = -1
    return
  }
  hashmap[key] = value
}

// const paths = [[1, 3],[0,1], [1, 2],  [0, 2], [2,4]] 
const paths = [['a', 'b'], ['b', 'c'] , ['c', 'a'],['c', 'd']]
const result = getCriticalPaths(paths)
console.log(result)
// Complexity time  0(n)