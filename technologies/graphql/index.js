//Import các thư viện cần dùng
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Xây dựng một Schema, sử dụng ngôn ngữ Schema GraphQL
var schema = buildSchema(`
  type Query {
    author: String,
    song:String,
    errors: String
  }
`);

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve("Mono1"), ms));
}
// Root cung cấp chức năng phân giải cho mỗi endpoint API
var root = {
  author: async () => {
    return await timeout(100);
  },
  song: () => {
    return 'Waiting for you!';
  },
  errors: () => {
    throw new Error("Could not connect to age service");
  }
};

//Tạo server với express
var app = express();

//Khai báo API graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, //sử dụng công cụ GraphiQL để đưa ra các query GraphQL theo cách thủ công
}));

app.get("/api", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get("/api/:n", function (req, res) {
  let n = parseInt(req.params.n);
  res.send(`Final count is ${n}`);
});

// Khởi tạo server tại port 4000
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

