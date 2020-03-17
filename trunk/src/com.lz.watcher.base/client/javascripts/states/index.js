/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2019-03-26 17:18:57
 * @version   v1.0.0
 * filename   index.js
 * function   vuex状态机
 ***************************************************************************/

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const states = new Vuex.Store({
    state: {
        // 应用面板
        viewAppPanel: false,
        // 系统设置
        systemConfig: {
            // 系统设置 -- 菜单item激活
            activeNameSystemConfig: 'SystemConfigBaseConfig',
            // 系统设置 -- 菜单
            viewSystemConfigSider: true,
            // 系统设置 -- 基础设置
            viewSystemConfigBaseConfig: true,
            // 系统设置 -- 监控设置
            viewSystemConfigMonitorConfig: false
        },
        systemAdmin: {
            // 系统管理 -- 菜单item激活
            activeNameSystemAdmin: 'SystemAdminOpLog',
            // 系统管理 -- 菜单
            viewSystemAdminSider: true,
            // 系统管理 -- 操作日志
            viewSystemAdminOpLog: true,
            // 系统管理 -- 路径监控
            viewSystemAdminRouteMonitor: false,
            // 系统管理 -- 会话监控
            viewSystemAdminSessionMonitor: false
        },
        userAdmin: {
            // 用户管理 -- 菜单item激活
            activeNameUserAdmin: 'UserAdminAccountAdmin',
            // 用户管理 -- 菜单
            viewUserAdminSider: true,
            // 用户管理 -- 帐户管理
            viewUserAdminAccountAdmin: true,
            // 用户管理 -- 分组管理
            viewUserAdminGroupAdmin: false,
            // 用户管理 -- 权限管理
            viewUserAdminAuthorityAdmin: false
        },
        drawingMaking: {
            // 制图 -- 显示
            viewDrawingMaking: true,
            viewDrawingMakingIndex: true
        }
    },
    getters: {
        // 应用面板
        getViewAppPanel (state) {
            return state.viewAppPanel;
        },
        // 系统设置
        getActiveNameSystemConfig (state) {
            return state.systemConfig.activeNameSystemConfig;
        },
        getViewSystemConfigSider (state) {
            return state.systemConfig.viewSystemConfigSider;
        },
        getViewSystemConfigBaseConfig (state) {
            return state.systemConfig.viewSystemConfigBaseConfig;
        },
        getViewSystemConfigMonitorConfig (state) {
            return state.systemConfig.viewSystemConfigMonitorConfig;
        },
        // 系统管理
        getActiveNameSystemAdmin (state) {
            return state.systemAdmin.activeNameSystemAdmin;
        },
        getViewSystemAdminSider (state) {
            return state.systemAdmin.viewSystemAdminSider;
        },
        getViewSystemAdminOpLog (state) {
            return state.systemAdmin.viewSystemAdminOpLog;
        },
        getViewSystemAdminRouteMonitor (state) {
            return state.systemAdmin.viewSystemAdminRouteMonitor;
        },
        getViewSystemAdminSessionMonitor (state) {
            return state.systemAdmin.viewSystemAdminSessionMonitor;
        },
        // 用户管理
        getActiveNameUserAdmin (state) {
            return state.userAdmin.activeNameUserAdmin;
        },
        getViewUserAdminSider (state) {
            return state.userAdmin.viewUserAdminSider;
        },
        getViewUserAdminAccountAdmin (state) {
            return state.userAdmin.viewUserAdminAccountAdmin;
        },
        getViewUserAdminGroupAdmin (state) {
            return state.userAdmin.viewUserAdminGroupAdmin;
        },
        getViewUserAdminAuthorityAdmin (state) {
            return state.userAdmin.viewUserAdminAuthorityAdmin;
        },
        // 制图
        getViewDrawingMaking (state) {
            return state.drawingMaking.viewDrawingMaking;
        },
        getViewDrawingMakingIndex (state) {
            return state.drawingMaking.viewDrawingMakingIndex;
        }
    },
    mutations: {
        // 应用面板
        setViewAppPanel (state, val) {
            state.viewAppPanel = val;
        },
        // 系统设置
        setActiveNameSystemConfig (state, val) {
            state.systemConfig.activeNameSystemConfig = val;
        },
        setViewSystemConfigSider (state, val) {
            state.systemConfig.viewSystemConfigSider = val;
        },
        setViewSystemConfigBaseConfig (state, val) {
            state.systemConfig.viewSystemConfigBaseConfig = val;
        },
        setViewSystemConfigMonitorConfig (state, val) {
            state.systemConfig.viewSystemConfigMonitorConfig = val;
        },
        // 系统管理
        setActiveNameSystemAdmin (state, val) {
            state.systemAdmin.activeNameSystemAdmin = val;
        },
        setViewSystemAdminSider (state, val) {
            state.systemAdmin.viewSystemAdminSider = val;
        },
        setViewSystemAdminOpLog (state, val) {
            state.systemAdmin.viewSystemAdminOpLog = val;
        },
        setViewSystemAdminRouteMonitor (state, val) {
            state.systemAdmin.viewSystemAdminRouteMonitor = val;
        },
        setViewSystemAdminSessionMonitor (state, val) {
            state.systemAdmin.viewSystemAdminSessionMonitor = val;
        },
        // 用户管理
        setActiveNameUserAdmin (state, val) {
            state.userAdmin.activeNameUserAdmin = val;
        },
        setViewUserAdminSider (state, val) {
            state.userAdmin.viewUserAdminSider = val;
        },
        setViewUserAdminAccountAdmin (state, val) {
            state.userAdmin.viewUserAdminAccountAdmin = val;
        },
        setViewUserAdminGroupAdmin (state, val) {
            state.userAdmin.viewUserAdminGroupAdmin = val;
        },
        setViewUserAdminAuthorityAdmin (state, val) {
            state.userAdmin.viewUserAdminAuthorityAdmin = val;
        },
        // 制图
        setViewDrawingMaking (state, val) {
            state.drawingMaking.viewDrawingMaking = val;
        },
        setViewDrawingMakingIndex (state, val) {
            state.drawingMaking.viewDrawingMakingIndex = val;
        }
    },
    actions: {
        // 应用面板
        setViewAppPanelVal ({commit, state}, val) {
            commit('setViewAppPanel', val);
        },
        // 系统设置
        setActiveNameSystemConfigVal ({commit, state}, val) {
            commit('setActiveNameSystemConfig', val);
        },
        setViewSystemConfigSiderVal ({commit, state}, val) {
            commit('setViewSystemConfigSider', val);
        },
        setViewSystemConfigBaseConfigVal ({commit, state}, val) {
            commit('setViewSystemConfigBaseConfig', val);
        },
        setViewSystemConfigMonitorConfigVal ({commit, state}, val) {
            commit('setViewSystemConfigMonitorConfig', val);
        },
        // 系统管理
        setActiveNameSystemAdminVal ({commit, state}, val) {
            commit('setActiveNameSystemAdmin', val);
        },
        setViewSystemAdminSiderVal ({commit, state}, val) {
            commit('setViewSystemAdminSider', val);
        },
        setViewSystemAdminOpLogVal ({commit, state}, val) {
            commit('setViewSystemAdminOpLog', val);
        },
        setViewSystemAdminRouteMonitorVal ({commit, state}, val) {
            commit('setViewSystemAdminRouteMonitor', val);
        },
        setViewSystemAdminSessionMonitorVal ({commit, state}, val) {
            commit('setViewSystemAdminSessionMonitor', val);
        },
        // 用户管理
        setActiveNameUserAdminVal ({commit, state}, val) {
            commit('setActiveNameUserAdmin', val);
        },
        setViewUserAdminSiderVal ({commit, state}, val) {
            commit('setViewUserAdminSider', val);
        },
        setViewUserAdminAccountAdminVal ({commit, state}, val) {
            commit('setViewUserAdminAccountAdmin', val);
        },
        setViewUserAdminGroupAdminVal ({commit, state}, val) {
            commit('setViewUserAdminGroupAdmin', val);
        },
        setViewUserAdminAuthorityAdminVal ({commit, state}, val) {
            commit('setViewUserAdminAuthorityAdmin', val);
        },
        // 制图
        setViewDrawingMakingVal ({commit, state}, val) {
            commit('setViewDrawingMaking', val);
        },
        setViewDrawingMakingIndexVal ({commit, state}, val) {
            commit('setViewDrawingMakingIndex', val);
        }
    }
});

export default states;
