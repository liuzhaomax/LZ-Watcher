/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-26 13:07:40
 * @version   v1.0.0
 * filename   handlerCreateUser.js
 * function   处理新增用户
 ***************************************************************************/

// 模型引入
const users = require('../../models/modelUser.js');
const roles = require('../../models/modelRole.js');
const user_func_authorities = require('../../models/modelAuthorityFunc.js');
const user_data_authorities = require('../../models/modelAuthorityData.js');

const handler = {
    id_role: '',
    id_authorityData: '',
    id_authorityFunc: '',

    doHandler (req, res, next, newUser) {
        users.find({'username': newUser.username}, async (err, doc) => {
            if (!!doc.length) {
                res.json({"process": "usernameRepeated"});
            } else {
                await this.getIdRole(req, res, next, newUser);
                await this.createAuthorityData(req, res, next, newUser);
                await this.getIdAuthorityData(req, res, next, newUser);
                await this.updateAuthorityData(req, res, next, newUser, this.id_authorityData);
                await this.createAuthorityFunc(req, res, next, newUser);
                await this.getIdAuthorityFunc(req, res, next, newUser);
                await this.updateAuthorityFunc(req, res, next, newUser, this.id_authorityFunc);
                await this.createUser(req, res, next, newUser);
                res.json({"process": "success"});
            }
        });
    },

    async getIdRole (req, res, next, newUser) {
        await roles.find({}, (err, doc) => {
            let num;
            for (let i = 0; i < doc.length; i++) {
                if (doc[i]['_doc'].role === newUser.role) {
                    num = i;
                    break;
                }
            }
            if (num) {
                this.id_role = doc[num]['_doc']['_id'];
            } else {
                this.id_role = doc[doc.length - 1]['_doc']['_id'];
            }
        });
    },

    async createAuthorityData (req, res, next, newUser) {
        await user_data_authorities.create({'username': newUser.username}, (err) => {
            if (err) console.log(err);
        });
        // lz? 这里必须要重新写一遍，不知道为什么
        await this.getIdAuthorityData(req, res, next, newUser);
    },

    async getIdAuthorityData (req, res, next, newUser) {
        await user_data_authorities.find({'username': newUser.username}, (err, doc) => {
            if (!!doc.length) {
                this.id_authorityData = doc[0]['_doc']['_id'];
            }
        });
    },

    async updateAuthorityData (req, res, next, newUser, id) {
        await user_data_authorities.update({'_id': id}, {$set: {
            'authorityData': newUser.authorityData
        }}, (err, doc) => {
            if (err) console.log(err);
        });
    },

    async createAuthorityFunc (req, res, next, newUser) {
        await user_func_authorities.create({'username': newUser.username}, (err) => {
            if (err) console.log(err);
        });
        await this.getIdAuthorityFunc(req, res, next, newUser);
    },

    async getIdAuthorityFunc (req, res, next, newUser) {
        await user_func_authorities.find({'username': newUser.username}, (err, doc) => {
            if (!!doc.length) {
                this.id_authorityFunc = doc[0]['_doc']['_id'];
            }
        });
    },

    async updateAuthorityFunc (req, res, next, newUser, id) {
        let authorityFunc = [{
            title: 'root',
            authority: true,
            children: newUser.authorityFunc
        }];
        await user_func_authorities.update({'_id': id}, {$set: {
            'authorityFunc': authorityFunc
        }}, (err, doc) => {
            if (err) console.log(err);
        });
    },

    async createUser (req, res, next, newUser) {
        newUser.role = this.id_role;
        newUser.authorityData = this.id_authorityData;
        newUser.authorityFunc = this.id_authorityFunc;
        await users.create(newUser, (err) => {
            if (err) console.log(err);
        });
    }
}

module.exports = handler;