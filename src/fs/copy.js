import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { access, constants, mkdir, readdir, copyFile } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const copy = async () => {
  const dir = join(__dirname, 'files')
  const targetDir = join(__dirname, 'files_copy')

  readdir(dir, (err, files) => {
    if (err) {
      throw new Error('FS operation failed')
    }

    mkdir(targetDir, { recursive: false }, (err) => {
      if (err) {
        throw new Error('FS operation failed')
      }
    })

    files.forEach((file) => {
      const filePath = join(dir, file)
      const targetFilePath = join(targetDir, file)

      const callback = (err) => {
        if (err) throw err
      }

      copyFile(filePath, targetFilePath, callback)
    })
  })
}

await copy()
