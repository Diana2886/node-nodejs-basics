import { access, constants, readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const filePath = join(dir, 'fileToRead.txt')
const errorMsg = 'FS operation failed'

const read = async () => {
  try {
    await access(filePath, constants.F_OK)
    const data = await readFile(filePath, 'utf-8')
    console.log(data)
  } catch (err) {
    throw new Error(errorMsg)
  }
}

await read()
