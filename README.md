# [zpinyin](https://www.npmjs.com/package/zpinyin)
<!-- [![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/The-End-Hero/search-util) -->
<!-- [![license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com//The-End-Hero/search-util/blob/master/LICENSE) -->
<!-- [![Build Status](https://travis-ci.org/xiping.wang/search-util.svg?branch=master)](https://travis-ci.org/xiping.wang/search-util) -->
[![npm](https://img.shields.io/badge/npm-1.1.4-orange.svg)](https://www.npmjs.com/package/zpinyin)

## 前言

zpinyin轻量级前端拼音模糊检索插件  
使用原数据与索引数据区分模式，原数据大小不会对检索查询速度造成影响。  
检索索引一次建立后续直接使用，大幅优化检索效率。

- - -

### 概述
该插件收录常用汉字6763个  
支持检索模式（当前版本不支持单独配置默认全部开启）
+ 首字母查询
+ 常规查询
+ 不区分大小写的查询
+ 全拼查询  

[在线演示：http://zhhcho.com:3012/](http://zhhcho.com:3012/)



## 使用者指南
通过npm下载安装代码

```bash
npm install --save zpinyin
```

示例

目前版本仅支持原数据为对象数组和指定对象对应key来进行检索

```javascript
//导入拼音插件
import zpinyin from 'zpinyin';

/*初始化
new zpinyin(data,key)
@param data 源数据 [{'name':'张三','age':'22','workCode':'YQ1000'},{'name':'李四','age':'22','workCode':'YQ1000'}]
@param key 能被检索的key值  数组类型 如 检索姓名 ['name']
*/
var data = [{'name':'张三','age':'22','workCode':'YQ1200'},{'name':'李四','age':'22','workCode':'YQ1000'}]
var userQuery = new zpinyin(data,['name','workCode']);

var test1 = userQuery.query('li') // {'name':'李四','age':'22','workCode':'YQ1000'}
var test1 = userQuery.query('ls') // {'name':'李四','age':'22','workCode':'YQ1000'}
var test1 = userQuery.query('shi') // {'name':'李四','age':'22','workCode':'YQ1000'}
var test1 = userQuery.query('lishi') // {'name':'李四','age':'22','workCode':'YQ1000'}
var test1 = userQuery.query('100') // {'name':'李四','age':'22','workCode':'YQ1000'}
var test1 = userQuery.query('yq') // {'name':'李四','age':'22','workCode':'YQ1000'},{'name':'张三','age':'22','workCode':'YQ1200'}

//可以同时存在多个
var data2 = [{'name':'王五','age':'22','workCode':'YQ1200'},{'name':'钱六','age':'22','workCode':'YQ1000'}]
var userQuery2 = new zpinyin(data2,['name','workCode']);

//userQuery2
var test2 = userQuery.query('ww') // {'name':'王五','age':'22','workCode':'YQ1200'}
//userQuery
var test1 = userQuery.query('ls') // {'name':'李四','age':'22','workCode':'YQ1000'}


```

## 版本
|版本号|更新内容|备注|
|:-|:-:|-:|
|1.1.4|添加在线演示|-|
|1.1.0|添加自述文件，删除多余console|-|


