import express from "express";
import Queue from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter.js';
import { ExpressAdapter } from '@bull-board/express'

const someQueue = new Queue('someQueueName', {
  redis: { port: 6379, host: '127.0.0.1', password: 'foobared' },
}); // if you have a special connection to redis.
const someOtherQueue = new Queue('someOtherQueueName');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(someQueue), new BullAdapter(someOtherQueue)],
  serverAdapter: serverAdapter,
});

const app = express();

const users = [
  { name: "name1", age: 31 },
  { name: "name2", age: 25 },
  { name: "name3", age: 19 },
  { name: "name4", age: 17 },
  { name: "name5", age: 32 },
];


const controller = async () => {
  const promises = users.map((user) => someQueue.add(user));

  await Promise.all(promises);
};

controller();

const actionFirstQueue = (job, done) => {
  console.log('1', process.pid,job.data);
  done();
}

// queue1 and queue2 can't run the same time, it's mean when queue1 handle "name1" that it's done
// const queue1 = new Queue('my-first-queue');
someQueue.process('__default__', 4, actionFirstQueue);

app.use('/admin/queues', serverAdapter.getRouter());

// other configurations of your server

app.listen(3000, () => {
  console.log('Running on 3000...');
  console.log('For the UI, open http://localhost:3000/admin/queues');
  console.log('Make sure Redis is running on port 6379 by default');
});