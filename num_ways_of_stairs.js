function numWays(n)
{
  if(n == 0 || n === 1){
    return 1
  }
  return numWays(n-1) + numWays( n -2)
}
console.log(numWays(3))