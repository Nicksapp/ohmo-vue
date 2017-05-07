'use strict';

const tool = require('../tool')
const AV = require('leanengine')

// AV.Object.extend('className') 所需的参数 className 则表示对应的表名
// 声明一个类型
const Comment = AV.Object.extend('Comments')

let pub = {}

pub.commentsList = async(req, res) => {
    const articleId = req.params.articleId
    if (articleId === '') {
        res.status(500).send('id is empty')
    }
    console.log(articleId)
    const queryComments = () => {
        const targetArticle = AV.Object.createWithoutData('ContentList', articleId)
        console.log(targetArticle)
        const query = new AV.Query('Comments')
        query.ascending('createdAt')
        query.equalTo('pointerArticle', targetArticle)
        return query.find()
    }
    try {
        const data = await queryComments()
        console.log(data)
        if (data) {
            let arr = []

            for (let item of data) {
                let result = {}
                result.objectId = item.get('objectId')
                result.name = item.get('name')
                result.content = item.get('content')
                result.reply = item.get('reply')
                result.createdAt = item.get('createdAt').Format("yyyy-MM-dd hh:mm:ss")
                arr.push(result)
            }

            res.send(arr)
        } else {
            throw new Error('Can not find.');
        }
    } catch (error) {
        console.log(error)
    }
}

pub.submitComment = async(req, res) => {
    const name = req.body.name
    const content = req.body.content
    const reply = req.body.reply
    const articleId = req.body.articleId

    console.log(name)
    console.log(content)

    if (!name.trim() || !content.trim()) {
        res.status(500).send('昵称和内容不可为空')
    }

    const getTargetArticle = () => {
        const targetArticle = new AV.Query('ContentList')
        return targetArticle.get(articleId)
    }

    const saveComment = async() => {
        let comment = new Comment()
        comment.set('name', name)
        comment.set('content', content)
        comment.set('reply', reply)

        const targetArticle = await getTargetArticle()
        comment.set('pointerArticle', targetArticle)

        return comment.save()

    }

    try {
        const data = await saveComment()

        let result = {}
        result.objectId = data.get('objectId')
        result.name = data.get('name')
        result.content = data.get('content')
        result.reply = data.get('reply')
        result.createdAt = data.get('createdAt').Format("yyyy-MM-dd hh:mm:ss")
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log("提交失败:"+error)
        res.status(500).send(error)
    }
}

module.exports = pub