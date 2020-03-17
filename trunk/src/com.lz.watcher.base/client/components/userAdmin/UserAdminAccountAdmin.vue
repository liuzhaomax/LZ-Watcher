<template>
    <div class="userAdminAccountAdmin">
        <Layout class="layout">
            <Content class="content">
                <Breadcrumb class="breadcrumb">
                    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                    <BreadcrumbItem>用户管理</BreadcrumbItem>
                    <BreadcrumbItem>帐户管理</BreadcrumbItem>
                </Breadcrumb>
                <Card class="card">
                    <div class="button">
                        <Button class="button" type="primary" @click="showUserinfoCreateIndividual">新增用户</Button>
                        <Button class="button" type="primary" @click="showUserinfoImportModal">批量导入</Button>
                        <Button class="button" type="primary" @click="downloadFile('application/vnd.ms-excel', '/excelUserinfoExport', '用户信息.xlsx')">批量导出</Button>
                        <Button class="button" type="primary" @click="downloadFile('application/vnd.ms-excel', '/templateUserinfo', '用户管理帐户信息.xlsx')">模板下载</Button>
                        <Button class="button" type="primary" @click="toggleActivationStatus(true)">批量启用</Button>
                        <Button class="button" type="primary" @click="toggleActivationStatus(false)">批量禁用</Button>
                        <Button class="button" type="primary" @click="resetPassword">重置密码</Button>
                    </div>
                    <div class="search">
                        <Input class="searchInput" search enter-button="搜索" placeholder="请输入" ref="searchInput" @on-search="fetchData"/>
                        <Select class="searchSelect" ref="searchSelect">
                            <Option v-for="item in searchSelectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="table">
                        <Table :columns="columns" :data="data" ref="table"></Table>
                    </div>
                    <div class="page">
                        <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-sizer show-elevator show-total @on-change="changePage" @on-page-size-change="changePageSize"/>
                    </div>
                    <div class="lastRow"></div>
                    <div class="spinShade" v-show="spinShow">
                        <Spin class="spin" size="large"></Spin>
                    </div>
                </Card>
            </Content>
        </Layout>
        <UserAdminUserinfoRead :view-userinfo-individual="viewUserinfoIndividual" :userinfo-individual="userinfoIndividual" @on-close="hideUserinfoIndividual"/>
        <UserAdminUserinfoModi :view-userinfo-modi-individual="viewUserinfoModiIndividual" :userinfo-individual="userinfoIndividual" @on-close="hideUserinfoModiIndividual" :data-group-children="dataGroupChildren" :data-duty-children="dataDutyChildren" :data-job-level-children="dataJobLevelChildren" :data-auth-optional-children="dataAuthOptionalChildren" :data-auth-selected-children="dataAuthSelectedChildren" @on-fresh="fetchData"/>
        <UserAdminUserinfoCreate :view-userinfo-create-individual="viewUserinfoCreateIndividual" @on-close="hideUserinfoCreateIndividual" :data-group-children="dataGroupChildren" :data-duty-children="dataDutyChildren" :data-job-level-children="dataJobLevelChildren" :data-auth-optional-children="dataAuthOptionalChildren" :data-auth-selected-children="dataAuthSelectedChildren" @on-fresh="refresh"/>
        <UserAdminUserinfoImport :view-userinfo-import-modal="viewUserinfoImportModal" @on-close="hideUserinfoImportModal" @on-fresh="fetchData"/>
    </div>
</template>

