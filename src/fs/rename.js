import fs, { access, constants } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const filePath = join(dir, 'wrongFilename.txt')
const targetFilePath = join(dir, 'properFilename.md')
const errorMsg = 'FS operation failed'

const rename = async () => {
  try {
    await access(filePath, constants.F_OK)

    try {
      await access(targetFilePath, constants.F_OK)
      throw new Error(errorMsg)
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.rename(filePath, targetFilePath)
      } else {
        throw err
      }
    }
  } catch (err) {
    throw new Error(errorMsg)
  }
}

await rename()
