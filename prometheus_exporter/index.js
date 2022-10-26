const express = require('express')
const prometheus = require('prom-client');

const app = express()
const port = 3000
const counter = new prometheus.Counter({
  name: 'http_request_total',
  help: 'Number of requests',
  labelNames: ['method', 'path']
})

app.use((req, res, next) => {
  // don't count /metrics request

  if (req.path != '/metrics') {

      counter.inc({ 
          method: req.method, 
          path: req.path 
      });

  }
  next();
});


app.get('/profile/me', async (req, res) => {
    res.json({'http': 200});
});

// expose metrics endpoint
app.get('/metrics', async (req, res, next) => {
    res.set('Content-Type', prometheus.register.contentType);
    const data  = await prometheus.register.metrics()
    return res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})