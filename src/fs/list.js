import { access, readdir } from 'node:fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const list = async () => {
  const dir = join(__dirname, 'files')

  readdir(dir, (err, files) => {
    if (err) {
      throw new Error('FS operation failed')
    }

    console.log(files)
  })
}

await list()
