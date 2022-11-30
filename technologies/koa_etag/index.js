import conditional from 'koa-conditional-get';
import etag from 'koa-etag'
import Koa from 'koa'
import router from 'koa-router'
const app = new Koa();
const _ = router();

// etag works together with conditional-get
app.use(conditional());
app.use(etag());

_.get('/hello', ctx => {
  ctx.body = 'hello 1'
});

_.post('/hello', ctx => {
  ctx.body = 'hello 2'
});
_.patch('/hello', ctx => {
  ctx.body = 'hello 3'
});
_.put('/hello', ctx => {
  ctx.body = 'hello 4'
});
app.use(_.routes());
app.listen(3000);
console.log('listening on port 3000');