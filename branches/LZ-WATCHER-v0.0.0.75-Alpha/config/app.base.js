/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-10-17 11:12:52
 * @version   v1.0.0
 * filename   app.base.js
 * function   app的基本配置
 ***************************************************************************/

const pkg = require('../package.json');

const appBase = {
    ip: process.env.NODE_IP || '0.0.0.0',
    port: process.env.PORT || pkg.deployment.server_port,
    db: {
        uri: 'mongodb://' + pkg.deployment.db_ip + ':' + pkg.deployment.db_port + '/' + pkg.name,
        options: {}
    },
    uploadLimit: 2 * 1024 * 1024 // 2MB
}

module.exports = appBase;