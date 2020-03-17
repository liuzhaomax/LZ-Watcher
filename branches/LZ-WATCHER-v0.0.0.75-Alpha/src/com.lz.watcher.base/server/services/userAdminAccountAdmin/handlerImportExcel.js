/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-04-28 23:04:20
 * @version   v1.0.0
 * filename   handlerImportExcel.js
 * function   导入用户Excel
 ***************************************************************************/

const ctx  = require('../../../../context.js');
const xlsx = require('node-xlsx');
// 模型引入
const users = require('../../models/modelUser.js');
const roles = require('../../models/modelRole.js');
const user_func_authorities = require('../../models/modelAuthorityFunc.js');
const user_data_authorities = require('../../models/modelAuthorityData.js');
const role_func_authorities = require('../../models/modelRoleAuthority.js');

const handler = {
    id_authorityData: '',
    id_authorityFunc: '',
    role_authorityFunc: '',

    async doHandler (req, res, next) {
        let filePath = req.file.path;
        let fileContent = xlsx.parse(filePath);
        let sheetHeader = fileContent[0].data[0];
        let sheetBody = fileContent[0].data.slice(1);
        let sheetBodyRepeatChecked = await this.checkUsernameRepeated(sheetBody);
        let result = await this.prepareUsers(sheetHeader, sheetBodyRepeatChecked);
        await this.createUsers(result);
        res.end();
    },

    async prepareUsers (sheetHeader, sheetBody) {
        let result = [];
        let user;
        let newUserArray;
        let newUser;
        for (let j = 0; j < sheetBody.length; j++) {
            if (sheetBody[j][0]) {
                user = {};
                newUser = { authorityData: {}, authorityFunc: {} };
                newUserArray = sheetBody[j];
                await this.createAuthorityData(newUserArray[0]);
                await this.createAuthorityFunc(newUserArray[0]);
                // lz? 直接获取，二次循环拿不到值
                // user['authorityData'] = await this.getIdAuthorityData(newUserArray[0]);
                await this.getIdAuthorityData(newUserArray[0]);
                await this.getIdAuthorityFunc(newUserArray[0]);
                user['authorityData'] = this.id_authorityData;
                user['authorityFunc'] = this.id_authorityFunc;
                for (let i = 0; i < sheetHeader.length; i++) {
                    for (let key in ctx.userinfoExcelHeader) {
                        if (ctx.userinfoExcelHeader[key] === sheetHeader[i]) {
                            if (key === 'role') {
                                if (sheetBody[j][i] === undefined) {
                                    user[key] = '5cc1ff1d51a44e2938b0a137';
                                    await this.getRoleAuthorityFunc('访客');
                                } else {
                                    user[key] = await this.getIdRole(sheetBody[j][i]);
                                    await this.getRoleAuthorityFunc(sheetBody[j][i]);
                                }
                                newUser.authorityFunc = this.role_authorityFunc;
                            } else if (key === 'activation') {
                                if (sheetBody[j][i] === undefined) {
                                    user[key] = true;
                                } else {
                                    user[key] = sheetBody[j][i] === 'TRUE';
                                }
                            } else if (key === 'group') {
                                if (sheetBody[j][i] === undefined) {
                                    user[key] = [];
                                    newUser.authorityData.group = [];
                                } else {
                                    newUser.authorityData.group = ['root'].concat(sheetBody[j][i].split('-'));
                                }
                            } else if (key === 'duty') {
                                if (sheetBody[j][i] === undefined) {
                                    user[key] = [];
                                    newUser.authorityData.duty = [];
                                } else {
                                    newUser.authorityData.duty = sheetBody[j][i].split('兼');
                                }
                            } else if (key === 'jobLevel') {
                                if (sheetBody[j][i] === undefined) {
                                    user[key] = [];
                                    newUser.authorityData.jobLevel = [];
                                } else {
                                    newUser.authorityData.jobLevel = [sheetBody[j][i]];
                                }
                            } else {
                                user[key] = sheetBody[j][i];
                            }
                        }
                    }
                }
                await this.updateAuthorityData(newUserArray[0], newUser);
                await this.updateAuthorityFunc(newUserArray[0], newUser);
                delete user.group;
                delete user.duty;
                delete user.jobLevel;
            }
            if (user) {
                result.push(user);
            }
        }
        this.id_authorityData = '';
        this.id_authorityFunc = '';
        this.role_authorityFunc = '';
        return result;
    },

    async getIdRole (roleName) {
        let result;
        // await可以直接取promise对象的值
        result = await roles.find({'role': roleName});
        return result[0]['_id'];
    },

    async getRoleAuthorityFunc (roleName) {
        await role_func_authorities.find({'role': roleName}, (err, doc) => {
            if (!!doc.length) {
                this.role_authorityFunc = doc[0].authorityFunc;
            }
        });
    },

    async createAuthorityData (newUsername) {
        await user_data_authorities.create({'username': newUsername}, (err) => {
            if (err) console.log(err);
        });
        await this.getIdAuthorityData(newUsername);
    },

    async updateAuthorityData (newUsername, newUser) {
        await user_data_authorities.update({'username': newUsername}, {$set: {
            'authorityData': newUser.authorityData
        }}, (err, doc) => {
            if (err) console.log(err);
        });
    },

    async getIdAuthorityData (newUsername) {
        await user_data_authorities.find({'username': newUsername}, (err, doc) => {
            if (!!doc.length) {
                this.id_authorityData = doc[0]['_doc']['_id'];
            }
        });
        // let result;
        // result = await user_data_authorities.find({'username': newUsername});
        // console.log(result);
        // return result[0]['_id'];
    },

    async createAuthorityFunc (newUsername) {
        await user_func_authorities.create({'username': newUsername}, (err) => {
            if (err) console.log(err);
        });
        await this.getIdAuthorityFunc(newUsername);
    },

    async updateAuthorityFunc (newUsername, newUser) {
        await user_func_authorities.update({'username': newUsername}, {$set: {
            'authorityFunc': newUser.authorityFunc
        }}, (err, doc) => {
            if (err) console.log(err);
        });
    },

    async getIdAuthorityFunc (newUsername) {
        await user_func_authorities.find({'username': newUsername}, (err, doc) => {
            if (!!doc.length) {
                this.id_authorityFunc = doc[0]['_doc']['_id'];
            }
        });
    },

    async checkUsernameRepeated (sheetBody) {
        let usersArray = await users.find();
        let usernamesArray = [];
        for (let i = 0; i < usersArray.length; i++) {
            for (let j = 0; j < sheetBody.length; j++) {
                if (sheetBody[j][0] === usersArray[i].username) {
                    sheetBody.splice(j, 1);
                }
            }
        }
        return sheetBody;
    },

    async createUsers (usersArray) {
        // for (var i = 0; i < usersArray.length; i++) {
            await users.insertMany(usersArray, (err) => {
                if (err) console.log(err);
            });
        // }
    }
}

module.exports = handler;