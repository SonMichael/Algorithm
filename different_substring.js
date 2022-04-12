
// Cho 1 string: inputString Tra ye so luong chuoi con khac nhau
// VI du: inputString = "abc" => Output = 7 Danh sach chu6i con bao gem: (a, b, c, ab, bc, ac, abc) 
// VI du: inputString = "aaa" => Output = 3 Danh sach chu6i con bao gam: (a, aa, aaa) 
// VI du: inputString = "bcb" => Output = 6 Danh sach chu6i con bao gam (b, c, bc, cb, bb, bcb) 
// Return total count
function countTotal(str)
{
    // Hashmap store all character and position have already 
    let hashMapCharacter = {}
    // Length of input string
    let n = str.length;
 
    // countValues[i] is going to store count of character
    let countValues = [];
    // For multi equal not 0
    countValues[0] = 1;
 
    // Loop from 1 to n.
    for(let i = 1; i <= n; i++)
    {    
        // Countitng all subsequences with substring
        countValues[i] = 2 * countValues[i - 1];
        
        // If current character has appeared before
        if (typeof hashMapCharacter[str[i - 1]] !== 'undefined'){
         // total case at current position  -  total case at previous position
          countValues[i] = countValues[i] - countValues[hashMapCharacter[str[i - 1]]];
        }
        // Marking current character
        hashMapCharacter[str[i - 1]] = (i - 1);
    }
    return countValues[n];
}
// 2^n -1 with different character completely
console.log(countTotal("abc") - 1 )
// Complexity time  0(n)

