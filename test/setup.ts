import { rm } from 'fs/promises';
import { join } from 'path';

console.log('__dirname :>> ', __dirname);
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

// import { rm } from 'fs/promises';
// import { join } from 'path';
// import { AppDataSource } from '../src/data-source';

// global.beforeEach(async () => {
//   await AppDataSource.initialize();
//   await AppDataSource.synchronize(true);
// });

// global.afterEach(async () => {
//   await AppDataSource.destroy();
// });
