import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { access, constants, writeFile } from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const filePath = join(dir, 'fresh.txt')
const content = 'I am fresh and young'
const errorMsg = 'FS operation failed'

const create = async () => {
  try {
    await access(filePath, constants.W_OK)
    throw new Error(errorMsg)
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        await writeFile(filePath, content)
      } catch (err) {
        console.error(err)
      }
    } else {
      console.error(err)
    }
  }
}

await create()
