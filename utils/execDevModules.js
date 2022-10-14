const cp = require('child_process')

// 执行单个命令
function execSync (command, args) {
  return cp.spawnSync(command, args, {
    stdio: 'inherit',
    shell: true
  })
}

function install (moduleName, npmClient = 'npm') {
  if (npmClient === 'yarn') {
    execSync('yarn', ['add', '-D', moduleName])
  } else {
    execSync('npm', ['i', '-d', '-D', moduleName])
  }
}

function uninstall (moduleName, npmClient = 'npm') {
  if (npmClient === 'yarn') {
    execSync('yarn', ['remove', moduleName])
  } else {
    execSync('npm', ['un', '-d', moduleName])
  }
}

function installDevDepModule (moduleName, npmClient) {
  if (moduleName instanceof Array) { // 对数组进行并行安装
    install(moduleName.join(' '), npmClient)
  } else {
    install(moduleName, npmClient)
  }
}

// 查看package.json，看项目是否存在当前依赖
function getModuleDeps (packageJSON, moduleName) {
  if (packageJSON) {
    const depModule = (packageJSON.dependencies || {})[moduleName]
    const devDepModule = (packageJSON.devDependencies || {})[moduleName]
    return depModule || devDepModule || null
  }
  return null
}

module.exports = {
  execSync,
  install,
  uninstall,
  installDevDepModule,
  getModuleDeps
}
