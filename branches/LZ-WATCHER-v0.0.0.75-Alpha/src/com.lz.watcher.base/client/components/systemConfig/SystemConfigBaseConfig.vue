<template>
    <div class="systemConfigBaseConfig">
        <Layout class="layout">
            <Content class="content">
                <Breadcrumb class="breadcrumb">
                    <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                    <BreadcrumbItem>系统设置</BreadcrumbItem>
                    <BreadcrumbItem>基本设置</BreadcrumbItem>
                </Breadcrumb>
                <Card class="card">
                    <Row>
                        <Col span="3" class="key" >
                            <span class="config_value" @click="changeSystemTitle()">系统名称：</span>
                        </Col>
                        <Col span="1">&nbsp;</Col>
                        <Col span="8" class="val" >
                            <span class="config_value" v-show="systemTitleShown" @click="changeSystemTitle()">{{ systemTitle }}</span>
                            <Input class="input" v-model="systemTitleVal" ref="systemTitleInput" v-show="!systemTitleShown" size="small" @on-blur="changeSystemTitle()" @keyup.enter.native="$event.target.blur" clearable autofocus/>
                        </Col>
                        <Col span="12">

                        </Col>
                    </Row>
                    <Row>
                        <Col span="3" class="key" >
                            <span class="config_value" @click="changePasswordDefault()">默认密码：</span>
                        </Col>
                        <Col span="1">&nbsp;</Col>
                        <Col span="8" class="val" >
                            <span class="config_value" v-show="passwordDefaultShown" @click="changePasswordDefault()">{{ passwordDefault }}</span>
                            <Input class="input" v-model="passwordDefaultVal" ref="passwordDefaultInput" v-show="!passwordDefaultShown" size="small" @on-blur="changePasswordDefault()" @keyup.enter.native="$event.target.blur" clearable autofocus/>
                        </Col>
                        <Col span="12">

                        </Col>
                    </Row>
                    <Row>
                        <Col span="3" class="key" >
                            <span class="config_value">运行时间：</span>
                        </Col>
                        <Col span="1">&nbsp;</Col>
                        <Col span="8" class="val" >
                            除系统管理员外，其他人员只能在指定时间访问（待权限模块完成）
                        </Col>
                        <Col span="12">

                        </Col>
                    </Row>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script type="text/javascript">
import handlerSystemConfig from '../../javascripts/handlers/handlerSystemConfig.js';
export default {
    name: 'SystemConfigBaseConfig',
    components: {},
    data () {
        return {
            systemTitle: 'systemTitle',
            systemTitleShown: true,
            systemTitleVal: '',
            passwordDefault: 'passwordDefault',
            passwordDefaultShown: true,
            passwordDefaultVal: ''
        }
    },
    mounted () {
        handlerSystemConfig.getSystemConfig(this, '/baseConfig').then((val) => {
            this.systemTitle = val.systemTitle;
            this.passwordDefault = val.passwordDefault;
        });
    },
    methods: {
        /**
         * @method
         * 改变系统名称，对输入框回车和失去焦点触发
         *
         * @return {}
         */
        changeSystemTitle () {
            this.$Message.info('系统名称 --> ' + (this.systemTitleShown ? '编辑中' : '编辑完成'));
            this.systemTitleShown = !this.systemTitleShown;
            this.systemTitleVal = this.systemTitle;
            if (this.systemTitleShown) {
                if (this.$refs.passwordDefaultInput.value.length < 4) {
                    this.$Notice.warning({
                        title: '修改系统名称失败！',
                        desc: '系统名称过短，应大于等于4个字符！'
                    });
                } else if (this.$refs.passwordDefaultInput.value.length > 128) {
                    this.$Notice.warning({
                        title: '修改系统名称失败！',
                        desc: '系统名称过长，应小于等于128个字符！'
                    });
                } else {
                    handlerSystemConfig.patchItem(this, '/baseConfig', '/systemTitle', this.$refs.systemTitleInput.value);
                    handlerSystemConfig.getSystemConfig(this, '/baseConfig').then((val) => {
                        this.systemTitle = val.systemTitle;
                    });
                    this.$Notice.success({ title: '系统名称修改成功！' });
                }
            }
        },

        /**
         * @method
         * 修改默认密码
         *
         * @return {}
         */
        changePasswordDefault () {
            this.$Message.info('默认密码 --> ' + (this.passwordDefaultShown ? '编辑中' : '编辑完成'));
            this.passwordDefaultShown = !this.passwordDefaultShown;
            this.passwordDefaultVal = this.passwordDefault;
            if (this.passwordDefaultShown) {
                if (this.$refs.passwordDefaultInput.value.length < 4) {
                    this.$Notice.warning({
                        title: '修改默认密码失败！',
                        desc: '默认密码过短，应大于等于4个字符！'
                    });
                } else if (this.$refs.passwordDefaultInput.value.length > 32) {
                    this.$Notice.warning({
                        title: '修改默认密码失败！',
                        desc: '默认密码过长，应小于等于32个字符！'
                    });
                } else {
                    handlerSystemConfig.patchItem(this, '/baseConfig', '/passwordDefault', this.$refs.passwordDefaultInput.value);
                    handlerSystemConfig.getSystemConfig(this, '/baseConfig').then((val) => {
                        this.passwordDefault = val.passwordDefault;
                    });
                    this.$Notice.success({ title: '默认密码修改成功！' });
                }
            }
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
.systemConfigBaseConfig {
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

.config_value:hover {
    color: $LightPrimary;
    cursor: pointer;
}

.input {
    width: 300px;
}

.key {
    text-align: right;
    background-color: $bgKey;
}

.val {
    text-align: left;
}
</style>
