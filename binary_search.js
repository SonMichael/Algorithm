const arr = [1,2,3,4,5]
function binarySearch(searchValue, l, r)
{
  if(!searchValue){
    return -1
  }
  const m = parseInt((l + r) / 2)
  if((m === l || m === r) && arr[m] !== searchValue) {
    return -1
  }
  if(searchValue < arr[m]){
     return binarySearch(searchValue , l , m)
  }
  if(searchValue > arr[m]){
     return binarySearch(searchValue, m , r)
  }
  return 1
}
console.log(binarySearch(3, 0,arr.length))
