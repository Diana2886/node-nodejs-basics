import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { access, constants, writeFile } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const create = async () => {
  const dir = join(__dirname, 'files')
  const filePath = join(dir, 'fresh.txt')
  const content = 'I am fresh and young'

  access(filePath, constants.F_OK, (err) => {
    if (err) {
      return
    }
    throw new Error('FS operation failed')
  })

  writeFile(filePath, content, (err) => {
    if (err) {
      throw err
    }
  })
}

await create()
