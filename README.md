# fe-git-hooks

#### 介绍
给前端的git项目一键注入hooks，包括lint-stage，commitlint，branchlint等。

#### 软件架构
软件架构说明
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

#### 安装教程

1. 如要注入hooks，确保当前项目为node项目(根目录有package.json)
2. 如果已经安装了yorkie或husky, 会先尝试卸载，再安装指定版本

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
