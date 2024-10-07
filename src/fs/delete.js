import { access, constants, rm } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const filePath = join(dir, 'fileToRemove.txt')
const errorMsg = 'FS operation failed'

const remove = async () => {
  try {
    await access(filePath, constants.F_OK)
    await rm(filePath)
  } catch (err) {
    throw new Error(errorMsg)
  }
}

await remove()
