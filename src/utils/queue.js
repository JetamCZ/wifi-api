const Async = require("async");

const ONLY_ONE_TASK_AT_THE_TIME = 1;

class Queue {
  constructor() {
    this.queues = new Map();
  }

  queue(queueId, queuedFunction) {
    return new Promise((resolve, reject) => {
      if (!this.queues.get(queueId)) {
        this.queues.set(
          queueId,
          Async.queue(this._taskHandler, ONLY_ONE_TASK_AT_THE_TIME)
        );
      }

      this.queues.get(queueId).push({ queuedFunction, resolve, reject });
    });
  }

  _taskHandler({ queuedFunction, resolve, reject }, done) {
    queuedFunction()
      .then((res) => {
        resolve(res);
        done();
      })
      .catch((err) => {
        reject(err);
        done();
      });
  }
}

module.exports = new Queue();
