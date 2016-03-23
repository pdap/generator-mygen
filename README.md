## Installation

首先安装  [Yeoman](http://yeoman.io) 和 generator-mygen 用 [npm](https://www.npmjs.com/) (假设你已经安了 [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-mygen
```

然后用生成器生成项目骨架:

```bash
yo mygen
```
## 项目相关命令
 * yo mygen -h 查看生成器所有配置
 * grunt live  若自动刷新服务127.0.0.1:8089 未能启动，则检查Gruntfile.js 中web服务器根目录位置
 * grunt dist  部署项目代码

## 有关yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).
 ##  版本更新

 ### v1.2.5
 * js css html img 的watch 分离，js有变化后只运行js 的task 然后刷新浏览器，为后续增加css,html的特殊task做准备

 ### v1.2.6 
 * 增加open功能,http服务启动之后自动打开项目目录
 * 增加proxy 代理功能，将本地路径比如(127.0.0.1:8089/data/poll/--->http://poll.chinaso365.com/api_poll.php)下的请求代理到后端主机，解决接口调试跨域问题。

 ### v1.2.7
 * 更新说明文档

 ### v1.2.8
 * 说明文档版本更新排版

 ### v1.2.9
 * 优化css压缩程序配置参数以保留ie6/ie7 css hack例如`_background`|`*background`等等 
 