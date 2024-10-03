import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream } from 'fs'
// import { pipeline } from 'stream/promises'
import { stdout } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const filePath = join(dir, 'fileToRead.txt')

const read = async () => {
  const readStream = createReadStream(filePath)

  readStream.on('error', (err) => {
    console.error('Error reading file:', err.message)
  })

  readStream.pipe(stdout)

  readStream.on('end', () => {
    stdout.write('\n')
  })
}

await read()
