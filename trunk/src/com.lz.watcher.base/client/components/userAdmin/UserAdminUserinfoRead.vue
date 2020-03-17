<template>
    <div class="userinfo">
        <Drawer class="drawer-userinfo"
            :value="viewUserinfoIndividual"
            width=640
            :closable="false"
            :mask-closable="true"
            @on-close="back()">
            <p slot="header" class="drawer-userinfo-header">用户资料</p>
            <p class="drawer-userinfo-title">用户信息</p>
            <div class="drawer-userinfo-content">
                <Row>
                    <Col span="12">
                        姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名 ： {{ userinfoObj.realname }}
                    </Col>
                    <Col span="12">
                        帐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号 ： {{ userinfoObj.username }}
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别 ： {{ userinfoObj.gender }}
                    </Col>
                    <Col span="12">
                        角色权限 ： {{ userinfoObj.role }}
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        出生日期 ： {{ userinfoObj.dateOfBirth }}
                    </Col>
                </Row>
            </div>
            <Divider/>
            <p class="drawer-userinfo-title">工作信息</p>
            <div class="drawer-userinfo-content">
                <Row>
                    <Col span="12">
                        职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务 ： {{ userinfoObj.duty }}
                    </Col>
                    <Col span="12">
                        工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号 ： {{ userinfoObj.workId }}
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级 ： {{ userinfoObj.jobLevel }}
                    </Col>
                    <Col span="12">

                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        所属部门 ： {{ userinfoObj.group }}
                    </Col>
                </Row>
            </div>
            <Divider/>
            <p class="drawer-userinfo-title">联系方式</p>
            <div class="drawer-userinfo-content">
                <Row>
                    <Col span="12">
                        联系电话 ： {{ userinfoObj.phone }}
                    </Col>
                    <Col span="12">
                        电子邮箱 ： {{ userinfoObj.email }}
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        邮寄地址 ： {{ userinfoObj.address }}
                    </Col>
                </Row>
            </div>
            <div class="drawer-userinfo-footer">
                <Button class="drawer-userinfo-btn" @click="back()">返回</Button>
            </div>
        </Drawer>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'UserAdminUserinfoRead',
    components: {},
    data () {
        return {
            userinfoObj: {
                // 个人信息
                realname    : 'liuzhao',
                gender      : 'undefined',
                dateOfBirth : 'undefined',
                username    : 'undefined',
                role        : 'undefined',
                // 工作信息
                duty     : 'undefined',
                jobLevel : 'undefined',
                workId   : 'undefined',
                group    : 'undefined',
                // 联系方式
                phone   : 'undefined',
                email   : 'undefined',
                address : 'undefined'
            }
        }
    },
    props: {
        viewUserinfoIndividual: Boolean,
        userinfoIndividual: Object
    },
    watch: {
        userinfoIndividual (val) {
            for (let key in this.userinfoObj) {
                if (key === 'jobLevel') {
                    this.userinfoObj[key] = val.authorityData[key][0];
                } else if (key === 'duty') {
                    let result = '';
                    for (let i = 0; i < val.authorityData[key].length; i++) {
                        if (i === 0) {
                            result = result + val.authorityData[key][i];
                        } else {
                            result = result + '兼' + val.authorityData[key][i];
                        }
                    }
                    this.userinfoObj[key] = result;
                } else if (key === 'group') {
                    let result = '';
                    for (let i = 1; i < val.authorityData[key].length; i++) {
                        if (i === 1) {
                            result = result + val.authorityData[key][i];
                        } else {
                            result = result + '-' + val.authorityData[key][i];
                        }
                    }
                    this.userinfoObj[key] = result;
                } else {
                    this.userinfoObj[key] = val[key];
                }
            }
        }
    },
    methods: {
        /**
         * @method
         * 返回按钮事件响应
         *
         * @return {}
         */
        back () {
            this.$emit('on-close', false);
            this.$Message.info('点击了返回');
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
@import '../../stylesheets/gSize.scss';

.drawer-userinfo-header {
    font-size: $drawerUserinfoHeader;
    font-weight: bold;
    line-height: 24px;
    margin: 8px 0;
}

.drawer-userinfo-title {
    font-size: $drawerUserinfoTitle;
    line-height: 24px;
    margin-bottom: 16px;
}

.drawer-userinfo-content {
    font-size: $drawerUserinfoContent;
}

.drawer-userinfo-footer {
    position: absolute;
    width: 100%;
    bottom: 16px;
    left: 0;
    border-top: 1px solid $separationLine;
    padding: 10px 16px;
    text-align: right;
}

.drawer-userinfo-btn {
    margin-left: 8px;
}

</style>
