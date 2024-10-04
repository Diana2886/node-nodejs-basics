import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream } from 'fs'
import { pipeline } from 'stream/promises'
import { stdout } from 'process'
import * as os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const filePath = join(dir, 'fileToRead.txt')

const read = async () => {
  const readStream = createReadStream(filePath)

  try {
    await pipeline(readStream, stdout, { end: false })
    stdout.write(os.EOL)
  } catch (err) {
    console.error('Pipeline failed.', err)
  }
}

await read()
