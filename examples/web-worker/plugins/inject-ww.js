import ExampleWorker from '~/assets/js/Example.worker.js' // worker files has to end in ".worker.js" - see nuxt.config.js
import PoolWorker from '~/assets/js/Pool.worker.js' // worker files has to end in ".worker.js" - see nuxt.config.js

export default (context, inject) => {
  inject('worker', {
    createWorker (type) {
      let worker

      switch (type) {
        case 'example': worker = new ExampleWorker()
          break
        case 'pool': worker = new PoolWorker()
          break
        default: throw new TypeError(`inject-ww :: type ${type} is not recognized`)
      }

      return worker
    }
  })
}
