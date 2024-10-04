import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream } from 'fs'
import { createHash } from 'crypto'
import { stdout } from 'process'
import { pipeline } from 'stream/promises'
import * as os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const calculateHash = async () => {
  const dir = join(__dirname, 'files')
  const filePath = join(dir, 'fileToCalculateHashFor.txt')

  const readStream = createReadStream(filePath)
  const hash = createHash('sha256').setEncoding('hex')

  try {
    await pipeline(readStream, hash, stdout, { end: false })
    stdout.write(os.EOL)
  } catch (err) {
    console.error('Pipeline failed.', err.message)
  }
}

await calculateHash()
