// let ExampleWorker = null

// if (process.browser) {
//   (async function () {
//     ExampleWorker = await import('~/assets/js/Example.worker.js')
//   })
// }
import ExampleWorker from '~/assets/js/Example.worker.js'

const pool = []
let index = 0

class WorkerWrapper {
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

export function addWorker () {
  pool.push(new WorkerWrapper(new ExampleWorker))
}

export function getWorker () {
  // prevent number overflow, which would just return the same worker everytime
  if (index === pool.length) index = 0

  const worker = pool[index++ % pool.length]
  if (worker.busy) return getWorker()

  worker.busy = true
  return worker.worker
}

export function getSize () {
  return pool.length
}
