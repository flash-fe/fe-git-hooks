const { program } = require('commander')
const versionUpdate = require('./features/versionUpdate')
const { pkgInfo } = require('./utils/pkgInfo')
const initHooks = require('./features/initHooks')
const initBranch = require('./features/initBranch')

// 查看版本
program.version(pkgInfo.version)

// 注入hooks
program
  .command('hooks')
  .option('-n --npmClient <client>', 'npm or yarn')
  .description('初始化前端项目工程hooks')
  .action(initHooks)

// 自动生成分支
program
  .command('branch')
  .description('创建规范化分支')
  .action(initBranch)

const initParser = () => {
  program.parse(process.argv)
}

versionUpdate().then(initParser).catch(err => {
  throw new Error(err)
})
