import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { createGunzip } from 'zlib'
import { pipeline } from 'stream/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const filePath = join(dir, 'archive.gz')
const targetFilePath = join(dir, 'fileToCompress.txt')

const decompress = async () => {
  const readStream = createReadStream(filePath)
  const writeStream = createWriteStream(targetFilePath)
  const gunzip = createGunzip()

  try {
    const pipelineStream = await pipeline(readStream, gunzip, writeStream)
  } catch (err) {
    console.error('An error occurred:', err)
    process.exitCode = 1
  }
}

await decompress()