<script type="text/javascript">
import handlerUserAdmin from '../../javascripts/handlers/handlerUserAdmin.js';
import Utils from '../../../../../lib/com.lz.mevn.util.utils/Utils.js';
const utils = new Utils();
export default {
    name: 'UserAdminAccountAdmin',
    components: {
        UserAdminUserinfoRead   : require('./UserAdminUserinfoRead.vue').default,
        UserAdminUserinfoModi   : require('./UserAdminUserinfoModi.vue').default,
        UserAdminUserinfoCreate : require('./UserAdminUserinfoCreate.vue').default,
        UserAdminUserinfoImport : require('./UserAdminUserinfoImport.vue').default
    },
    data () {
        return {
            spinShow: true,
            pageTotal: 100,
            pageNum: 1,
            pageSize: 10,
            allData: [],
            userinfo: [
                {
                    username: '',
                    activation: true,
                    realname: '',
                    gender: '',
                    dateOfBirth: '',
                    workId: '',
                    group: [],
                    duty: [],
                    jobLevel: [],
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
                }
            ],
            data: [
                // {
                //     username   : 'liuzhaomax',
                //     realname   : '刘昭马克西',
                //     workId     : '888888888',
                //     duty       : ['程序员'],
                //     jobLevel   : ['A00'],
                //     group      : ['董事局', '总经办', 'xxxxx中心', 'xxxxx部门'],
                //     role       : '系统管理员',
                //     activation : true
                // }
            ],
            columns: [
                {
                    type: 'selection',
                    align: 'center',
                    width: 50
                }, {
                    title: '用户名',
                    key: 'username',
                    align: 'center'
                }, {
                    title: '姓名',
                    key: 'realname',
                    align: 'center'
                }, {
                    title: '工号',
                    key: 'workId',
                    align: 'center'
                }, {
                    title: '职位/职级',
                    key: 'duty',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('span', { style: { display: 'block' } }, this.diplayDutyData(h, params)),
                            h('span', { style: { display: 'block' } }, this.diplayJobLevelData(h, params))
                        ]);
                    }
                }, {
                    title: '部门',
                    key: 'group',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', this.diplayGroupData(h, params));
                    }
                }, {
                    title: '权限角色',
                    key: 'role',
                    align: 'center'
                }, {
                    title: '帐户状态',
                    key: 'activation',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('i-switch', {
                                props: { value: params.row.activation },
                                on: {
                                    'on-change': () => {
                                        handlerUserAdmin.patchAccountActivation(this, '/accountAdmin', '/activation', params.row.username, !params.row.activation);
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 260,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: { type: 'success' },
                                style: { marginRight: '5px' },
                                on: {
                                    click: () => {
                                        this.showUserinfoIndividual(params);
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: { type: 'warning' },
                                style: { marginRight: '5px' },
                                on: {
                                    click: () => {
                                        this.showUserinfoModiIndividual(params);
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: { type: 'error' },
                                style: { marginRight: '5px' },
                                on: {
                                    click: () => {
                                        this.deleteAccount(params);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            searchSelectList: [
                {
                    value: 'username',
                    label: '用户名'
                }, {
                    value: 'realname',
                    label: '姓名'
                }, {
                    value: 'workId',
                    label: '工号'
                }, {
                    value: 'duty',
                    label: '职位'
                }, {
                    value: 'jobLevel',
                    label: '职级'
                }, {
                    value: 'group',
                    label: '部门'
                }, {
                    value: 'role',
                    label: '权限角色'
                }
            ],
            viewUserinfoIndividual: false,
            viewUserinfoModiIndividual: false,
            viewUserinfoCreateIndividual: false,
            userinfoIndividual: {},
            dataGroupChildren: [],
            dataDutyChildren: [],
            dataJobLevelChildren: [],
            dataAuthOptionalChildren: [],
            dataAuthSelectedChildren: [],
            viewUserinfoImportModal: false
        }
    },
    mounted () {
        this.fetchData();
    },
    methods: {
        /**
         * @method
         * 刷新页面
         *
         * @return {}
         */
        refresh () {
            this.$router.go(0);
        },

        /**
         * @method
         * 跳转相应分页页码
         *
         * @param  {Number} pageNum 分页页码
         * @return {}
         */
        changePage (pageNum) {
            this.pageNum = pageNum;
            this.displayData();
        },

        /**
         * @method
         * 修改单页数据长度
         *
         * @param  {Number} pageSize 单页数据长度
         * @return {}
         */
        changePageSize (pageSize) {
            this.pageSize = pageSize;
            this.displayData();
        },

        /**
         * @method
         * 抓取后台数据
         *
         * @return {}
         */
        fetchData () {
            this.spinShow = true;
            let searchItem = this.$refs.searchSelect.publicValue;
            let searchVal = this.$refs.searchInput.$refs.input.value;
            handlerUserAdmin.postAccountAdmin(this, '/accountAdmin', searchItem, searchVal);
            handlerUserAdmin.getUserAdmin(this, '/accountAdmin').then((val) => {
                this.pageTotal = val.length;
                this.userinfo = val;
                this.allData = val;
                this.displayData();
            });
            this.toggleSpin(500);
        },

        /**
         * @method
         * 分页展示数据
         *
         * @return {}
         */
        displayData () {
            let start = (this.pageNum - 1) * this.pageSize;
            let end = this.pageNum * this.pageSize;
            this.data = this.allData.slice(start, end);
        },

        /**
         * @method
         * N秒后spin消失
         *
         * @param  {Number} delay 延迟时间ms
         * @return {}
         */
        toggleSpin (delay) {
            setTimeout(() => {
                this.spinShow = false;
            }, delay);
        },

        /**
         * @method
         * 分行显示所在各级部门
         *
         * @param  {Function} h      自身
         * @param  {Object}   params 参数
         * @return {Array}           单元格内每行渲染执行函数
         */
        diplayGroupData (h, params) {
            let result = [];
            for (var i = 0; i < params.row.group.length; i++) {
                result.push(h('span', { style: { display: 'block' } }, params.row.group[i]));
            }
            return result;
        },

        /**
         * @method
         * 显示职位
         *
         * @param  {Function} h      自身
         * @param  {Object}   params 参数
         * @return {Array}           单元格内每行渲染执行函数
         */
        diplayDutyData (h, params) {
            let result = '';
            for (var i = 0; i < params.row.duty.length; i++) {
                if (i === 0) {
                    result = result + params.row.duty[i];
                } else {
                    result = result + '兼' + params.row.duty[i];
                }
            }
            return result;
        },

        /**
         * @method
         * 显示职级
         *
         * @param  {Function} h      自身
         * @param  {Object}   params 参数
         * @return {Array}           单元格内每行渲染执行函数
         */
        diplayJobLevelData (h, params) {
            let result = params.row.jobLevel[0];
            return result;
        },

        /**
         * @method
         * 表每行信息查看按钮
         *
         * @param  {Object} params 参数
         * @return {}
         */
        showUserinfoIndividual (params) {
            this.viewUserinfoIndividual = true;
            for (var i = 0; i < this.userinfo.length; i++) {
                if (this.userinfo[i].username === params.row.username) {
                    this.userinfoIndividual = this.userinfo[i];
                    break;
                }
            }
        },

        /**
         * @method
         * 关闭表每行信息查看
         *
         * @return {}
         */
        hideUserinfoIndividual () {
            this.viewUserinfoIndividual = false;
        },

        /**
         * @method
         * 表每行信息修改按钮
         *
         * @param  {Object} params 参数
         * @return {}
         */
        showUserinfoModiIndividual (params) {
            this.viewUserinfoModiIndividual = true;
            for (var i = 0; i < this.userinfo.length; i++) {
                if (this.userinfo[i].username === params.row.username) {
                    this.userinfoIndividual = this.userinfo[i];
                    break;
                }
            }
            // 拿新数据权限
            handlerUserAdmin.getUserAdmin(this, '/groupAdmin').then((val) => {
                // 数据权限树生成与选择
                this.dataGroupChildren = this.checkTreeItem(val.group[0].children, this.userinfoIndividual.authorityData.group);
                this.dataDutyChildren = this.checkTreeItem(val.duty, this.userinfoIndividual.authorityData.duty);
                this.dataJobLevelChildren = this.checkTreeItem(val.jobLevel, this.userinfoIndividual.authorityData.jobLevel);
            });
            // 拿新功能权限
            utils.traverseTree(this.userinfoIndividual.authorityFunc[0].children, 'children', (el) => {
                el.expand = true;
                if (el.children) {
                    el.selected = el.authority;
                } else {
                    el.checked = el.authority;
                }
            });
            this.dataAuthOptionalChildren = this.userinfoIndividual.authorityFunc[0].children;
            this.dataAuthSelectedChildren = this.userinfoIndividual.authorityFunc[0].children;
            this.dataAuthSelectedChildren = this.createTreeDataAuthSelected(this.dataAuthSelectedChildren);
        },

        /**
         * @method
         * 为tree的具有权限的项设置选择状态
         *
         * @param  {Array} target 需要调整选中状态的tree
         * @param  {Array} source 具备选中状态的键
         * @return {Array}        调整后的tree
         */
        checkTreeItem (target, source) {
            utils.traverseTree(target, 'children', (el) => {
                el.expand = true;
                for (let i = 0; i < source.length; i++) {
                    if (el.title === source[i]) {
                        if (el.children) {
                            el.indeterminate = true;
                        } else {
                            el.checked = true;
                        }
                    }
                }
            });
            return target;
        },

        /**
         * @method
         * 关闭表每行信息修改
         *
         * @return {}
         */
        hideUserinfoModiIndividual () {
            this.viewUserinfoModiIndividual = false;
            this.fetchData();
        },

        /**
         * @method
         * 删除某用户
         *
         * @param  {Object} params 参数
         * @return {}
         */
        deleteAccount (params) {
            let username = params.row.username;
            this.$Modal.confirm({
                title: '警告',
                content: '此操作不可逆，请确认是否删除该用户？',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    this.$Message.info('点击了确定');
                    handlerUserAdmin.deleteAccount(this, '/accountAdmin', '/userDeletion', username);
                    this.$Notice.success({ title: '用户删除成功！' });
                    this.fetchData();
                },
                onCancel: () => {
                    this.$Message.info('点击了取消');
                    this.$Notice.info({ title: '用户未被删除！' });
                }
            });
        },

        /**
         * @method
         * 生成权限选定树
         *
         * @param  {Array} data 权限数据
         * @return {Array}      去掉无权限项的权限数据
         */
        createTreeDataAuthSelected (data) {
            // 功能权限选定树生成
            let result = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].authority) {
                    if (!!data[i].children && data[i].children.length !== 0) {
                        result.push({
                            title: data[i].title,
                            authority: data[i].authority,
                            expand: true,
                            children: this.createTreeDataAuthSelected(data[i].children)
                        });
                    } else {
                        result.push({
                            title: data[i].title,
                            authority: data[i].authority,
                            expand: true
                        });
                    }
                }
            }
            return result;
        },

        /**
         * @method
         * 新增用户按钮
         *
         * @param  {Object} params 参数
         * @return {}
         */
        showUserinfoCreateIndividual (params) {
            this.viewUserinfoCreateIndividual = true;
            handlerUserAdmin.getUserAdmin(this, '/groupAdmin').then((val) => {
                utils.traverseTree(val.group[0].children, 'children', (el) => {
                    el.expand = true;
                });
                utils.traverseTree(val.duty, 'children', (el) => {
                    el.expand = true;
                });
                utils.traverseTree(val.jobLevel, 'children', (el) => {
                    el.expand = true;
                });
                // 数据权限树生成
                this.dataGroupChildren = val.group[0].children;
                this.dataDutyChildren = val.duty;
                this.dataJobLevelChildren = val.jobLevel;
            });
            handlerUserAdmin.getUserAdmin(this, '/authorityAdmin').then((val) => {
                utils.traverseTree(val[val.length - 1].authorityFunc[0].children, 'children', (el) => {
                    el.expand = true;
                });
                // 功能权限选择树生成
                this.dataAuthOptionalChildren = val[val.length - 1].authorityFunc[0].children;
                this.dataAuthSelectedChildren = val[val.length - 1].authorityFunc[0].children;
                this.dataAuthSelectedChildren = this.createTreeDataAuthSelected(this.dataAuthSelectedChildren);
            });
        },

        /**
         * @method
         * 关闭新增用户
         *
         * @return {}
         */
        hideUserinfoCreateIndividual () {
            this.viewUserinfoCreateIndividual = false;
            this.fetchData();
        },

        /**
         * @method
         * 获取表格中被选中的行数据
         *
         * @return {Array} 被选中的行数据的用户名数组
         */
        getTableSelection () {
            let arrSelection = this.$refs.table.getSelection();
            let result = [];
            for (var i = 0; i < arrSelection.length; i++) {
                result.push(arrSelection[i].username);
            }
            return result;
        },

        /**
         * @method
         * 批量重置密码响应
         *
         * @return {}
         */
        resetPassword () {
            let arrUsername = this.getTableSelection();
            if (arrUsername.length) {
                handlerUserAdmin.patchUserPassword(this, '/accountAdmin', '/passwordReset', arrUsername);
                this.$Notice.success({ title: '重置密码成功！' });
                this.$refs.table.selectAll(false);
            } else {
                this.$Notice.warning({ title: '请先勾选用户！' });
            }
        },

        /**
         * @method
         * 批量启用和批量禁用
         *
         * @param  {Boolean} status 需要达到的激活状态，true：批量启用，false：批量禁用
         * @return {}
         */
        toggleActivationStatus (status) {
            let arrUsername = this.getTableSelection();
            if (arrUsername.length) {
                if (status) {
                    handlerUserAdmin.patchAccountsActivation(this, '/accountAdmin', '/accountsActivation', arrUsername, status);
                    this.$Notice.success({ title: '批量启用成功！' });
                    this.$refs.table.selectAll(false);
                    this.fetchData();
                } else {
                    handlerUserAdmin.patchAccountsActivation(this, '/accountAdmin', '/accountsActivation', arrUsername, status);
                    this.$Notice.success({ title: '批量禁用成功！' });
                    this.$refs.table.selectAll(false);
                    this.fetchData();
                }
            } else {
                this.$Notice.warning({ title: '请先勾选用户！' });
            }
        },

        /**
         * @method
         * 下载用户信息模板
         *
         * @return {}
         */
        downloadFile (MIME, itemPath, fileName) {
            handlerUserAdmin.getFile(this, '/accountAdmin', itemPath).then((val) => {
                let blob = new Blob([val], {type: MIME});
                let elementA = document.createElement('a');
                elementA.href = URL.createObjectURL(blob);
                elementA.download = fileName;
                elementA.click();
                window.URL.revokeObjectURL(elementA.href);
            });
        },

        /**
         * @method
         * 打开用户Excel上传对话框
         *
         * @return {}
         */
        showUserinfoImportModal () {
            this.viewUserinfoImportModal = true;
        },

        /**
         * @method
         * 关闭用户Excel上传对话框
         *
         * @return {}
         */
        hideUserinfoImportModal () {
            this.viewUserinfoImportModal = false;
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
.userAdminAccountAdmin {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    left: 200px;
    padding-right: 200px;
}

.layout {
    position: fixed;
    height: 100%;
    left: 200px;
    right: 0;
    overflow: auto;
}

.content {
    padding: 0 16px 16px 16px;
    position: relative;
}

.breadcrumb {
    margin: 16px 0;
}

.card {
    margin-bottom: 16px;
    width: 100%;
    padding: 16px;
    height: 100%;
    min-height: 87.5vh;
}

.button {
    float: left;
    margin-right: 10px;
}

.searchInput {
    float: right;
    margin-left: 10px;
    width: 300px;
}

.searchSelect {
    float: right;
    margin-left: 10px;
    width: 150px;
}

.table {
    margin: 50px 0 16px;
}

.page {
    float: right;
}

.lastRow {
    height: 16px;
}

.spinShade {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $spinShade;
}

.spin {
    /* 因为spin的large是32px */
    position: absolute;
    width: 32px;
    height: 32px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>
