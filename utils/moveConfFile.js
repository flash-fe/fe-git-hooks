// 移动文件
import path from 'node:path'
import fs from 'node:fs'

import { getDefaultConfFilePath } from './getConfFilePath.js'

function moveConfFile (conFile) {
  const filePath = getDefaultConfFilePath(conFile)
  if (filePath) {
    const reader = fs.createReadStream(filePath)
    const writer = fs.createWriteStream(path.resolve('.', conFile))
    reader.pipe(writer)
  }
}

export default moveConfFile
