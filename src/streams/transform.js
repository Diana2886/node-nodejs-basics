import { stdin, stdout } from 'process'
import { Transform, pipeline } from 'stream'

const transform = async () => {
  const transformStream = new Transform({
    transform(chunk, _, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('')
      callback(null, reversedChunk + '\n')
    },
  })

  pipeline(stdin, transformStream, stdout, (err) => {
    if (err) {
      console.error('Pipeline failed.', err)
    }
  })
}

await transform()
