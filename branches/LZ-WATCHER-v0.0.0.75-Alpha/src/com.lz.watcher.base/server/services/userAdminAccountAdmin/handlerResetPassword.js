/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-27 14:09:14
 * @version   v1.0.0
 * filename   handlerResetPassword.js
 * function   批量重置密码处理器
 ***************************************************************************/

const utility = require('utility');
// 模型引入
const users = require('../../models/modelUser.js');
const system_configs = require('../../models/modelSystemConfig.js');

const handler = {
    passwordMd5: '',

    async doHandler (req, res, next, arrUsername) {
        await this.getPasswordDefault(req, res, next);
        for (var i = 0; i < arrUsername.length; i++) {
            await users.find({'username': arrUsername[i]}, (err, doc) => {
                this.updatePassword(req, res, next, arrUsername[i]);
            });
        }
        res.json({"process": "success"});
    },

    updatePassword (req, res, next, username) {
        users.update({'username': username}, {$set: {'password': this.passwordMd5}}, (err) => {
            if (err) console.log(err);
        });
    },

    async getPasswordDefault (req, res, next) {
        await system_configs.find({'index': 'default'}, (err, doc) => {
            this.passwordMd5 = utility.md5(doc[0]['_doc'].base.passwordDefault);
        });
    }
}

module.exports = handler;