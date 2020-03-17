<template>
    <div class="userAdminAuthorityAdmin">
        <Layout class="layout">
            <Content class="content">
                <Breadcrumb class="breadcrumb">
                    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                    <BreadcrumbItem>用户管理</BreadcrumbItem>
                    <BreadcrumbItem>权限管理</BreadcrumbItem>
                </Breadcrumb>
                <Card class="card">
                    <div class="button">
                        <Button class="button" v-for="authDataObj in roleAuthorities" :key="authDataObj.role" ref="role" @click="changeRole(authDataObj)">{{ authDataObj.role }}</Button>
                        <!-- <Button class="button" >&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;</Button>
                        <Button class="button" >&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</Button> -->
                    </div>
                    <Split v-model="split" class="split" ref="split">
                        <Layout slot="left" class="split-panel-left" ref="splitPanelLeft">
                            <Tree class="tree" :data="dataOptional" :render="renderContent" show-checkbox multiple @on-check-change="modifyAuthorityFunc" ref="treeLeft"></Tree>
                        </Layout>
                        <div slot="trigger" class="trigger" ref="trigger"></div>
                        <Layout slot="right" class="split-panel-right">
                            <Tree :data="dataSelected" :render="renderContent"></Tree>
                        </Layout>
                    </Split>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script type="text/javascript">
