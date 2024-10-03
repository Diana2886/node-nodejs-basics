import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'
import { pipeline } from 'stream/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const filePath = join(dir, 'fileToCompress.txt')
const targetFilePath = join(dir, 'archive.gz')

const compress = async () => {
  const readStream = createReadStream(filePath)
  const writeStream = createWriteStream(targetFilePath)
  const gzip = createGzip()

  try {
    const pipelineStream = await pipeline(readStream, gzip, writeStream)
  } catch (err) {
    console.error('An error occurred:', err)
    process.exitCode = 1
  }
}

await compress()
