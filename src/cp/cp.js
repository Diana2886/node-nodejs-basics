import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const spawnChildProcess = async (args) => {
  const dir = join(__dirname, 'files')
  const scriptPath = join(dir, 'script.js')

  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  })

  process.stdin.pipe(child.stdin)
  child.stdout.pipe(process.stdout)

  child.on('error', (error) => {
    console.error('Failed to spawn child process:', error)
  })

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`)
  })
}

spawnChildProcess(['arg1', 'arg2'])
