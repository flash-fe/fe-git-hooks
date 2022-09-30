import { getDefaultConfigJSON } from '../utils/getConfFilePath.js';
// 给项目注入git hooks
const projectHandler = (options) => {
  console.log(options);
  const defaultLintStage = getDefaultConfigJSON('lintstage');
  console.log(defaultLintStage);
}

export default projectHandler
