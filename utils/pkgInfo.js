// 封装require方法
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const require = createRequire(import.meta.url)

// lib包的package.json
export const pkgInfo = require(resolve(__dirname, '..', 'package.json'))

// 项目的package.json
export const getProjectPackageInfo = () => {
  try {
    return require(resolve('.', 'package.json'))
  } catch (err) {
    throw new Error(err)
  }
}
