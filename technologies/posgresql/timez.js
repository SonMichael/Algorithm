import pkg from 'pg';
const {  Client } = pkg;

 
// clients will also use environment variables
// for connection information
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
})
await client.connect()

 
const { rows } = await client.query('SELECT * from engineer1')
const startedDate = `${rows[0].started_date}`
const created = `${rows[0].created}`
console.log("🚀 ~ file: timez.js ~ line 19 ~ created", created)
console.log("🚀 ~ file: test.js ~ line 18 ~ startedDate", startedDate)


await client.end()