<template>
    <div class="dialogLogin">
        <Modal class="dialogLogin-modal"
            :value="dialogLogin"
            title="用户登录"
            @on-ok="ok()"
            @on-cancel="cancel()">
            <Input class="dialogLogin-input" v-model="username" ref="username" placeholder=" 用户名" size="large" clearable autofocus/>
            <br><br>
            <Input class="dialogLogin-input" v-model="password" ref="password" placeholder=" 密码" size="large" clearable type="password" @keyup.enter.native="ok()"/>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel()">取消</Button>
                <Button type="primary" size="large" @click="ok()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script type="text/javascript">
import JsEncrypt from 'jsencrypt';
export default {
    name: 'DialogLogin',
    data () {
        return {
            username: '',
            password: ''
        }
    },
    props: {
        dialogLogin: Boolean
    },
    methods: {
        /**
         * @method
         * 确定按钮事件响应
         * 请求：post -> 用户名 密码
         *
         * @return {}
         */
        ok () {
            this.$Message.info('点击了确定');
            let params = {
                username: this.$refs.username.value,
                password: this.passwordEncrypt(this.$refs.password.value)
            }
            this.$ajax({
                method: 'post',
                url: '/home',
                timeout: 60000,
                responseType: 'json',
                data: params
            }).then((res) => {
                if (!!res.data && res.data.permission === true) {
                    this.username = '';
                    this.password = '';
                    this.$emit('on-close', false);
                    this.success();
                    this.$router.push({path: '/home'});
                } else {
                    this.username = '';
                    this.password = '';
                    this.$refs.username.focus();
                    this.error();
                }
            }).catch((err) => {
                console.log(err);
            });
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
            this.username = '';
            this.password = '';
        },

        /**
         * @method
         * 密码RSA加密
         *
         * @param  {String} password 密码
         * @return {String}          加密的密码
         */
        passwordEncrypt (password) {
            let rsa = new JsEncrypt();
            rsa.setPublicKey(this.publicKey);
            let passwordEncoded = rsa.encrypt(password);
            return passwordEncoded;
        },

        /**
         * @method
         * 登录成功提示
         *
         * @param  {String} nodesc 提示信息
         * @return {}
         */
        success (nodesc) {
            this.$Notice.success({
                title: '登录成功：',
                desc: nodesc ? '' : '更多功能请点击顶部导航条“应用面板”查看。'
            });
        },

        /**
         * @method
         * 用户名密码错误提示
         *
         * @param  {String} nodesc 提示信息
         * @return {}
         */
        error (nodesc) {
            this.$Notice.error({
                title: '错误信息：',
                desc: nodesc ? '' : '请检查：&#13;&#10;' +
                    '1、用户名或密码错误，请输入正确信息！&#13;&#10;' +
                    '2、帐号未激活，请联系管理员！'
            });
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
.dialogLogin-modal {
    text-align: center;
}

.dialogLogin-input {
    width: 300px;
}
</style>
