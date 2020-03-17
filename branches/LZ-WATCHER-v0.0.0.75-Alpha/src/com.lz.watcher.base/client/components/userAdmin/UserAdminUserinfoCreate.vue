<template>
    <div class="userinfo-create">
        <Drawer class="drawer-userinfo-create"
            :value="viewUserinfoCreateIndividual"
            width=900
            :closable="false"
            :mask-closable="true"
            @on-close="cancel()">
            <p slot="header" class="drawer-userinfo-create-header">新增用户</p>
            <div class="drawer-userinfo-create-content" ref="content">
                <Tabs class="tabs" value="tab1">
                    <TabPane class="tab1" label="基础信息" name="tab1">
                        <p class="drawer-userinfo-create-title">用户信息</p>
                        <Row>
                            <Col span="3">
                                <p class="userinfo-create-p"><span style="color: red;">*</span>用户名 ：</p>
                            </Col>
                            <Col span="21">
                                <Input class="userinfo-create-input" v-model="userinfoObj.username" ref="username" placeholder=" 用户名" clearable/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="3">
                                <p class="userinfo-create-p"><span style="color: red;">*</span>姓名 ：</p>
                            </Col>
                            <Col span="21">
                                <Input class="userinfo-create-input" v-model="userinfoObj.realname" ref="realname" placeholder=" 姓名" clearable/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="3">
                                <p class="userinfo-create-p-gender">性别 ：</p>
                            </Col>
                            <Col span="21">
                                <RadioGroup class="userinfo-create-input" v-model="userinfoObj.gender" ref="gender">
                                    <Radio label="男"></Radio>
                                    <Radio label="女"></Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="3">
                                <p class="userinfo-create-p">出生日期 ：</p>
                            </Col>
                            <Col span="21">
                                <DatePicker class="userinfo-create-input-date" v-model="userinfoObj.dateOfBirth" ref="dateofbirth" type="date" :start-date="new Date(2000, 5, 15)" placeholder="yyyy-mm-dd"></DatePicker>
                            </Col>
                        </Row>
                        <Divider/>
                        <p class="drawer-userinfo-create-title">工作信息</p>
                        <Row>
                            <Col span="3">
                                <p class="userinfo-create-p">工号 ：</p>
                            </Col>
                            <Col span="21">
                                <Input class="userinfo-create-input" v-model="userinfoObj.workId" ref="workId" placeholder=" 工号" clearable/>
                            </Col>
                        </Row>
                        <Divider/>
                        <p class="drawer-userinfo-create-title">联系方式</p>
                        <Row>
                            <Col span="3">
                                <p class="userinfo-create-p">联系电话 ：</p>
                            </Col>
                            <Col span="21">
                                <Input class="userinfo-create-input" v-model="userinfoObj.phone" ref="phone" placeholder=" 联系电话" clearable/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="3">
                                <p class="userinfo-create-p">微信号 ：</p>
                            </Col>
                            <Col span="21">
                                <Input class="userinfo-create-input" v-model="userinfoObj.wechat" ref="wechat" placeholder=" 微信号" clearable/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="3">
                                <p class="userinfo-create-p">电子邮箱 ：</p>
                            </Col>
                            <Col span="21">
                                <Input class="userinfo-create-input" v-model="userinfoObj.email" ref="email" placeholder=" 电子邮箱" clearable/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="3">
                                <p class="userinfo-create-p">邮寄地址 ：</p>
                            </Col>
                            <Col span="21">
                                <Input class="userinfo-create-input" v-model="userinfoObj.address" ref="address" placeholder=" 办公地址或家庭住址" clearable/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane class="tab2" label="用户分组" name="tab2">
                        <Row class="row">
                            <Col span="10">
                                <Tree :data="dataGroup" :render="renderContent" ref="treeGroup" show-checkbox multiple @on-check-change="modifyAuthorityDataGroup"></Tree>
                            </Col>
                            <Col span="7">
                                <Tree :data="dataDuty" :render="renderContent" ref="treeDuty" show-checkbox multiple @on-check-change="modifyAuthorityDataDuty"></Tree>
                            </Col>
                            <Col span="7">
                                <Tree :data="dataJobLevel" :render="renderContent" ref="treeJobLevel" show-checkbox multiple @on-check-change="modifyAuthorityDataJobLevel"></Tree>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane class="tab3" label="功能权限" name="tab3">
                        <div class="button">
                            <Button class="button" v-for="authDataObj in roleAuthorities" :key="authDataObj.role" ref="role" @click="changeRole(authDataObj)">{{ authDataObj.role }}</Button>
                        </div>
                        <Split v-model="split" class="split" ref="split">
                            <Layout slot="left" class="split-panel-left" ref="splitPanelLeft">
                                <Tree :data="dataAuthOptional" :render="renderContent" ref="treeAuthOptional" show-checkbox multiple @on-check-change="modifyAuthorityFuncPartial"></Tree>
                            </Layout>
                            <div slot="trigger" class="trigger" ref="trigger"></div>
                            <Layout slot="right" class="split-panel-right">
                                <Tree :data="dataAuthSelected" :render="renderContent"></Tree>
                            </Layout>
                        </Split>
                    </TabPane>
                </Tabs>
            </div>
            <div class="drawer-userinfo-create-footer">
                <Button class="drawer-userinfo-create-btn" @click="cancel()">取消</Button>
                <Button class="drawer-userinfo-create-btn" type="primary" @click="ok()">确定</Button>
            </div>
        </Drawer>
    </div>