import handlerUserAdmin from '../../javascripts/handlers/handlerUserAdmin.js';
import Utils from '../../../../../lib/com.lz.mevn.util.utils/Utils.js';
const utils = new Utils();
export default {
    name: 'UserAdminAuthorityAdmin',
    components: {},
    data () {
        return {
            roleAuthorities: [],
            roleOn: '',
            roleOnPrev: '',
            split: 0.5,
            dataOptional: [
                {
                    title: '可选权限',
                    expand: true,
                    selected: true,
                    checked: false,
                    disabled: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'md-cube'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', {
                                    style: {
                                        cursor: 'default'
                                    }
                                }, data.title)
                            ])
                        ]);
                    },
                    children: []
                }
            ],
            dataSelected: [
                {
                    title: '已选权限',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'md-cube'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', {
                                    style: {
                                        cursor: 'default'
                                    }
                                }, data.title)
                            ])
                        ]);
                    },
                    children: []
                }
            ]
        }
    },
    mounted () {
        // 自适应的splitTrigger
        this.$refs.split.$el.addEventListener('scroll', this.handleScroll);
        this.fetchData();
    },
    updated () {
        // 第一个角色状态为被选中，由于v-for渲染在fetchData之后，所以不能更新，$netxTick也不好用
        this.highlightInitRole();
    },
    methods: {
        /**
         * @method
         * 发送修改后的角色权限数据
         *
         * @return {}
         */
        updateRoleFuncAuthority () {
            // 提交修改
            let dataPut = {
                role: this.roleOn,
                authority: this.createTreeRoleFuncAuthority4Update(this.dataOptional[0].children)
            }
            handlerUserAdmin.putUserAdmin(this, '/authorityAdmin', '', dataPut);
            // 更新roleAuthorities
            for (var j = 0; j < this.roleAuthorities.length; j++) {
                if (this.roleAuthorities[j].role === this.roleOn) {
                    this.roleAuthorities[j].authorityFunc[0].children = dataPut.authority;
                }
            }
        },

        /**
         * @method
         * 创建发送需要的权限树
         *
         * @param  {Array} data 带杂质的权限树
         * @return {Array}      不带杂质的权限树
         */
        createTreeRoleFuncAuthority4Update (data) {
            // 去掉checked，selected，indeterminate属性
            let result = [];
            for (var i = 0; i < data.length; i++) {
                if (!!data[i].children && data[i].children.length !== 0) {
                    result.push({
                        title: data[i].title,
                        authority: data[i].checked || data[i].indeterminate,
                        children: this.createTreeRoleFuncAuthority4Update(data[i].children)
                    });
                } else {
                    result.push({
                        title: data[i].title,
                        authority: data[i].authority
                    });
                }
            }
            return result;
        },

        /**
         * @method
         * 初始加载高亮显示系统管理员角色
         *
         * @return {}
         */
        highlightInitRole () {
            let state = true;
            if (this.$refs.role) {
                for (var i = 0; i < this.$refs.role.length; i++) {
                    if (this.$refs.role[i].type === 'default') {
                        state = state && true;
                    } else {
                        state = state && false;
                    }
                }
                if (state) {
                    this.$refs.role[0].type = 'primary';
                }
            }
        },

        /**
         * @method
         * 改变角色事件响应
         *
         * @param  {Object} operatingRoleItem 当前改变成的角色对象
         * @return {}
         */
        changeRole (operatingRoleItem) {
            this.roleOn = operatingRoleItem.role;
            this.modifyAuthorityFuncAll(operatingRoleItem);
            this.roleOnPrev = this.roleOn;
        },

        /**
         * @method
         * 修改权限功能，为了与切换角色整体替换区分
         *
         * @param  {Array}  selectedArray 选择的节点数组
         * @param  {Object} selectedItem  当前操作对象
         * @return {}
         */
        modifyAuthorityFunc (selectedArray, selectedItem) {
            if (this.roleOn === this.roleOnPrev) {
                this.modifyAuthorityFuncPartial(selectedArray, selectedItem);
            }
        },

        /**
         * @method
         * 改变角色全部替换权限树
         *
         * @param  {Object} operatingRoleItem 当前选择的角色对象
         * @return {}
         */
        modifyAuthorityFuncAll (operatingRoleItem) {
            // 清除根节点选择状态
            let rootDataOptional = this.$refs.treeLeft.getCheckedNodes()[0];
            if (rootDataOptional) { rootDataOptional.checked = false; }
            for (var i = 0; i < this.roleAuthorities.length; i++) {
                if (this.roleAuthorities[i].role === operatingRoleItem.role) {
                    this.$refs.role[i].type = 'primary';
                    this.dataOptional[0].children = this.roleAuthorities[i].authorityFunc[0].children;
                    this.dataOptional[0].children = this.createTreeDataOptional(this.dataOptional[0].children);
                    this.dataSelected[0].children = this.roleAuthorities[i].authorityFunc[0].children;
                    this.dataSelected[0].children = this.createTreeDataSelected(this.dataSelected[0].children);
                } else {
                    this.$refs.role[i].type = 'default';
                }
            }
        },

        /**
         * @method
         * 生成权限选择树
         *
         * @param  {Array} data 权限数据
         * @return {Array}      无权限项的权限数据checked为false
         */
        createTreeDataOptional (data) {
            // 功能权限选择树生成
            let result = [];
            for (var i = 0; i < data.length; i++) {
                if (!!data[i].children && data[i].children.length !== 0) {
                    result.push({
                        title: data[i].title,
                        authority: data[i].authority,
                        expand: true,
                        selected: data[i].authority,
                        checked: false,
                        children: this.createTreeDataOptional(data[i].children)
                    });
                } else {
                    result.push({
                        title: data[i].title,
                        authority: data[i].authority,
                        expand: true,
                        checked: data[i].authority
                    });
                }
            }
            return result;
        },

        /**
         * @method
         * 功能权限两树联动，响应修改权限（操作选择树）事件
         *
         * @param  {Array}  selectedArray 当前操作的子树
         * @param  {Object} selectedItem  当前操作的叶子节点
         * @return {}
         */
        modifyAuthorityFuncPartial (selectedArray, selectedItem) {
            utils.traverseTree(this.dataOptional[0].children, 'children', (el) => {
                el.authority = el.checked || el.indeterminate;
                if (el.nodeKey === selectedItem.nodeKey) {
                    el.authority = selectedItem.checked || selectedItem.indeterminate;
                    if (el.children) {
                        utils.traverseTree(el.children, 'children', (ele) => {
                            ele.authority = selectedItem.checked || selectedItem.indeterminate;
                        });
                    }
                }
            });
            this.dataSelected[0].children = this.createTreeDataSelected(this.dataOptional[0].children);
            // 提交更新数据库
            this.updateRoleFuncAuthority();
        },

        /**
         * @method
         * 生成权限选定树
         *
         * @param  {Array} data 权限数据
         * @return {Array}      去掉无权限项的权限数据
         */
        createTreeDataSelected (data) {
            // 功能权限选定树生成
            let result = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].authority) {
                    if (!!data[i].children && data[i].children.length !== 0) {
                        result.push({
                            title: data[i].title,
                            authority: data[i].authority,
                            expand: true,
                            children: this.createTreeDataSelected(data[i].children)
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
         * 抓取后台数据
         *
         * @return {}
         */
        fetchData () {
            handlerUserAdmin.getUserAdmin(this, '/authorityAdmin').then((val) => {
                for (var i = 0; i < val.length; i++) {
                    utils.traverseTree(val[i].authorityFunc[0].children, 'children', (el) => {
                        el.expand = true;
                        if (el.children) {
                            el.selected = el.authority;
                            el.checked = false;
                        } else {
                            el.checked = el.authority;
                        }
                    });
                }
                this.roleAuthorities = val;
                // 载入系统管理员功能权限数据
                this.dataOptional[0].children = val[0].authorityFunc[0].children;
                this.dataSelected[0].children = val[0].authorityFunc[0].children;
                this.dataSelected[0].children = this.createTreeDataSelected(this.dataSelected[0].children);
                this.roleOn = val[0].role;
                this.roleOnPrev = val[0].role;
            });
        },

        /**
         * @method
         * 自适应的splitTrigger，trigger自适应后，移除EventListener
         *
         * @return {}
         */
        handleScroll () {
            let styleTreeHeight = (this.$refs.splitPanelLeft.$el.offsetHeight - 24) + 'px';
            this.$refs.trigger.style.height = styleTreeHeight;
            this.$refs.split.$el.removeEventListener('scroll', this.handleScroll)
        },

        /**
         * @method
         * 渲染树
         *
         * @param  {Object} h            vue对象
         * @param  {Object} options.root 父节点
         * @param  {Object} options.node 当前节点
         * @param  {Object} options.data 数据
         * @return {}
         */
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-folder'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', {
                        style: {
                            cursor: 'pointer'
                        }
                    }, data.title)
                ])
            ]);
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
.userAdminAuthorityAdmin {
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

.split {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 665px;
}

.trigger {
    background-color: rgb(245, 247, 249);
    width: 8px;
    min-height: 665px;
    border-left: 1px solid rgb(220, 222, 226);
    border-right: 1px solid rgb(220, 222, 226);
    cursor: col-resize;
}

.split-panel-left {
    padding: 10px;
}

.split-panel-right {
    padding: 10px;
    background-color: white;
}

.button {
    margin: 0 10px 10px 0;
}
</style>
