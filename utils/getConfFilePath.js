// 拿不同的config文件，判断项目是否存在配置项
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = fileURLToPath(path.dirname(import.meta.url))
const require = createRequire(new URL(import.meta.url))

// 拿项目文件
export const getProjectConfFilePath = (fileNames = []) => {
  const targetFile = fileNames.find(filename => {
    return fs.existsSync(path.join('.', filename))
  })
  return targetFile
}

// 拿npm包自带的文件
export const getDefaultConfFilePath = (filename) => {
  const targetFile = path.resolve(__dirname, '..', 'confs', filename)
  if (fs.existsSync(targetFile)) {
    return targetFile
  }
  return null
}

// 获取npm包自带的configJSON
export const getDefaultConfigJSON = (filename) => {
  return require(path.resolve(__dirname, '..', 'confs', filename))
}
