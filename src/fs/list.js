import { access, readdir } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const errorMsg = 'FS operation failed'

const list = async () => {
  try {
    const files = await readdir(dir)
    console.log(files)
  } catch (err) {
    throw new Error(errorMsg)
  }
}

await list()
