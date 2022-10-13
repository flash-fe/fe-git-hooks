import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

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

export default initGitIfNeed
