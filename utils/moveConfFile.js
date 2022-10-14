// 移动文件
const path = require('path')
const fs = require('fs')

const { getDefaultConfFilePath } = require('./getConfFilePath')

function moveConfFile (conFile) {
  const filePath = getDefaultConfFilePath(conFile)
  if (filePath) {
    const reader = fs.createReadStream(filePath)
    const writer = fs.createWriteStream(path.resolve('.', conFile))
    reader.pipe(writer)
  }
}

module.exports = moveConfFile
