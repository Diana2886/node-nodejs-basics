import { argv } from 'node:process'

const parseArgs = () => {
  const args = argv.slice(2)
  const entries = []

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].slice(2)
    const value = args[i + 1]

    entries.push(`${propName} is ${value}`)
  }

  console.log(entries.join(', '))
}

parseArgs()
