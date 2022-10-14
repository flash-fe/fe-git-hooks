// 拿不同的config文件，判断项目是否存在配置项
const fs = require('fs')
const path = require('path')

// 拿项目文件
const getProjectConfFilePath = (fileNames = []) => {
  const targetFile = fileNames.find(filename => {
    return fs.existsSync(path.join('.', filename))
  })
  return targetFile
}

// 拿npm包自带的文件
const getDefaultConfFilePath = (filename) => {
  const targetFile = path.resolve(__dirname, '..', 'confs', filename)
  if (fs.existsSync(targetFile)) {
    return targetFile
  }
  return null
}

// 获取npm包自带的configJSON
const getDefaultConfigJSON = (filename) => {
  return require(path.resolve(__dirname, '..', 'confs', filename))
}

module.exports = {
  getProjectConfFilePath,
  getDefaultConfFilePath,
  getDefaultConfigJSON
}
