// Time Complexity: O(nlogn)
// Space Complexity: O(nlogn)
// Stable: No
// In-Place: Yes
// Recursive: Yes

function quickSort(arr, l , r)
{
  if(arr.length <= 1){
    return arr
  }
  const m = partition(arr,l ,r)
  if(l < m-1) {
   quickSort(arr, l, m - 1) 
  }
  if(m < r) {
    quickSort(arr, m , r)  
  } 

  return arr
}

function partition(arr,l , r)
{
  
  let m = arr[parseInt((l + r) / 2)], 
  i = l,
  j = r
  while(i <= j) {
    while(arr[i] < m){
      i++
    }
    while(arr[j] > m){
      j--
    }
    if(i <= j){
      swap(arr, i, j)
      i++
      j--
    }
  }
  return i
}

function swap (arr, a , b)
{
  let c = arr[a]
  arr[a] = arr[b]
  arr[b] = c
}
const arr = [5,4,6,7,1, 8, 3]
console.log(quickSort(arr, 0, arr.length -1))


