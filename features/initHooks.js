import path from 'node:path'
import inquirer from 'inquirer'
import DotJson from 'dot-json'
import { execSync, getModuleDeps, install, installDevDepModule, uninstall } from '../utils/execDevModules.js'
import { getDefaultConfigJSON } from '../utils/getConfFilePath.js'
import { getProjectPackageInfo } from '../utils/pkgInfo.js'
import moveConfFile from '../utils/moveConfFile.js'
import initGitIfNeed from '../utils/initGitIfNeed.js'

let npmClient = 'npm'

// 需要安装的包
const modulesToInstall = [
  'husky@^7.0.4',
  'commitlint@^16.2.1',
  '@commitlint/config-conventional@^16.2.1',
  'commitizen@4.2.4',
  'cz-customizable@6.2.0',
  'branchlint@^0.0.2'
]

function getInjectorByContext () {
  return npmClient === 'yarn' ? npmClient : 'npx'
}

function prepareProjectJSON (projectInfo) {
  const defaultLintStage = getDefaultConfigJSON('lintstage')
  const newJSON = new DotJson(path.resolve('.', 'package.json'))

  // 设置lint-staged
  const lintStageConfig = projectInfo && projectInfo['lint-staged']
  !lintStageConfig && newJSON.set('lint-staged', defaultLintStage['lint-staged'])

  // 设置cz-config
  const currentConfig = projectInfo.config
  newJSON
    .set('config', {
      ...currentConfig,
      commitizen: {
        path: './node_modules/cz-customizable'
      },
      'cz-customizable': {
        config: '.cz-config.js'
      }
    })

  // yorkie or old husky hooks
  const existHooks = (projectInfo.husky || {}).hooks || projectInfo.gitHooks

  const injector = getInjectorByContext()
  const originHooks = {
    'pre-commit': `${injector} lint-staged`,
    'pre-push': `${injector} branchlint`,
    'commit-msg': `${injector} commitlint -e`,
    'post-merge': `${npmClient} install`
  }

  // hooks merge
  if (existHooks) {
    const oldHooks = { ...existHooks }
    for (const key in oldHooks) {
      const fixedHook = `${injector} ${oldHooks[key]}`
      if (originHooks[key] && fixedHook !== originHooks[key]) {
        originHooks[key] = `${originHooks[key]}\n${injector} ${oldHooks[key]}`
      }
    }
    // 迁移完后, 移除之前的配置
    newJSON.delete('husky')
    newJSON.delete('gitHooks')
  }

  // 保存json文件
  newJSON.save('auto', () => {
    prepareScripts(originHooks)
    console.log('package.json setted')
  })
}

// 安装必要的模块
function installModules (projectInfo) {
  // 安装is-ci
  install('is-ci', npmClient)

  const lintStage = getModuleDeps(projectInfo, 'lint-staged')
  const prettier = getModuleDeps(projectInfo, 'prettier')

  // 检查项目是否已经存在相关依赖
  !lintStage && modulesToInstall.push('lint-staged@^12.0.2')
  !prettier && modulesToInstall.push('prettier@^2.4.1')

  // uninstall
  const yorkie = getModuleDeps(projectInfo, 'yorkie')
  const husky = getModuleDeps(projectInfo, 'husky')
  yorkie && uninstall('yorkie', npmClient)
  husky && uninstall('husky', npmClient)

  // clear hooks
  execSync('git', ['config', '--unset', 'core.hooksPath'])
  installDevDepModule(modulesToInstall, npmClient)
}

// 预置script脚本
function prepareScripts (originHooks) {
  // prepare and install
  execSync('npx', ['npe', 'scripts.prepare', '"is-ci || husky install"'])
  // yarn commit
  execSync('npx', ['npe', 'scripts.commit', '"git cz"'])
  // yarn branch
  execSync('npx', ['npe', 'scripts.branch', '"npx @jqxiong/fe-git-hooks branch"'])
  // init hook
  execSync('npx', ['husky', 'install'])

  const huskyPath = path.resolve('.', '.husky')
  const localBinPath = path.resolve('.', 'node_modules', '.bin')

  // 设置husky hooks
  for (const key in originHooks) {
    execSync(
      path.join(localBinPath, 'husky'),
      [
        'set',
        path.join(huskyPath, key),
        `"${originHooks[key]}"`
      ]
    )
  }
}

// 下发默认配置文件
function dropDownConfigFiles () {
  moveConfFile('.branchlintrc')
  moveConfFile('.cz-config.js')
  moveConfFile('commitlint.config.js')
}

function injectHooks () {
  const projectInfo = getProjectPackageInfo()
  initGitIfNeed()
  installModules(projectInfo)
  prepareProjectJSON(projectInfo)
  dropDownConfigFiles()
}

/**
 * options.npmClient
 * npm | yarn 使用不同的包管理工具进行安装
 */
const projectHandler = (options) => {
  npmClient = options.npmClient || 'npm'
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'run',
      default: true,
      message: `将对项目的package.json进行修改并使用 ${npmClient} 注入hooks! do it?`
    }
  ])
    .then(({ run }) => {
      run && injectHooks()
    })
}

export default projectHandler
