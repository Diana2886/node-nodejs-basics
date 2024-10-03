import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { access, constants, mkdir, readdir, copyFile } from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const targetDir = join(__dirname, 'files_copy')
const errorMsg = 'FS operation failed'

const copy = async () => {
  try {
    const files = await readdir(dir)

    await mkdir(targetDir, { recursive: false })

    files.forEach(async (file) => {
      const filePath = join(dir, file)
      const targetFilePath = join(targetDir, file)

      await copyFile(filePath, targetFilePath)
    })
  } catch (err) {
    throw new Error(errorMsg)
  }
}

await copy()
