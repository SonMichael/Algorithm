const promises = new Array(5).fill(Promise.resolve())
const argsCopy = [1,2,3,4,5]
const result = {}
function asyncOperation(){

  return new Promise(resolve =>
    setTimeout(() => {
      resolve(1);
    }, 100))

}
function chainNext(p ) {
  if (argsCopy.length) {
    const arg = argsCopy.shift();
    // we put promise consecutive
    return p.then(() => {
      // we save result when promise response
      const operationPromise = asyncOperation(arg.val).then(r => { result[r] = r; });
      return chainNext(operationPromise);
    });
  }
  return p;
}

async function main(){
  // If we call immediate "asyncOperation" we must await 100ms, but we call "chainNext", the "chainNext" always return immediate 
  // and we will set result after that
  await Promise.all(promises.map(chainNext));
  console.log("🚀 ~ file: test.js ~ line 14 ~ result", result)
}

main()
