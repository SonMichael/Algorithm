import { createCluster } from 'redis';

const cluster = createCluster({
  rootNodes: [{
    url: 'external-host-1.io:30001'
  }, {
    url: 'external-host-2.io:30002'
  }],
});

cluster.on('error', (err) => console.log('Redis Cluster Error', err));

await cluster.connect();

await cluster.set('key', 'value');
const value = await cluster.get('key');