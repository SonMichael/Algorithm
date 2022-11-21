//pattern 1
import Redis  from 'ioredis'

const redis = new Redis()

redis.defineCommand('transaction', { lua: require('redis-if').script, numberOfKeys: 0 })

await redis.set('custom-state', 'initialized')
await redis.set('custom-counter', 0)

// this call will change state and do another unrelated operation (increment) atomically
let success = await redis.transaction(JSON.stringify({
  if: [
    // apply changes only if this process has acquired a lock
    [ 'initialized', '==', [ 'sget', 'custom-state' ] ]
  ],
  exec: [
    [ 'set', 'custom-state', 'finished' ],
    [ 'incr', 'custom-counter' ]
  ]
}))

// pattern 2
/*
EVAL "return redis.call('SET', KEYS[1], ARGV[1])" 1 foo bar
EVAL "return redis.call('GET', KEYS[1])" 1 foo
*/