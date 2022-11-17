
import {MongoClient} from 'mongodb'

export async function initConnection(){
  var options = {
    maxPoolSize: 50, 
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    directConnection: true
  }
  // connect đến replicate thì bỏ directConnection và bỏ nhiều host nhiều port vào uri là được
  const uri = 'mongodb://127.0.0.1:27018/dbfour?replicaSet=rs0';
  const client = await MongoClient.connect(uri, options)

  const db = client.db();
  await db.dropDatabase();
  console.log('(1) Xoá hết database nếu tồn tại \n')

  // Tạ dữ liệu cho hai tài khoản
  await db.collection('Account').insertMany([
    { name: 'A', balance: 50 },
    { name: 'B', balance: 10 }
  ]);
  console.log('(2) Insert data mới \n')
  return db
}
initConnection()