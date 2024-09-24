import fs, { access, constants } from 'node:fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rename = async () => {
  const dir = join(__dirname, 'files')
  const filePath = join(dir, 'wrongFilename.txt')
  const targetFilePath = join(dir, 'properFilename.md')

  access(filePath, constants.F_OK, (err) => {
    if (err) {
      throw new Error('FS operation failed')
    }
    access(targetFilePath, constants.F_OK, (err) => {
      if (err) {
        fs.rename(filePath, targetFilePath, (err) => {
          if (err) throw err
        })
      } else {
        throw new Error('FS operation failed')
      }
    })
  })
}

await rename()
