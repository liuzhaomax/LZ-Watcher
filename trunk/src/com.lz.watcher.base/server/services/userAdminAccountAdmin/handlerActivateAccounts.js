/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-27 16:11:09
 * @version   v1.0.0
 * filename   handlerActivateAccounts.js
 * function   批量启用或批量禁用用户处理器
 ***************************************************************************/

// 模型引入
const users = require('../../models/modelUser.js');

const handler = {
    async doHandler (req, res, next, arrUsername, activation) {
        for (var i = 0; i < arrUsername.length; i++) {
            await users.find({'username': arrUsername[i]}, (err, doc) => {
                this.updateActivation(req, res, next, arrUsername[i], activation);
            });
        }
        res.json({"process": "success"});
    },

    updateActivation (req, res, next, username, activation) {
        users.update({'username': username}, {$set: {'activation': activation}}, (err) => {
            if (err) console.log(err);
        });
    }
}

module.exports = handler;