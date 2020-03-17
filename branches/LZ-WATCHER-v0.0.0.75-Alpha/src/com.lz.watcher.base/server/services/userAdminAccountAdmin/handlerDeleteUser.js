/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-28 22:51:42
 * @version   v1.0.0
 * filename   handlerDeleteUser.js
 * function   删除用户
 ***************************************************************************/

// 模型引入
const users = require('../../models/modelUser.js');
const user_func_authorities = require('../../models/modelAuthorityFunc.js');
const user_data_authorities = require('../../models/modelAuthorityData.js');

const handler = {
    doHandler (req, res, next) {
        this.deleteUser(req, res, next);
    },

    deleteUser (req, res, next) {
        users.deleteOne({'username': req.body.username}, (err) => {
            if (err) console.log(err);
        });
        user_data_authorities.deleteOne({'username': req.body.username}, (err) => {
            if (err) console.log(err);
        });
        user_func_authorities.deleteOne({'username': req.body.username}, (err) => {
            if (err) console.log(err);
        });
        res.json({"process": "success"});
    }
}

module.exports = handler;