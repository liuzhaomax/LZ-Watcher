# LZ-WATCHER 部署指南

> LZ-WATCHER Platform 缺少安装序列号，标记硬盘只能安装一次（删除项目则可以再装），启动一个相同服务会关闭另一个，出库三人加密，购买节点

<br>

## 部署步骤

1. 打包前端 【取RC版本出库可忽略】
	> cmd 中 cd 到项目目录
	>
	> npm run build_client

2. 打包后端 【取RC版本出库可忽略】
	> cmd 中 cd 到项目目录
	>
	> npm run build_server

3. 修改package.json中的启动文件路径 【取RC版本出库可忽略】
	> 打开package.json
	>
	> 搜索 scripts
	>
	> 找到 scripts 字段中的 start
	>
	> 使用下行替换整个 start 行，注意保留引号和结尾逗号，所有标点为英文标点
	>
	> "start": "babel-node ./dist/app.js --presets env",

6. 手动删除如下文件目录 【取RC版本出库可忽略】
	> bin
	>
	> build
	>
	> lib
	>
	> src
	>
	> test

5. 编写 README.md 文件
	> 只保留 Project Version Update Description 文字区块内容，删除其他所有文字区块全部内容
	>
	> 按照 Project Version Update Description 模板内容，填写出库信息
	>
	> 有升级、更新、或配置处理等操作，需按照 Project Version Update Description 最下部模板，添加版本更新说明

6. 新建安装包文件夹
	> 重命名根目录为 LZ-WATCHER
	>
	> 在某目录下，新建安装包文件夹 LZ-WATCHER-setup
	>
	> 将 node、 MongoDB 数据库及数据库信息与 LZ-WATCHER 放入 LZ-WATCHER-setup
	>
	> 将 setup.bat 放入 LZ-WATCHER-setup
	>
	> 压缩为 LZ-WATCHER-setup.zip

7. 到目的地计算机上解压，运行 setup.bat 按提示输入相关信息

8. 配置mongodb和node服务？？？？

<br>

## 部署 Q&A

+ 如何反复使用安装包安装？
+ 如何查看端口占用情况？如何修改项目服务端口？
+ 启动报错，报错内容含有 node_modules，怎么办？

<br>

## Build Setup

```
### install dependencies
	npm install

### serve at localhost:3000
	npm start

### serve with hot reload for BE at localhost:3000
	npm run server

### serve with hot reload for FE at localhost:8080
	npm run client

### build for FE of production with minification
	npm run build_client

### build for BE of production with minification
	npm run build_server

### build for production and view the bundle analyzer report
	npm run build --report

### run unit tests
	npm run unit

### run e2e tests
	npm run e2e

### run all tests
	npm test

```
<br>

## 产品版本更新说明

<br>更新日期 : 2018-06-24
<br>修正版本 : LZ-WATCHER-v1.0.0.26536-Alpha
> 1. 完成所有白盒测试前

<br>更新日期 : 2018-06-25
<br>修正版本 : LZ-WATCHER-v1.0.0.39653-Beta
> 1. 完成所有白盒测试

<br>更新日期 : 2018-06-26
<br>修正版本 : LZ-WATCHER-v1.0.0.63468-RC
> 1. 完成所有功能
> 2. 增加了XX功能

<br>更新日期 : 2018-06-27
<br>修正版本 : LZ-WATCHER-v1.0.0.98564-GA
> 1. 完成系统测试
> 2. 修改了yyy的bug

<br>

## 产品ID信息说明

<br>产品编号：3位
<br>定制标记：1位
<br>国家地区：4位
<br>省市地区：省2位，市2位
<br>使用单位：4位
<br>
<br>示例
> 0010-0000-0303-0001
>
> + 产品：供暖智能监控系统
> + 定制：无
> + 国家：中国
> + 省市：天津，天津市
> + 单位：XXXX单位

### ID信息字典
1、产品编号
> + 001--供暖智能监控系统

2、定制标记
> + 0--无定制开发
> + 1--有定制开发

3、国家地区
> + 0000--中国大陆地区
> + 0001--中国香港地区
> + 0002--中国澳门地区
> + 0003--中国台湾地区
> + 0004--巴基斯坦

4、省市地区
> + 01--北京
>     - 01--北京
> + 02--上海
>     - 01--上海
> + 03--天津
>     - 01--天津
> + 04--重庆
>     - 01--重庆
> + 05--黑龙江
>     - 01--哈尔滨
>     - 02--齐齐哈尔

5、学校学院
> + 0001--XXXX单位
