import { createClient } from 'redis';

const client = createClient({
  url: 'redis://127.0.0.1:6379',
});

client.on('connect', () => console.log('Redis client connecting'));
client.on('ready', () => console.log('Redis client ready'));
client.on('error', (err) => console.error('Redis client error', err));
client.on('end', () => console.log('Redis client disconnected'));

async function connectRedis() {
  try {
    await client.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
}

// Connect to Redis when the app starts
connectRedis();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing Redis client');
  await client.quit();
  console.log('Redis client closed');
});

export default client;
