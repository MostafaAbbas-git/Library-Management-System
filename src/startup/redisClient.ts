import { createClient } from 'redis';

// Define connection options with likely defaults (adjust as needed)
const client = createClient({
  url: 'redis://localhost:6379',
  // Add authentication details if required:
  // password: 'yourRedisPassword',
});

// Enhanced connection handling with retries and logging:

client.on('ready', () => {
  console.log('Redis client ready');
});

client.on('error', (err) => {
  console.error('Redis client error', err);
});

// Graceful closure:
process.on('SIGINT', async () => {
  console.log('Closing Redis client');
  await client.quit();
  console.log('Redis client closed');
});

export default client;
