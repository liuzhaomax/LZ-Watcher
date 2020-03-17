/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-31 22:49:43
 * @version   v1.0.0
 * filename   mwMonitorDataHandler.js
 * function   监控数据处理中间件
 ***************************************************************************/

const com = require('../../../../lib/com.lz.mevn.namespace/Namespace.js');
const _Object = require('../../../../lib/com.lz.mevn.base.core/Object.js');
const ctx = require('../../../context.js');
const Utils = require('../../../../lib/com.lz.mevn.util.utils/Utils.js');
// 模型引入
const system_admin_op_logs = require('../models/modelSystemAdminOpLog.js');
const system_admin_route_monitors = require('../models/modelSystemAdminRouteMonitor.js');
const system_admin_session_monitors = require('../models/modelSystemAdminSessionMonitor.js');

com.lz.mevn.module.middleware.MonitorDataHandler = com.lz.mevn.base.core.Object.extend({

    // 类名
    NAME : 'com.lz.mevn.module.middleware.MonitorDataHandler',

    /**
     * @method
     * 构造函数
     *
     * @return {}
     */
    init : function () {
        this._super();
        this.utils = new Utils();
    },

    /**
     * @method
     * 处理系统管理数据
     *
     * @return {Callback} 管道函数
     */
    exec : function () {
        return (req, res, next) =>  {
            let saveMonitorData = () => {
                let now = new Date(); // 获取时间 t2
                let resTime = now - req._startTime;
                // 操作日志
                let opLog = {
                    username   : ctx.userinfo.username ? ctx.userinfo.username : 'Not_Logged_In',
                    realname   : ctx.userinfo.realname ? ctx.userinfo.realname : 'Not_Logged_In',
                    method     : req.method,
                    path       : req.originalUrl,
                    sessionId  : (!!req.session && !!req.session.userinfo) ? req.session.userinfo : 'Not_Logged_In',
                    resTime    : resTime,
                    dataLength : res._contentLength ? res._contentLength.toString() : '-',
                    ip         : req.ip,
                    opTime     : this.utils.formatDateTime(res._startTime)
                }
                system_admin_op_logs.create(opLog, (err, doc) => {
                    if(err) console.log(err);
                });
                // 路径监控
                if (ctx.route.uri !== req.originalUrl) {
                    ctx.route.uri = req.originalUrl;
                    ctx.route.maxSimul = 0;
                }
                system_admin_route_monitors.find({'uri': req.originalUrl}, (err, doc) => {
                    if (doc.length) {
                        let routeMonitor = {
                            uri      : req.originalUrl,
                            reqTimes : doc[0]['_doc'].reqTimes + 1,
                            resTime  : (resTime > doc[0]['_doc'].resTime) ? resTime : doc[0]['_doc'].resTime,
                            maxSimul : (doc[0]['_doc'].maxSimul > doc[0]['_doc'].maxSimul + ctx.route.maxSimul) ? doc[0]['_doc'].maxSimul : (doc[0]['_doc'].maxSimul + ctx.route.maxSimul)
                        }
                        system_admin_route_monitors.update({'uri': req.originalUrl}, routeMonitor, (err) => {
                            if(err) console.log(err);
                        });
                    } else {
                        ctx.route.maxSimul = 1;
                        let routeMonitor = {
                            uri      : req.originalUrl,
                            reqTimes : 1,
                            resTime  : resTime,
                            maxSimul : 1
                        }
                        system_admin_route_monitors.create(routeMonitor, (err, doc) => {
                            if(err) console.log(err);
                        });
                    }
                });
                // 会话监控
                if (!!req.session && !!req.session.userinfo) {
                    let sessionMonitor = {
                        sessionId   : req.session.userinfo,
                        username    : ctx.userinfo.username,
                        ip          : req.ip,
                        createTime  : ctx.session.createTime,
                        destroyTime : ctx.session.destroyTime,
                        reqTimes    : ctx.session.reqTimes,
                        resTime     : (resTime > ctx.session.resTime) ? resTime : ctx.session.resTime,
                        maxSimul    : ctx.session.maxSimul
                    }
                    system_admin_session_monitors.find({'sessionId': ctx.session.id}, (err, doc) => {
                        if (doc.length) {
                            system_admin_session_monitors.update({'sessionId': ctx.session.id}, sessionMonitor, (err) => {
                                if(err) console.log(err);
                            });
                        } else {
                            system_admin_session_monitors.create(sessionMonitor, (err, doc) => {
                                if(err) console.log(err);
                            });
                        }
                    });
                } else {
                    system_admin_session_monitors.find({'sessionId': ctx.session.id}, (err, doc) => {
                        if (doc.length) {
                            system_admin_session_monitors.update({'sessionId': ctx.session.id}, {$set: {'destroyTime': ctx.session.destroyTime}}, (err) => {
                                ctx.session.id = '';
                            });
                        }
                    });
                }
            }
            res.once('finish', saveMonitorData); // res.once相当于AOP after
            return next();
       }
    }
});

module.exports = com.lz.mevn.module.middleware.MonitorDataHandler;