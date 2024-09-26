import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream } from 'fs'
import { createHash } from 'crypto'
import { stdout } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const calculateHash = async () => {
  const dir = join(__dirname, 'files')
  const filePath = join(dir, 'fileToCalculateHashFor.txt')

  const readStream = createReadStream(filePath)
  const hash = createHash('sha256')

  readStream.pipe(hash).setEncoding('hex').pipe(stdout)
}

await calculateHash()
