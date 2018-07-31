// specified in WORKER_COUNT.
//
// The master will respond to SIGHUP, which will trigger
// restarting all the workers and reloading the app.
const cluster = require('cluster');
const config = require('./config');
// destructuring logger from utils
const { logger } = require('./utils');

const workerCount = config.get('cluster.workerCount');

// Defines what each worker needs to run
// In this case, it's server.js a simple node http app
cluster.setupMaster({ exec: 'server.js' });

// Gets the count of active workers
function numWorkers() { return Object.keys(cluster.workers).length; }

let stopping = false;

// Forks off the workers unless the server is stopping
function forkNewWorkers() {
  if (!stopping) {
    for (let i = numWorkers(); i < workerCount; i += 1) { cluster.fork(); }
  }
}

// A list of workers queued for a restart
let workersToStop = [];

// Stops a single worker
// Gives 60 seconds after disconnect before SIGTERM
function stopWorker(worker) {
  logger.info(`stopping worker pid:${worker.process.pid}`);
  worker.disconnect();
  const killTimer = setTimeout(() => {
    worker.kill();
  }, 60000);

  // Ensure we don't stay up just for this setTimeout
  killTimer.unref();
}

// Tell the next worker queued to restart to disconnect
// This will allow the process to finish it's work
// for 60 seconds before sending SIGTERM
function stopNextWorker() {
  const i = workersToStop.pop();
  const worker = cluster.workers[i];
  if (worker) stopWorker(worker);
}

// Stops all the works at once
function stopAllWorkers() {
  stopping = true;
  logger.info('stopping all workers');
  Object.keys(cluster.workers).map(id => stopWorker(cluster.workers[id]));
}

// Worker is now listening on a port
// Once it is ready, we can signal the next worker to restart
cluster.on('listening', stopNextWorker);

// A worker has disconnected either because the process was killed
// or we are processing the workersToStop array restarting each process
// In either case, we will fork any workers needed
cluster.on('disconnect', forkNewWorkers);

// HUP signal sent to the master process to start restarting all the workers sequentially
process.on('SIGHUP', () => {
  logger.info('restarting all workers');
  workersToStop = Object.keys(cluster.workers);
  stopNextWorker();
});

// Kill all the workers at once
process.on('SIGTERM', stopAllWorkers);

// Fork off the initial workers
forkNewWorkers();
logger.info(`api master started with pid:${process.pid}`);
