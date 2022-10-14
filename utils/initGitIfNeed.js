const { join } = require('path')
const { existsSync } = require('fs')
const { spawnSync } = require('child_process')

const gitConfigPath = join('.', '.git')

// 执行git相关操作时，检测是否有git项目，无则初始化git
const initGitIfNeed = () => {
  if (!existsSync(gitConfigPath)) {
    console.log('init git project')
    spawnSync('git', ['init'], {
      stdio: 'inherit',
      shell: true
    })
  }
}

module.exports = initGitIfNeed
