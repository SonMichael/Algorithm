import Queue from "bull";
import process from 'process'
const queue = new Queue('my-first-queue');

const main = () => {

  const users = [
    { name: "name1", age: 31 },
    { name: "name2", age: 25 },
    { name: "name3", age: 19 },
    { name: "name4", age: 17 },
    { name: "name5", age: 32 },
  ];
  
  
  const controller = async () => {
    const promises = users.map((user) => queue.add(user));
  
    await Promise.all(promises);
  };
  
  controller();
  
  queue.add({ name: "name6", age: 30 });
  
  const actionFirstQueue = (job, done) => {
    console.log('1', process.pid,job.data);
    done();
  }

  // queue1 and queue2 can't run the same time, it's mean when queue1 handle "name1" that it's done
  // const queue1 = new Queue('my-first-queue');
  queue.process('__default__', 4, actionFirstQueue);
  
  queue.on('completed', function (job, result) {
    console.log("completed")
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
