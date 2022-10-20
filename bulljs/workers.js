import Queue from "bull";
import process from 'process'
import EventEmitter from "events";
import Redis from "ioredis"

const eventEmitter = new EventEmitter();

const queue = new Queue('my-first-queue');
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
  
  queue.add({ name: "name6", age: 30 });
  
  

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
    console.log('1', process.pid,job.data);
    let { redisData} = await actionPromise(100)
    console.log("🚀 ~ file: workers.js ~ line 56 ~ actionFirstQueue ~ redisData",  redisData)
    done();
  }

  // we can change number of worker to test concurrency
  queue.process('__default__', 3, actionFirstQueue);
  
  queue.on('completed', function (job, result) {
    console.log("completed")
    eventEmitter.emit(job.data.task_id)
    // Job completed with output result!
  })

  queue.on('failed', function (job, err) {
    console.log(err)
    // Job completed with output result!
  })
  
}

export default {
  main
}
