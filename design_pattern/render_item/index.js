function createOneHundredThousandData(){
  let arr = [];
  for(let i=0;i<100000;i++){
    arr.push({
      imgUrl:'https://cf.shopee.vn/file/2c1e846120cefebd49e8ba45acd2d100',
      key:i
    })
  }
  return arr;
}
let h = [];
let data = createOneHundredThousandData()
// lấy 100 items đầu tiên
let firstScreenData = data.splice(0,100);
setTimeout(()=>{
  function renderHundred(n){
    // console.log('n=',n);
    // Mỗi lần hiện thị 100 items
    let partialData = data.splice(0,100);
    for(let i=0;i<100 && partialData.length>0;i++){
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src  = partialData[i].imgUrl;
      li.appendChild(img);
      let text = document.createTextNode(partialData[i].key);
      // console.log('partialData[i].key',partialData[i].key);
      li.appendChild(text);
      document.getElementById('root').appendChild(li);
    }            
    if(n){
      setTimeout(()=>{
        renderHundred(n-1);
      },50)
    }       
  }
  renderHundred(999);// chạy 1000 loop mới mỗi loop là 100 items hiểu không
},1000); 