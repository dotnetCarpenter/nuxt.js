const pool = []
let index = 0

class Worker {
  constructor (worker) {
    this.worker = worker
    this.busy = false

    worker.addEventListener('message', function (event) {
      worker.removeEventListener('message', this)
      this.busy = false
      // self.postMessage(event)
    })
  }
}

function addWorker(worker) {
  pool.push(new Worker(worker))
}

function getWorker() {
  const worker = pool[index++ % pool.length]
  if (worker.busy) return getWorker()

  worker.busy = true
  return worker.worker
}

self.onmessage = data => {
  switch (data.action) {
    case 'add': addWorker(data.payload)
      break
    case 'getWorker': self.postMessage(getWorker())
      break
    case 'getSize': self.postMessage(pool.length)
      break
    default: throw new TypeError('Pool.worker.js :: data.action is not recognized')
  }
}
