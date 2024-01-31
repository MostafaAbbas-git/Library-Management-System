import app from './app';

const address: string = '0.0.0.0:3001';

const server = app.listen(3001, function () {
  console.log(`starting app on: ${address}`);
});

export default server;
