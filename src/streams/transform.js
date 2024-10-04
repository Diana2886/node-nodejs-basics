import { stdin, stdout } from 'process'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'
import * as os from 'os'

const transform = async () => {
  const transformStream = new Transform({
    transform(chunk, _, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('')
      callback(null, reversedChunk + os.EOL)
    },
  })

  try {
    await pipeline(stdin, transformStream, stdout)
  } catch (err) {
    console.error('Pipeline failed.', err)
  }
}

await transform()
