/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-06-20 18:36:47
 * @version   v1.0.0
 * filename   app.js
 * function   后端入口
 ***************************************************************************/

const express      = require('express');
const path         = require('path');
const ejs          = require('ejs');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const history      = require('connect-history-api-fallback');
const ctx          = require('./context.js');

const app = express();

    // 渲染引擎转换
app.engine('html', ejs.renderFile)
    .set('views', path.resolve(__dirname, '../dist'))
    .set('view engine', 'html')
    // favicon 浏览器标签图标
    // .use(favicon(path.resolve(__dirname, '../dist/favicon.ico')))
    // html5 history模式的前端路由的后端配置
    .use(history({index: '/', verbose: false}))
    // 静态文件托管
    .use('/static', express.static(path.resolve(__dirname, '../dist/static')))
    // dev日志
    .use(logger('dev'))
    // .use(logger(':method :status - :remote-addr - :date[iso] - :url - :response-time ms - :res[content-length]'))
    // 修复req.body出现undefined的BUG
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    // cookie 顺序要在session前
    .use(cookieParser())
    // 解除e-session启动警告, 设置resave 和 saveUninitialized 参数 放路由后面有BUG
    .use(session(ctx.get('sessionConfig')))
    // error handler -- 顺序在路由前
    .use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });


// 特定全路径拦截器
const InterceptorLoginStatus = require('./com.lz.watcher.base/server/interceptors/InterceptorLoginStatus');
const InterceptorRouteEnter = require('./com.lz.watcher.base/server/interceptors/InterceptorRouteEnter');
const interceptorLoginStatus = new InterceptorLoginStatus();
const interceptorRouteEnter = new InterceptorRouteEnter();
app.use('/home', interceptorLoginStatus.doInterceptor()); // 登录校验
app.use('/home', interceptorRouteEnter.doInterceptor()); // home后全路径进入权限校验

// 监控数据处理切面
const MonitorDataHandler = require('./com.lz.watcher.base/server/middlewares/mwMonitorDataHandler.js');
const monitorDataHandler = new MonitorDataHandler();
// app.use(monitorDataHandler.exec());

// 路由引入
const routerIndex                     = require('./com.lz.watcher.base/server/controllers/routerIndex');
const routerHome                      = require('./com.lz.watcher.base/server/controllers/routerHome');
const routerSystemConfigBaseConfig    = require('./com.lz.watcher.base/server/controllers/routerSystemConfigBaseConfig');
const routerSystemConfigMonitorConfig = require('./com.lz.watcher.base/server/controllers/routerSystemConfigMonitorConfig');
const routerSystemAdminOpLog          = require('./com.lz.watcher.base/server/controllers/routerSystemAdminOpLog');
const routerSystemAdminRouteMonitor   = require('./com.lz.watcher.base/server/controllers/routerSystemAdminRouteMonitor');
const routerSystemAdminSessionMonitor = require('./com.lz.watcher.base/server/controllers/routerSystemAdminSessionMonitor');
const routerUserAdminAccountAdmin     = require('./com.lz.watcher.base/server/controllers/routerUserAdminAccountAdmin');
const routerUserAdminGroupAdmin       = require('./com.lz.watcher.base/server/controllers/routerUserAdminGroupAdmin');
const routerUserAdminAuthorityAdmin   = require('./com.lz.watcher.base/server/controllers/routerUserAdminAuthorityAdmin');
// 基础模块路由  ----  在配置后被使用  ---- 顺序提前，会影响dev日志0
app.use('/', routerIndex);
app.use('/home', routerHome);
app.use('/home/systemConfig/baseConfig', routerSystemConfigBaseConfig);
app.use('/home/systemConfig/monitorConfig', routerSystemConfigMonitorConfig);
app.use('/home/systemAdmin/opLog', routerSystemAdminOpLog);
app.use('/home/systemAdmin/routeMonitor', routerSystemAdminRouteMonitor);
app.use('/home/systemAdmin/sessionMonitor', routerSystemAdminSessionMonitor);
app.use('/home/userAdmin/accountAdmin', routerUserAdminAccountAdmin);
app.use('/home/userAdmin/groupAdmin', routerUserAdminGroupAdmin);
app.use('/home/userAdmin/authorityAdmin', routerUserAdminAuthorityAdmin);


// API
const apiPublicKey = require('./com.lz.watcher.base/server/api/apiPublicKey');
app.use('/api/publicKey', apiPublicKey);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    console.log(req.originalUrl);
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
