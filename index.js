import versionUpdate from './features/versionUpdate.js'

const injector = () => {
  console.log('xx')
}

versionUpdate()
  .then(() => {
    console.log('xx')
  })
  .catch(err => {
    throw new Error(err)
  })

export default injector
