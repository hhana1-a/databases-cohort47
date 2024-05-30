const setup = require('./setup');
const transfer = require('./transfer');

async function test(){
  await setUpEnvironment();
  await transferMoney(101, 102, 1000, 'frikandelbroodje');
};

test();
