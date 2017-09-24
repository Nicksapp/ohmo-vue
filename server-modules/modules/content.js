/**
 * LeanCloud Class Content
 */

'use strict';

const tool = require('../tool');
const AV = require('leanengine');

// 对Date的拓展，将Date转化为制定个事的String
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d:m:s.S") ==> 2006-7-2 8:9:4.18

Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) :
                (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

}

let Content = {};

Content.hello = (req, res) => {
    res.send({
        hello: "It works!"
    });
};

// 获取文章列表
Content.contentList = async(req, res) => {
    const queryContentList = () => {
        const query = new AV.Query('ContentList') // 创建查询实例
        query.descending('createdAt') // 创建时间->降序查询
        return query.find()
    }
    try {
        const data = await queryContentList()

        if (data) {
            let arr = []
            for (let item of data) {
                let result = {}
                result.objectId = item.get('objectId')
                result.title = item.get('title')
                result.abstract = item.get('abstract')
                result.author = item.get('author')
                result.createdAt = item.get('createdAt').Format("yyyy-MM-dd hh:mm:ss")
                arr.push(result)
            }
            let final_result = {}
            final_result.listLength = arr.length
            final_result.data = arr
            res.send(final_result)
        } else {
            throw new Error('Can\'t find the data-Content')
        }
    } catch (error) {
        console.log(error)
    }
}

// 获取10篇文章
Content.getTenContent = async(req, res) => {
    const page = req.params.page || 1

    const queryTenContent = (page) => {
        const query = new AV.Query('ContentList') // 创建查询实例
        query.descending('createdAt') // 创建时间->降序查询
        query.skip((page - 1)*10) // 跳过指定项
        query.limit(10) // 限制返回项数量
        return query.find();
    }

    try {
        const data = await queryTenContent(page)

        if (data) {
            let arr = []
            for (let item of data) {
                let result = {}
                result.objectId = item.get('objectId')
                result.title = item.get('title')
                result.abstract = item.get('abstract')
                result.author = item.get('author')
                result.createdAt = item.get('createdAt').Format("yyyy-MM-dd hh:mm:ss")
                arr.push(result)
            }
            let final_result = {};
            final_result.page = page;
            final_result.data = arr;
            res.send(final_result)
        } else {
            throw new Error('Can\'t find the data-Content')
        }
    } catch (err) {
        console.error(err)
    }
}

// 获取首页头图 url
Content.getImgUrl = async(req, res) => {
    const queryImgUrl = () => {
        const query = new AV.Query('index_background')
        query.descending('createdAt')
        return query.find()
    }
    try {
        const data = await queryImgUrl()
        if (data) {
            let arr = [];
            for (let item of data) {
                arr.push(item.get('img_background').attributes.url)
            }
            res.send(arr)
        } else {
            throw new Error('Can\'t find the data-Content')
        }
    } catch (error) {
        console.log(error)
    }
}

// 获取指定 id 的文章信息
Content.article = async(req, res) => {
    const id = req.params.id

    const queryArticle = (id) => {
        const query = new AV.Query('ContentList')
        return query.get(id)
    }
    try {
        const data = await queryArticle(id)

        let result = {}
        if (data) {
            result.title = data.get('title')
            result.cover = data.get('cover').get('url')
            result.content = data.get('content')
            result.createdAt = data.get('createdAt').Format("yyyy-MM-dd")
            res.send(result)
        } else {
            throw new Error('article can not found')
        }
    } catch (error) {
        console.log(error)
    }

}

var postContentList = AV.Object.extend('ContentList');

Content.submitArticle = async(req, res) => {

    let _post = {
        title: req.body.title,
        content: req.body.content,
        abstract: req.body.abstract
    }

    if (!_post.title.trim() || !_post.content.trim()) {
        res.status(500).send('昵称和内容不可为空')
    }

    let myPost = new postContentList();
    myPost.set('title', _post.title);
    myPost.set('content', _post.content);
    myPost.set('abstract', _post.abstract);

    myPost.save().then(function(p) {
        console.log('objectId is ' + p.id);
        res.send(p.id + " -> post successfully" );
    }, function(error) {
        console.error(error);
        res.status(500).send(error)
    });

}

module.exports = Content;