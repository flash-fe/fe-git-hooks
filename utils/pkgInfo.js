// 封装require方法
const { resolve } = require('path')

// lib包的package.json
const pkgInfo = require(resolve(__dirname, '..', 'package.json'))

// 项目的package.json
const getProjectPackageInfo = () => {
  try {
    return require(resolve('.', 'package.json'))
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  pkgInfo,
  getProjectPackageInfo
}
