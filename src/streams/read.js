import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream } from 'fs'
import { stdout } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const read = async () => {
  const dir = join(__dirname, 'files')
  const filePath = join(dir, 'fileToRead.txt')

  const readStream = createReadStream(filePath)
  readStream.pipe(stdout)
}

await read()
