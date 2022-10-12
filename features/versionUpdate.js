import updateNotifier from 'update-notifier'
import chalk from 'chalk'
import { pkgInfo } from '../utils/pkgInfo.js'

const notifier = updateNotifier({
  pkg: pkgInfo,
  updateCheckInterval: 300
})

function updateCheck () {
  return new Promise((resolve) => {
    if (notifier.update) {
      console.log(
        `New version available: ${chalk.cyan(
          notifier.update.latest
        )}, it's recommended that you update before using.`
      )

      notifier.notify({
        message: `Update available ${chalk.grey('{currentVersion}')} -> ${chalk.green('{latestVersion}')}
Run ${chalk.cyan('npm i -g {packageName}')} to update`,
        defer: false
      })

      resolve()
    } else {
      resolve()
    }
  })
}

export default updateCheck
