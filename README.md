# Vue.js+LeanCloud web端轻博客应用 -> Oh-Mo

## 项目简介 [在线预览](http://nickj.leanapp.cn/)

[开发指南](https://github.com/Nicksapp/ohmo-vue/blob/master/开发指南.md)

这是一个完全由 Vue 全家桶来实现的轻博客应用，充分应用了Vuex对所有状态数据进行管理并优化整体结构，后端应用Node.js开发的全栈应用，在业余时间持续在GitHub上迭代版本并不断完善功能，由LeanCloud提供数据存储服务(云服务)。

### Version 4.0
> 完整4.0版本，本次更新及优化点主要新增管理员权限，增加了登录功能，现在只有管理员才能发布文章了，为后期后台管理开发做铺垫.
> 增加了分页的功能，对 api 做了新改动，现在每页将显示10篇最新的文章.
> markdown 采用 Github 样式渲染，再也不用担心页面样式被嫌弃了！
> 修复若干前期遗留问题。。

### Version 3.0
> 初步完整3.0版本，完善前端PC端与移动端样式，包括全站响应式设计，以及文章markdown文章渲染，代码HightLight等，增加评论与回复功能，完善自建api，文章发布于优雅的Markdown编辑器。

## 技术栈

**前端**

* Vue.js 2.0
* Vuex 状态管理
* Vue-router 前端路由
* Axios 网络请求
* fastclick 解决移动端延迟问题
* Element-UI

**后端**

* Node.js 服务端
* Express 应用框架
* LeanCloud 数据存储

**组件**
- [x] Markdown渲染
- [x] 响应式页面
- [x] 文章评论/回复
- [x] 标签分类
- [x] 悬浮导航
- [x] 文章发布
- [x] RESTful API接口

```javascript
文件整体结构
.
├── public          // LeanEngine Web 前端发布目录，HTML\CSS\JavaScript 构建后将放置于此
├── server-modules  // 服务器端代码模块目录
│    ├── modules	// 后台数据模块        
│    ├── app            // LeanEngine 服务端代码主入口
│    ├── api	        // API 接口路由配置
│    └── tool            // 工具方法
├── front-end            // Web 前端项目目录
│    ├── build          // 前端开发环境
│    ├── config         // 配置文件
│    └── src            // 源码目录
└── server       // LeanEngine 的环境配置
```

## 版本迭代
**Version 1.0** - 初始化1.0版本，仅完成前后端api连接过程，发布和样式还未完成

**Version 2.0** - 初步完整2.0版本，完善前端PC端与移动端样式，包括全站响应式设计，以及文章markdown文章渲染，代码HightLight等，增加评论与回复功能。

**Version 3.0** - 增加Post发布文章功能，借用Vue数据双向绑定的特点实时显示Markdown编辑后的效果。下个版本将继续完善发布功能，并添加已有文章的管理功能。

**Version 4.0** - 完整4.0版本，本次更新及优化点主要新增管理员权限,分页,Github 样式渲染,修复若干前期遗留问题。。

## 开发

> 项目中充分结合了LeanCloud的优势，可也让我们快速的利用JavaScript构建出可以在线应用的Web应用，主要内容可参考源代码，下面简单讲解一下每个开发中注意的点。

### LeanCloud 配置

推荐用`Vue-Cli`初始化项目后，`npm i leanengine` 安装LeanCloud核心依赖，之后只要在项目根目录下`touch server.js`,主要操作详见[LeanCloud官方文档]()

```javascript
'use strict';
var AV = require('leanengine');
AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});
var app = require('./server-modules/app');
// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
  });
});
```

### 部署上线

安装leancloud部署工具`brew install lean-cli` ，具体见[LeanCloud网站托管](https://leancloud.cn/docs/leanengine_cli.html)

### 后台Api搭建

有了数据存储的支持，就可以直接发挥`Express`的作用，定义文章等模块的数据模型并定义数据接口。可以用`lean up `启动后端Node.js服务器，开启接口。

```javascript
const router = require('express').Router();
// 添加路由模块
const content = require('./modules/content'); // 博客数据模型
// 路由设置
router.get('/content-list', content.contentList); // GET博客列表
router.get('/article/:id', content.article);// GET博客详情
router.post('/article/submitArticle', content.submitArticle);// POST发布博客
```

### Vuex

明确各个需管理的数据模块，定义各自的`state`与`mutations`，前端与后端的交互动作由`actions`处理，之后可在各个页面`dispatch`我们的数据。

```javascript
// vuex/store.js
export default new Vuex.Store({
  strict: debug,
  actions,
  modules: {
    contentList,
    article,
    commentsList,
    tags,
    tagContentList
  }
})
// vuex/actions.js
getContentList ({ commit }) {
    commit(types.REQUEST_CONTENT_LIST)
    axios.get(API_ROOT + 'api/content-list')
      .then(response => {
        commit(types.GET_CONTENT_LIST, response.data)
        console.log('getContentList success');
      })
      .catch(error => {
        commit(types.GET_CONTENT_LIST_FAILURE, error)
      })
  }
```

### Vue-Router

定义前端路由，优化页面跳转速度。

```javascript
export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Index',
        component: function(resolve) {
            require(['@/views/Index'], resolve)
        }
    }, {
        path: '/article/:id',
        name: 'article',
        component: function(resolve) {
            require(['@/views/Article'], resolve)
        }
    }
    }],
    scrollBehavior(to, from, savedPosition) {
        // 路由切换时滚动到顶部
        if (savedPosition) {
            return savedPosition
        } else {
            return {  y: 0 }
        }
    }
})
```

### FastClick

消除移动端上的双击延时

```javascript
fastClick.attach(document.body) // 消除移动端双击延时
```

## 运行截图

![](https://ws4.sinaimg.cn/large/006tKfTcly1fluga07h6aj31kw0wl46y.jpg)

![](https://ws2.sinaimg.cn/large/006tKfTcly1fluga7cupej31kw0wnn0u.jpg)

![](https://ws1.sinaimg.cn/large/006tKfTcly1flugaexqjmj31kw0wn0wh.jpg)

![](https://ws2.sinaimg.cn/large/006tKfTcly1flugall9f2j31kw0wnwnu.jpg)

## 本地预览步骤
```javascript
// clone 项目源代码
$ git clone xxxxxxxxxxxxxxx

// 安装服务端相关依赖
$ cd ohmo
$ npm install

// 启动服务端,默认地址 http://localhost:3000(需要提前注册一个leancloud账号)
$ lean up

// 安装前端相关依赖
$ cd front-end
$ npm install

// 启动前端项目,默认地址 http://localhost:8080
$ npm run dev
```

## 构建部署

```javascript
// 在front-end目录下  构建前端文件至 /public 文件夹
$ npm run build

// 根目录下 leancloud 命令行部署 / 通过 github 部署
$ lean deploy / lean deploy -g
```

## 服务上线指南

首先先提下提交我们的代码上线的过程，线上服务器只需要我们最后的 server 文件以及构建后的前端文件，即根目录下的 public 文件夹下的东东。即在完成每次的开发内容后，记得在 `frond-end` 前端项目中，执行 `npm run build` 代码构建。

可以注意到根目录下的 `server.js` 文件，将代码 push 上去后，会自动执行 `node server.js` 启动 `node` 服务器，配置的地方见 `package.json` 里面的 scripts 部分，当然你也可以根据自己喜欢的方式进行定义。

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
```

再看看` server.js` 需要做些什么，

```js
'use strict';
var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./server-modules/app');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error("Caught exception:", err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
  });
});
```

其实就是一些启动 node 服务器以及连接 leancloud 的一些验证信息等各种配置，如果出现异常将错误信息打印等工作。

最后说的就是部署的工作，由于是用的免费测试应用，所以只有一个生产环境，不用管环境的问题。我们使用的部署方式使用官方提供的一套命令行工具即可完成，安装方式：(执行下面的命令即可，需要提前装好 brew)

```js
brew install lean-cli
```
装好后，如果在命令行执行 `lean`，后可以看到使用说明，说明已经安装成功了，接着进行下一步。在项目根目录下，登录自己的 leancloud 账号，并完成当前项目与线上创建应用的绑定。如果项目是第一次绑定，请先执行 `lean init` 初始化。

```js
lean login
// 输入邮箱 & 密码
// 登录成功后
lean init
// 可以看到已经创建的应用，选择即可完成绑定,已绑定可键入 lean switch 切换应用
```

绑定好我们的应用后,为了防止部署后出现问题，可以先执行 `lean up` 尝试在本地启动服务，检查应用是否启动正常。如果有报错，请先检查是否本地端口被占用，换一个即可。

如果前面一切顺利，在根目录下执行
 
```js
lean deploy
```
即完成可对代码进行线上部署。由于是免费的测试服务器，所以会出现时不时的服务无法访问的情况，且一段时间不访问，也会自动进入休眠状态，即再次启动时需要等待服务被唤醒，时间较长。

部署完成后，访问我们线上填写的 url 即可在线看到我们的应用。

