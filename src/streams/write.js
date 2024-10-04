import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createWriteStream } from 'fs'
import { stdin } from 'process'
import { pipeline } from 'stream/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const filePath = join(dir, 'fileToWrite.txt')

const write = async () => {
  const writeStream = createWriteStream(filePath)

  try {
    await pipeline(stdin, writeStream)
  } catch (err) {
    console.error('Pipeline failed.', err)
  }
}

await write()
