'use strict';

const tool = require('../tool')
const AV = require('leanengine')

// AV.Object.extend('className') 所需的参数 className 则表示对应的表名
// 声明一个类型
const User = AV.Object.extend('User')

let UserModel = {};

UserModel.register = async(req, res) => {

}

UserModel.login = async(req, res) => {
    
}

module.exports = UserModel;