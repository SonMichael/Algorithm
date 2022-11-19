import Queue from "bull";
import process from 'process'
import EventEmitter from "events";
import Redis from "ioredis"
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter.js';
import { ExpressAdapter } from '@bull-board/express'
import express from "express";



const eventEmitter = new EventEmitter();
const jobConfigs = {
  removeOnComplete: true,
  removeOnFail: true,
  backoff: 2,//  static 5 sec delay between retry
  attempts: 2, // If job fails it will retry till 5 times
  delay: 100
}
const queue = new Queue('my-first-queue', jobConfigs);

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(queue)],
  serverAdapter: serverAdapter,
});
const app = express();


const redis = new Redis(6379, "127.0.0.1")
const KEY_TEST_CONCURRENCY_DATA = 'test_concurrency_data'

const initRedisData = async () => {
  await redis.set(KEY_TEST_CONCURRENCY_DATA, 2)
}


const main = async () => {
  await initRedisData()
  const users = [
    {id:  1,  name: "name1", age: 31 },
    { id: 2, name: "name2", age: 25 },
    { id: 3, name: "name3", age: 19 },
    { id: 4, name: "name4", age: 17 },
    { id: 5, name: "name5", age: 32 },
  ];
  
  
  const controller = async () => {
    const promises = users.map((user) => {
      const taskId = `${user.id}_${user.name}`
      user.task_id = taskId
      queue.add(user)
      eventEmitter.once(taskId, msg => {
        console.log(taskId);
      });
    });
  
    await Promise.all(promises);
  };
  
  controller();
  
  queue.add({ name: "name6", age: 30 },{
    attempts: 2,
    backoff: {
      type: 'jitter'
    }
  });
  
  

  const actionPromise = (time) => {
    
    return new Promise((resolve, reject) => 
      setTimeout(async () => {
        let redisData = await redis.get(KEY_TEST_CONCURRENCY_DATA)
        await redis.set(KEY_TEST_CONCURRENCY_DATA, redisData - 1)
        resolve({
          redisData
        })
      }, time))
  }

  const actionFirstQueue = async (job, done) => {
    if (job.data.name === "name6"){
      // make stall worker
      throw new Error('some unexpected error');
    }
    
    console.log('1', process.pid,job.data);
    let { redisData} = await actionPromise(100)
    console.log("🚀 ~ file: workers.js ~ line 56 ~ actionFirstQueue ~ redisData",  redisData)
    done();
  }

  // we can change number of worker to test concurrency
  queue.process('__default__', 3, actionFirstQueue);
  
  queue.on('completed', function (job, result) {
    console.log(`completed: proccess_id: ${process.pid} job_id = ${job.id}`)
    eventEmitter.emit(job.data.task_id)
    job.remove();
    // Job completed with output result!
  })

  queue.on('failed', async function (job, err) {
    console.log("failed: ", err)
    job.remove();
  })
  queue.on('stalled', async function (job, err) {
    job.remove();
    console.log("stalled: ", await queue.getActiveCount())
    // Job completed with output result!
  })
  
}

app.use('/admin/queues', serverAdapter.getRouter());

// other configurations of your server

app.listen(3000, () => {
  console.log('Running on 3000...');
  console.log('For the UI, open http://localhost:3000/admin/queues');
  console.log('Make sure Redis is running on port 6379 by default');
});

export default {
  main
}