</template>

<script type="text/javascript">
import handlerUserAdmin from '../../javascripts/handlers/handlerUserAdmin.js';
import Utils from '../../../../../lib/com.lz.mevn.util.utils/Utils.js';
const utils = new Utils();
export default {
    name: 'UserinfoCreateIndividual',
    data () {
        return {
            userinfoObj: {
                username: '',
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
            roleAuthorities: [],
            roleOn: '',
            roleOnPrev: '',
            split: 0.5,
            dataGroup: [
                {
                    title: '组织架构',
                    expand: true,
                    selected: true,
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
            dataDuty: [
                {
                    title: '职位',
                    expand: true,
                    selected: true,
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
            dataJobLevel: [
                {
                    title: '职级',
                    expand: true,
                    selected: true,
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
            dataAuthOptional: [
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
            dataAuthSelected: [
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
    props: {
        viewUserinfoCreateIndividual: Boolean,
        userinfoIndividual: Object,
        dataGroupChildren: Array,
        dataDutyChildren: Array,
        dataJobLevelChildren: Array,
        dataAuthOptionalChildren: Array,
        dataAuthSelectedChildren: Array
    },
    watch: {
        userinfoIndividual (val) {
            for (let key in this.userinfoObj) {
                this.userinfoObj[key] = this.userinfoIndividual[key];
            }
            // 高亮用户对应的角色
            for (var j = 0; j < this.roleAuthorities.length; j++) {
                if (this.roleOn) {
                    if (this.roleAuthorities[j].role === this.roleOn) {
                        this.$refs.role[j].type = 'primary';
                    } else {
                        this.$refs.role[j].type = 'default';
                    }
                } else {
                    if (this.roleAuthorities[j].role === this.userinfoObj.role) {
                        this.$refs.role[j].type = 'primary';
                    } else {
                        this.$refs.role[j].type = 'default';
                    }
                }
            }
        },
        // 先渲染，后传值，所以需要watch
        dataGroupChildren (val) {
            this.dataGroup[0].children = this.dataGroupChildren;
        },
        dataDutyChildren (val) {
            this.dataDuty[0].children = this.dataDutyChildren;
        },
        dataJobLevelChildren (val) {
            this.dataJobLevel[0].children = this.dataJobLevelChildren;
        },
        dataAuthOptionalChildren (val) {
            this.dataAuthOptional[0].children = this.dataAuthOptionalChildren;
            // 清除根节点选择状态，防止全选后，再打开是全选的状态，而不是用户数据状态
            let rootDataOptional = this.$refs.treeAuthOptional.getCheckedNodes()[0];
            if (rootDataOptional) {
                if (rootDataOptional.title === this.dataAuthOptional[0].title) {
                    rootDataOptional.checked = false;
                }
            }
        },
        dataAuthSelectedChildren (val) {
            this.dataAuthSelected[0].children = this.dataAuthSelectedChildren;
        }
    },
    mounted () {
        // 隐藏自动滚动条
        this.$refs.content.parentNode.style.overflow = 'hidden';
        // 自适应的splitTrigger
        this.$refs.split.$el.addEventListener('scroll', this.handleScrollAuthFunc);
        this.fetchData();
    },
    methods: {
        /**
         * @method
         * 自适应的splitTrigger，trigger自适应后，移除EventListener
         *
         * @return {}
         */
        handleScrollAuthFunc () {
            let styleTreeHeight = (this.$refs.splitPanelLeft.$el.offsetHeight - 24) + 'px';
            this.$refs.trigger.style.height = styleTreeHeight;
            this.$refs.split.$el.removeEventListener('scroll', this.handleScrollAuthFunc)
        },

        /**
         * @method
         * 抓取后台数据
         *
         * @return {}
         */
        fetchData () {
            handlerUserAdmin.getUserAdmin(this, '/authorityAdmin').then((val) => {
                this.roleAuthorities = val;
            });
        },

        /**
         * @method
         * 修改分组数据权限事件响应
         *
         * @param  {Array}  selectedArray 操作项数组
         * @param  {Object} selectedItem  当前操作项
         * @return {}
         */
        modifyAuthorityDataGroup (selectedArray, selectedItem) {
            for (var i = 0; i < selectedArray.length; i++) {
                if (selectedArray[i] !== selectedItem) {
                    selectedArray[i].checked = false;
                }
                utils.traverseTree(this.dataGroup[0].children, 'children', (el) => {
                    if (el.children) {
                        for (var i = 0; i < el.children.length; i++) {
                            if (!el.children[i].checked || !el.children[i].selected || !el.children[i].indeterminate) {
                                el.indeterminate = false;
                                el.selected = false;
                            }
                        }
                    }
                });
            }
        },

        /**
         * @method
         * 修改职位数据权限事件响应
         *
         * @param  {Array}  selectedArray 操作项数组
         * @param  {Object} selectedItem  当前操作项
         * @return {}
         */
        modifyAuthorityDataDuty (selectedArray, selectedItem) {

        },

        /**
         * @method
         * 修改职级数据权限事件响应
         *
         * @param  {Array}  selectedArray 操作项数组
         * @param  {Object} selectedItem  当前操作项
         * @return {}
         */
        modifyAuthorityDataJobLevel (selectedArray, selectedItem) {
            for (var i = 0; i < selectedArray.length; i++) {
                if (selectedArray[i] !== selectedItem) {
                    selectedArray[i].checked = false;
                }
                utils.traverseTree(this.dataJobLevel[0].children, 'children', (el) => {
                    if (el.children) {
                        for (var i = 0; i < el.children.length; i++) {
                            if (!el.children[i].checked || !el.children[i].selected || !el.children[i].indeterminate) {
                                el.indeterminate = false;
                                el.selected = false;
                            }
                        }
                    }
                });
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
         * 修改角色全部替换权限树
         *
         * @param  {Object} operatingRoleItem 当前选择的角色对象
         * @return {}
         */
        modifyAuthorityFuncAll (operatingRoleItem) {
            // 清除根节点选择状态
            let rootAuthOptional = this.$refs.treeAuthOptional.getCheckedNodes()[0];
            if (rootAuthOptional) { rootAuthOptional.checked = false; }
            for (var i = 0; i < this.roleAuthorities.length; i++) {
                if (this.roleAuthorities[i].role === operatingRoleItem.role) {
                    this.$refs.role[i].type = 'primary';
                    this.dataAuthOptional[0].children = this.roleAuthorities[i].authorityFunc[0].children;
                    this.dataAuthOptional[0].children = this.createTreeDataAuthOptional(this.dataAuthOptional[0].children);
                    this.dataAuthSelected[0].children = this.roleAuthorities[i].authorityFunc[0].children;
                    this.dataAuthSelected[0].children = this.createTreeDataAuthSelected(this.dataAuthSelected[0].children);
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
        createTreeDataAuthOptional (data) {
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
                        children: this.createTreeDataAuthOptional(data[i].children)
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
            utils.traverseTree(this.dataAuthOptional[0].children, 'children', (el) => {
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
            this.dataAuthSelected[0].children = this.createTreeDataAuthSelected(this.dataAuthOptional[0].children);
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
                            cursor: 'default'
                        }
                    }, data.title)
                ])
            ]);
        },

        /**
         * @method
         * 创建发送需要的分组数组
         *
         * @param  {Array} data 数据权限树
         * @return {Array}      分组数组
         */
        createArrayUserinfoAuthDataGroup4Update (data) {
            let result = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].checked || data[i].indeterminate) {
                    result.push(data[i].title);
                    if (!!data[i].children && data[i].children.length !== 0) {
                        let resultChildren = this.createArrayUserinfoAuthDataGroup4Update(data[i].children);
                        for (var j = 0; j < resultChildren.length; j++) {
                            result.push(resultChildren[j]);
                        }
                    }
                }
            }
            return result;
        },

        /**
         * @method
         * 创建发送需要的职位数组
         *
         * @param  {Array} data 数据权限树
         * @return {Array}      职位数组
         */
        createArrayUserinfoAuthDataDuty4Update (data) {
            let result = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].checked || data[i].indeterminate) {
                    result.push(data[i].title);
                }
            }
            return result;
        },

        /**
         * @method
         * 创建发送需要的职级数组
         *
         * @param  {Array} data 数据权限树
         * @return {Array}      职级数组
         */
        createArrayUserinfoAuthDataJobLevel4Update (data) {
            let result = [];
            let resultChildren;
            for (var i = 0; i < data.length; i++) {
                if (data[i].checked || data[i].indeterminate) {
                    if (!!data[i].children && data[i].children.length !== 0) {
                        resultChildren = this.createArrayUserinfoAuthDataJobLevel4Update(data[i].children);
                    } else {
                        result.push(data[i].title);
                    }
                }
            }
            if (result.length !== 0) {
                return result;
            } else {
                return resultChildren;
            }
        },

        /**
         * @method
         * 创建发送需要的功能权限树
         *
         * @param  {Array} data 带杂质的功能权限树
         * @return {Array}      不带杂质的功能权限树
         */
        createTreeUserinfoAuthFunc4Update (data) {
            // 去掉checked，selected，indeterminate属性
            let result = [];
            for (var i = 0; i < data.length; i++) {
                if (!!data[i].children && data[i].children.length !== 0) {
                    result.push({
                        title: data[i].title,
                        authority: data[i].checked || data[i].indeterminate ? data[i].checked || data[i].indeterminate : false,
                        children: this.createTreeUserinfoAuthFunc4Update(data[i].children)
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
         * 确定按钮事件响应
         * 请求：新建用户
         *
         * @return {}
         */
        ok () {
            let dateOfBirth = this.$refs.dateofbirth.value;
            let dateOfBirthStr = '';
            if (typeof dateOfBirth === 'object') {
                dateOfBirthStr = utils.formatDate(dateOfBirth);
            } else {
                dateOfBirthStr = dateOfBirth;
            }
            let params = {
                username    : this.$refs.username.value,
                dateOfBirth : dateOfBirthStr,
                realname    : this.$refs.realname.value,
                gender      : this.$refs.gender.value,
                workId      : this.$refs.workId.value,
                phone       : this.$refs.phone.value,
                wechat      : this.$refs.wechat.value,
                email       : this.$refs.email.value,
                address     : this.$refs.address.value,
                role          : this.roleOn ? this.roleOn : this.userinfoObj.role,
                authorityFunc : this.createTreeUserinfoAuthFunc4Update(this.dataAuthOptional[0].children),
                authorityData : {
                    group: ['root'].concat(this.createArrayUserinfoAuthDataGroup4Update(this.dataGroup[0].children)),
                    duty: this.createArrayUserinfoAuthDataDuty4Update(this.dataDuty[0].children),
                    jobLevel: this.createArrayUserinfoAuthDataJobLevel4Update(this.dataJobLevel[0].children)
                }
            }
            this.$Message.info('点击了确定');
            if (!params.username || !params.realname) {
                this.$Notice.warning({
                    title: '新增用户失败！',
                    desc: '用户名或姓名未填！'
                });
            } else if (params.username.length < 4) {
                this.$Notice.warning({
                    title: '新增用户失败！',
                    desc: '用户名过短，应大于等于4个字符！'
                });
            } else if (params.username.length > 32) {
                this.$Notice.warning({
                    title: '新增用户失败！',
                    desc: '用户名过长，应小于等于32个字符！'
                });
            } else {
                handlerUserAdmin.postUserinfo(this, '/accountAdmin', '/userinfo', params).then((val) => {
                    if (val.process === 'success') {
                        this.$emit('on-close', false);
                        this.$Notice.success({ title: '新增用户成功！' });
                        setTimeout(() => {
                            this.$emit('on-fresh');
                        }, 300);
                    } else if (val.process === 'usernameRepeated') {
                        this.$Notice.error({
                            title: '新增用户失败！',
                            desc: '用户名重复！'
                        });
                    } else {
                        this.$Notice.error({
                            title: '新增用户失败！',
                            desc: '系统异常！'
                        });
                    }
                });
            }
        },

        /**
         * @method
         * 取消按钮事件响应
         *
         * @return {}
         */
        cancel () {
            this.$emit('on-close', false);
            this.$Message.info('点击了取消');
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
@import '../../stylesheets/gSize.scss';

.drawer-userinfo-create-header {
    font-size: $drawerUserinfoHeader;
    font-weight: bold;
    line-height: 24px;
    margin: 8px 0;
}

.drawer-userinfo-create-title {
    font-size: $drawerUserinfoTitle;
    line-height: 24px;
    margin-bottom: 16px;
}

.drawer-userinfo-create-content {
    font-size: $drawerUserinfoContent;
    min-height: 746px;
}

.drawer-userinfo-create-footer {
    position: absolute;
    width: 100%;
    bottom: 16px;
    right: 0;
    border-top: 1px solid $separationLine;
    background-color: white;
    padding: 10px 16px;
    text-align: right;
}

.drawer-userinfo-create-btn {
    margin-left: 8px;
}

.userinfo-create-p {
    margin: 13px 0;
    text-align: right;
}

.userinfo-create-p-gender {
    margin: 7px 0;
    text-align: right;
}

.userinfo-create-input {
    width: 300px;
    margin: 8px;
}

.userinfo-create-input-date {
    width: 216px;
    margin: 8px;
}

.tab1, .tab2 {
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 665px;
    max-height: 666px;
}

.split {
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 630px;
    max-height: 631px;
}

.trigger {
    background-color: rgb(245, 247, 249);
    width: 8px;
    min-height: 630px;
    border-left: 1px solid rgb(220, 222, 226);
    border-right: 1px solid rgb(220, 222, 226);
    cursor: col-resize;
}

.split-panel-left {
    padding: 10px 10px 50px 10px;
}

.split-panel-right {
    padding: 10px 10px 50px 10px;
    background-color: white;
}

.button {
    margin: 0 10px 5px 0;
}
</style>
