import redis from 'redis';

const client = redis.createClient(6379, "127.0.0.1");

(async () => {
    await client.connect();
})();

client.on('connect', ()=> {
    console.log('Client connected to Redis...');
});

client.on('ready', ()=> {
    console.log('Client connected to Redis and Ready to use...');
});

client.on('error', (err)=> {
    console.log(err.message);
});

client.on('end', ()=> {
    console.log('Client disconnected from Redis');
});

process.on('SIGINT', ()=> {
    client.quit();
});

export default client;