import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { access, constants, mkdir, readdir, copyFile, stat } from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dir = join(__dirname, 'files')
const targetDir = join(__dirname, 'files_copy')
const errorMsg = 'FS operation failed'

const copyRecursive = async (src, dest) => {
  const items = await readdir(src)

  for (const item of items) {
    const srcPath = join(src, item)
    const destPath = join(dest, item)
    const itemStat = await stat(srcPath)

    if (itemStat.isDirectory()) {
      await mkdir(destPath)
      await copyRecursive(srcPath, destPath)
    } else {
      await copyFile(srcPath, destPath)
    }
  }
}

const copy = async () => {
  try {
    await access(dir, constants.F_OK)

    try {
      await access(targetDir, constants.F_OK)
      throw new Error(errorMsg)
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw new Error(errorMsg)
      }
    }

    await mkdir(targetDir)
    await copyRecursive(dir, targetDir)
  } catch (err) {
    throw new Error(errorMsg)
  }
}

await copy()
