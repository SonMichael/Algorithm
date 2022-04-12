
function reOrder(arr)
{
  const n = arr.length
  var lastIndex = n - 1
  for(i = n - 2; i >= 0 ; i--) {
    const index = Math.floor( Math.random() * i)
    swap(arr, lastIndex, index)
    lastIndex--
  }
  return arr
}

function swap(array, a,b)
{
  const c = array[a]
  array[a] = array[b]
  array[b] = c
}
const arr = [1,2,3,4,5]
console.log(reOrder(arr))