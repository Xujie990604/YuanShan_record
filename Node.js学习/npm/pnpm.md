# pnpm

## 使用

pnpm install 包
pnpm i 包
pnpm add 包    // -S  默认写入dependencies
pnpm add -D    // -D devDependencies
pnpm add -g    // 全局安装

## 移除

pnpm remove 包                            //移除包
pnpm remove 包 --global                   //移除全局包

## 更新

pnpm up                //更新所有依赖项
pnpm upgrade 包        //更新包
pnpm upgrade 包 --global   //更新全局包
