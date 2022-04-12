// Count subsets equal number.
function countSubsets(arr, i, total){
  if(total === 0){
    return 1
  }
  if(i< 0 || total <0){
    return 0
  }
  return countSubsets(arr, i -1, total - arr[i]) + countSubsets(arr, i -1, total) 
}
const total = 6
const arr = [2,4,6,10]
const length = arr.length
const result = countSubsets(arr, length, total)
console.log(result)
