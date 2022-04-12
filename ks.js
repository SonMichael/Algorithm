// knapstack
function ks(k, w, v, i, hashMemo) {
  const hashKey = `${i}_${k}`
  if(hashMemo && hashMemo[hashKey]){
    return hashMemo[hashKey]
  }
  if(k < 0) {
    return Number.MIN_SAFE_INTEGER;
  }
  if(i < 0 || k === 0){
    return 0 
  }
  const  tmp2 =   v[i] +  ks(k - w[i],w,v ,i -1, hashMemo)
  const tmp1 = ks(k,w,v ,i -1, hashMemo)
  
  const result = Math.max(tmp2, tmp1)
  hashMemo[hashKey] = result
  return result
}
w = [1,2,3]
v = [5,5,2]
const k = 3
// const w = [4, 2, 1, 10, 2]
// const v = [12, 2, 1, 4, 1]
// const k = 15
// const v = [12, 2, 1, 4, 1];
// const w = [4, 2, 1, 10, 2];
// const k = 15;
const hashMem = {}
console.log(ks(k, w, v, v.length -1, hashMem))