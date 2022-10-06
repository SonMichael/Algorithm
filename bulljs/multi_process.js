import Queue from "bull";
import cluster from 'cluster';
import http from 'http'
import process from 'process'

function main() {
  const numWorkers = 2;
  const jobConfigs = {
    removeOnComplete: true,
    backoff: 5,//  static 5 sec delay between retry
    attempts: 5, // If job fails it will retry till 5 times
    delay: 100
  }
  const queue = new Queue('draft', jobConfigs);

  if (cluster.isMaster) {
    masterProcess();
  } else {
    childProcess();  
  }
  
  function masterProcess() {
    console.log(`Master ${process.pid} is running`);
  
    for (let i = 0; i < numWorkers; i++) {
      console.log(`Forking process number ${i}...`);
      cluster.fork();
    }

    cluster.on('online', function (worker) {
      // Let's create a few jobs for the queue workers
      for (let i = 0; i < 2; i++) {
        queue.add({ foo: 'draft_'+i });
      };
    });
  
    cluster.on('exit', function (worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
    });
  }
  
  function childProcess() {
    console.log(`Worker ${process.pid} started...`);
    queue.process(function (job, jobDone) {
      console.log('Job done by worker', cluster.worker.id, job.id, job.data);
      jobDone();
    });
    http.createServer((req, res) => {
      res.writeHead(200);
      console.log("🚀 ~ file: workers.js ~ line 50 ~ http.createServer ~ 200", 1)
      res.end('Hello World');
    }).listen(9001);
  }

}



export default {
  main
}