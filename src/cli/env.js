const parseEnv = () => {
  const env = process.env
  const prefix = 'RSS_'
  const rssVariables = Object.keys(env)
    .filter((item) => item.startsWith(prefix))
    .map((item) => `${item}=${env[item]}`)

  console.log(rssVariables.join('; '))
}

parseEnv()
