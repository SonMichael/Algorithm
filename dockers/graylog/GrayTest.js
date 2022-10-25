const graylog2 = require('graylog2');
const crypto = require('crypto');

const logger = new graylog2.graylog({
  servers: [{ host: '127.0.0.1', port: 12201 }] // Replace the "host" per your Graylog domain
});


const userId = '1234';
const userIdHash = crypto.createHash('md5').update(userId).digest('hex');
const ip = '1.2.3.4';
const ipHash = crypto.createHash('md5').update(ip).digest('hex');

logger.log(
  'API request', // Message
  // A json with what you want in it
  {
    route: '/v1/messages/1234/',
    method: 'POST',

    reponseTime: 12, // ms
    reponseCode: 200,

    ipHash,
    userIdHash
  }
);