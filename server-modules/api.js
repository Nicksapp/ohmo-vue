/**
 * 前后端路由接口配置中心
 * 所有 API 的路由
 */
'use strict';

const router = require('express').Router();

// 添加路由模块
const content = require('./modules/content');
const comments = require('./modules/comment');
const tags = require('./modules/tags');
const user = require('./modules/user');

// 路由设置
router.get('/hello', content.hello);
router.get('/content-list', content.contentList);
router.get('/article/:id', content.article);
router.post('/article/submitArticle', content.submitArticle);

router.get('/comments/:articleId', comments.commentsList);
router.post('/comments/submitComment', comments.submitComment);

router.get('/tags', tags.tags);
router.get('/tags/:tagId', tags.tagList);

router.post('/login', user.login);
router.post('/logout', user.logout);
module.exports = router;
