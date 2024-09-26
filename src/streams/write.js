import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createWriteStream } from 'fs'
import { stdin } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const write = async () => {
  const dir = join(__dirname, 'files')
  const filePath = join(dir, 'fileToWrite.txt')

  const writeStream = createWriteStream(filePath)
  stdin.pipe(writeStream)
}

await write()
