# fe-git-hooks

## 问题背景
在团队协作开发前端工程化项目时，往往需要指定一定的流程规范。
这个cli工具，可以帮助我们给前端的git项目一键注入hooks，快速完成对一个新项目或存量项目的流程规范注入。

注入完成后，项目将具备以下能力：

1. 可通过`npm run commit`进行规范化代码提交;
2. 可通过`npm run branch`创建规范化分支;
3. 提交代码时，会通过`lint-stage`对代码进行规范化校验(也可在注入完成后替换自己的eslint规范)；并通过`commitlint`对`commit-msg`进行提交规范校验;
4. push代码时，会通过`branchlint`对分支规范进行校验。
## cli命令执行流程
1. 使用`husky`注入git hooks;
2. 给项目添加`commitlint`, `commitlizen`, `branchlint`, `eslint`;
3. 使用`npe`给项目注入`scripts`脚本
4. 提供`branch`命令
5. 支持`npm`, `yarn`

默认注入的git hooks：
`pre-commit`：lint-staged
`pre-push`：branchlint
`commit-msg`：commitlint
`post-merge`：install

## Quick Start

### Init Hooks for project

If you use Npm

```bash
npx @jqxiong/fe-git-hooks hooks
```

If you use Yarn

```bash
npx @jqxiong/fe-git-hooks hooks -n yarn
```

### Create Branch
```bash
npm run branch
```

or 
```bash
yarn branch
```

### Create git commit
```bash
npm run commit
```

or
```bash
yarn commit
```

## 相关模块介绍

[lint-staged](https://github.com/okonet/lint-staged#readme), 可以对diff的代码做校验

[commitlint](https://commitlint.js.org/) 对commit-msg做规范校验

[commitizen](https://github.com/commitizen/cz-cli) 通过命令行生成问询式，规范化的commit-msg

[branchlint](https://github.com/shufo/branchlint#readme) 分支规范校验