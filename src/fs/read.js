import { access, constants, readFile } from 'node:fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const read = async () => {
  const dir = join(__dirname, 'files')
  const filePath = join(dir, 'fileToRead.txt')

  access(filePath, constants.F_OK, (err) => {
    if (err) {
      throw new Error('FS operation failed')
    } else {
      readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err
        console.log(data)
      })
    }
  })
}

await read()
