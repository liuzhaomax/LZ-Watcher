<template>
    <Row class="row-north">
        <Col class="col-north" span="12">
            <div class="panel-north-east-west">
                &nbsp;
            </div>
        </Col>
        <Col class="col-north" span="12">
            <div class="panel-north-east-east">
                <div class="btn-login" @click="openDialog()">{{ btnLogin }}</div>
                <DialogLogin :dialog-login="dialogLogin" @on-close="closeDialog()"/>
            </div>
        </Col>
    </Row>
</template>

<script type="text/javascript">
import getPublicKey from '../../javascripts/handlers/getPublicKey.js';
export default {
    name: 'EntrancePanelNone',
    components: {
        DialogLogin: require('../login/DialogLogin.vue').default
    },
    data () {
        return {
            btnLogin: '登录',
            dialogLogin: false
        }
    },
    methods: {
        /**
         * @method
         * 打开登录框，获取rsa公钥
         *
         * @return {}
         */
        openDialog () {
            this.dialogLogin = true;
            getPublicKey(this);
        },

        /**
         * @method
         * 关闭登录框
         *
         * @return {}
         */
        closeDialog () {
            this.dialogLogin = false;
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
@import '../../stylesheets/gSize.scss';

.row-north {
    color: white;
    font-size: $titleBarContent;
}

.col-north {
    background-color: $grayB4;
}

.panel-north-east-west {
    padding: $titleBarTopBottomPadding 0;
}

.panel-north-east-east {
    padding: $titleBarTopBottomPadding 18px $titleBarTopBottomPadding 0;
    float: right;
}

.btn-login {
    cursor: pointer;
}

.btn-login:hover {
    color: $LightPrimary;
}

</style>
