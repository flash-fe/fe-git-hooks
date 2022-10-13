import fs from 'fs'
import cp from 'child_process'
import inquirer from 'inquirer'
import initGitIfNeed from '../utils/initGitIfNeed.js'
import { getDefaultConfFilePath, getProjectConfFilePath } from '../utils/getConfFilePath.js'

const branchConfs = [
  '.branchlintrc',
  '.branchlintrc.json'
]

// 初始化分支命令
const initBranch = () => {
  /**
   * 尝试读取branchlint配置文件, 根据配置文件中的branch生成问询配置项
   */
  const projectConfiFile = getProjectConfFilePath(branchConfs)
  const defaultConfFile = getDefaultConfFilePath(branchConfs[0])
  const targetConfFile = projectConfiFile || defaultConfFile
  try {
    const branchLints = fs.readFileSync(targetConfFile, {
      encoding: 'utf8'
    })
    const branchConfigInfo = JSON.parse(branchLints)
    initInquirer(branchConfigInfo)
  } catch (err) {
    throw new Error(err)
  }
}

const initInquirer = (configInfo) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'branchType',
      message: '选择分支类型',
      loop: false,
      choices: configInfo.prefixes
    },
    {
      type: 'input',
      name: 'branchInfo',
      message: '分支工作内容(etc: "dev-foo")',
      validate: function (val) {
        const done = this.async()
        done(null, val.trim() !== '')
      }
    },
    {
      type: 'confirm',
      name: 'useCurrentTime',
      message: '是否拼接当前时间？',
      default: true
    }
  ])
    .then((rst) => branchHandler(rst, configInfo))
}

const addZero = (num) => {
  return num > 9 ? `${num}` : `0${num}`
}

const branchHandler = (options, configInfo) => {
  const { branchType, branchInfo, useCurrentTime } = options
  const prefix = branchType + (configInfo.separator || '/')
  let branchName = [branchInfo] // 按标准添加分割线
  if (useCurrentTime) {
    const curDate = new Date()
    const dateStr = `${curDate.getFullYear()}${addZero(curDate.getMonth() + 1)}${addZero(curDate.getDate())}`
    branchName.push(`${dateStr}`)
  }
  branchName = prefix + branchName.join('-')

  inquirer.prompt([
    {
      type: 'confirm',
      name: 'sure',
      message: `分支名为: ${branchName}, 确认创建?`,
      default: true
    }
  ])
    .then(({ sure }) => {
      if (sure) { // 创建新分支
        initGitIfNeed()
        cp.spawn('git', ['checkout', '-b', branchName], {
          stdio: 'inherit',
          shell: true
        })
      }
    })
}

export default initBranch
