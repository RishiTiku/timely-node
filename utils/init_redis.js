import { createClient } from '@redis/client';

const client = createClient({
    url: 'redis://127.0.0.1:6379' // Redis connection string
});

(async () => {
    try {
        await client.connect(); // Connect using modern async/await
        console.log('Client connected to Redis...');
    } catch (err) {
        console.error('Redis connection error:', err.message);
    }
})();

client.on('ready', () => {
    console.log('Client connected to Redis and ready to use...');
});

client.on('error', (err) => {
    console.error('Redis error:', err.message);
});

client.on('end', () => {
    console.log('Client disconnected from Redis');
});

process.on('SIGINT', () => {
    client.quit(); // Gracefully quit on interrupt signal
    console.log('Redis client quitting...');
});

export default client;
