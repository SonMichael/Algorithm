import Queue from "bull";
import cluster from 'cluster';
import http from 'http'



function main() {
  const jobConfigs = {
    removeOnComplete: true,
    backoff: 5,//  static 5 sec delay between retry
    attempts: 5, // If job fails it will retry till 5 times
    delay: 100
  }
  const queue = new Queue('waiting', jobConfigs);

  if (cluster.isMaster) {
    masterProcess();
  } else {
    childProcess();  
  }
  
  function masterProcess() {
    queue.add({ foo: 'waiting_'+ 1 });
    console.log(`Master ${process.pid} is running`);
  }
  
  function childProcess() {
    queue.process(function (job, jobDone) {
      console.log('Job1 done by worker', cluster.worker.id,job.id, job.data);
      jobDone();
    });
    http.createServer((req, res) => {
      res.writeHead(200);
      res.end('Hello World');
    }).listen(9000);
  }

}

export default {
  main
}