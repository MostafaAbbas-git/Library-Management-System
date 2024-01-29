import app from './app';

const address: string = '0.0.0.0:3000';

const server = app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default server;
