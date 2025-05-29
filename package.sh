#!/bin/bash

# 创建临时目录
mkdir -p temp

# 复制所有必要文件
cp manifest.json temp/
cp content.js temp/
cp panel.css temp/
cp icons/icon*.png temp/icons/

# 创建 ZIP 文件
cd temp
zip -r ../fiftyon.zip *
cd ..

# 清理临时目录
rm -rf temp

echo "打包完成：fiftyon.zip" 