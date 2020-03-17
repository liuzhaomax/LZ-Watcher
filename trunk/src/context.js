/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-16 12:55:25
 * @version   v1.0.0
 * filename   Context.js
 * function   上下文
 ***************************************************************************/

const ctx = {
    // session配置
    sessionConfig: {
        resave: false, // 添加 resave 选项
        saveUninitialized: true, // 添加 saveUninitialized 选项
        secret: '754543751217115765452317217656123', // 使用 128 个字符的随机字符串
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 1} // 1 day (ms)
    },
    // 用户信息
    userinfo: {
        username: '',
        activation: true,
        realname: '',
        gender: '',
        dateOfBirth: '',
        workId: '',
        phone: '',
        wechat: '',
        email: '',
        address: '',
        authorityData: {
            group: [],
            duty: [],
            jobLevel: []
        }, // user_data_authorities
        authorityFunc: [], // user_func_authorities
        role: ''
    },
    // 功能权限中英对照
    authority: {
        root: 'root',
        read: '查看',
        create: '新增',
        update: '修改',
        delete: '删除',
        systemConfig: '系统设置',
        systemConfigBaseConfig: '基础设置',
        systemConfigMonitorConfig: '监控设置',
        systemAdmin: '系统管理',
        systemAdminOpLog: '操作日志',
        systemAdminRouteMonitor: '路径监控',
        systemAdminSessionMonitor: '会话监控',
        userAdmin: '用户管理',
        userAdminAccountAdmin: '帐户管理',
        userAdminGroupAdmin: '分组管理',
        userAdminAuthorityAdmin: '权限管理'
    },
    // 系统设置
    systemConfig: {},
    // 系统管理
    systemAdminOpLog: [],
    systemAdminRouteMonitor: [],
    systemAdminSessionMonitor: [],
    // 系统管理路径监控累计字段记录器
    route: {
        uri      : '',
        maxSimul : 0
    },
    // 系统管理会话监控累计字段记录器
    session: {
        id          : '',
        createTime  : '',
        destroyTime : '',
        reqTimes    : 0,
        resTime     : 0,
        maxSimul    : 0
    },
    // 操作日志记录分页数和分页数据条数
    systemAdminOpLogPageNum: 0,
    systemAdminOpLogPageSize: 0,
    systemAdminOpLogSearchVal: '',
    // 路径监控记录分页数和分页数据条数
    systemAdminRouteMonitorPageNum: 0,
    systemAdminRouteMonitorPageSize: 0,
    systemAdminRouteMonitorSearchVal: '',
    // 会话监控记录分页数和分页数据条数
    systemAdminSessionMonitorPageNum: 0,
    systemAdminSessionMonitorPageSize: 0,
    systemAdminSessionMonitorSearchVal: '',
    // 用户管理
    userAdminAccountAdmin: [],
    userAdminGroupAdmin: [],
    userAdminAuthorityAdmin: [],
    // 帐户管理搜索项和搜索值
    userAdminAccountAdminSearchItem: '',
    userAdminAccountAdminSearchVal: '',
    // 当前操作的用户名和权限
    userAdminOperatingUsername: '',
    userAdminOperatingUserAuthFunc: '',
    userAdminOperatingUserAuthData: '',
    // 导出用户EXCEL表头
    userinfoExcelHeader: {
        username    : '用户名',
        realname    : '姓名',
        role        : '角色',
        group       : '分组',
        duty        : '职位',
        jobLevel    : '职级',
        activation  : '激活状态',
        gender      : '性别',
        dateOfBirth : '出生日期',
        workId      : '工号',
        phone       : '联系电话',
        wechat      : '微信号',
        email       : '电子邮箱',
        address     : '邮寄地址'
    },
    userinfoExcelHeaderArray: [
        'username',
        'realname',
        'role',
        'group',
        'duty',
        'jobLevel',
        'activation',
        'gender',
        'dateOfBirth',
        'workId',
        'phone',
        'wechat',
        'email',
        'address'
    ],

    /**
     * @method
     * 上下文getter
     *
     * @param  {String}  key 鍵
     * @return {AnyType}     值
     */
    get: function (key) {
        return this[key];
    },

    /**
     * @method
     * 上下文setter
     *
     * @param  {Sting}  key   鍵
     * @param  {AnyType} value 值
     * @return {}
     */
    set: function (key, value) {
        this[key] = value;
    }
}

module.exports = ctx;