import { Worker } from 'worker_threads'
import os from 'os'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const performCalculations = async () => {
  const numCores = os.cpus().length
  const workerPath = join(__dirname, 'worker.js')
  const results = new Array(numCores).fill(null)

  const createWorker = (n, index) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath)

      worker.on('message', (data) => {
        results[index] = { status: 'resolved', data }
        resolve()
      })

      worker.on('error', () => {
        results[index] = { status: 'error', data: null }
        resolve()
      })

      worker.on('exit', (code) => {
        if (code !== 0) {
          results[index] = { status: 'error', data: null }
          resolve()
        }
      })

      worker.postMessage(n)
    })
  }

  const promises = []
  for (let i = 0; i < numCores; i++) {
    const n = 10 + i
    promises.push(createWorker(n, i))
  }

  await Promise.all(promises)

  console.log(results)
}

await performCalculations()
