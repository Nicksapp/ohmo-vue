/**
 * 前后端路由接口配置中心
 * 所有 API 的路由
 */
'use strict';

const router = require('express').Router();

// 添加路由模块
const content = require('./modules/content.js');


// 博客文章列表

router.get('/hello', content.hello);
router.get('/content-list', content.contentList);
router.get('/article/:id', content.article);


module.exports = router;
