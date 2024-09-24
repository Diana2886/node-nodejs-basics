import { access, constants, rm } from 'node:fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const remove = async () => {
  const dir = join(__dirname, 'files')
  const filePath = join(dir, 'fileToRemove.txt')

  access(filePath, constants.F_OK, (err) => {
    if (err) {
      throw new Error('FS operation failed')
    } else {
      rm(filePath, (err) => {
        if (err) throw err
      })
    }
  })
}

await remove()
