// 封装require方法
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const require = createRequire(import.meta.url)

const pkgInfo = require(resolve(__dirname, '..', 'package.json'))

export default pkgInfo
