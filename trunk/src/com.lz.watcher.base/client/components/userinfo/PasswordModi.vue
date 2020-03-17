<template>
    <div class="password-modi">
        <Drawer class="drawer-password-modi"
            :value="viewPasswordModi"
            width=400
            :closable="false"
            :mask-closable="true"
            @on-close="cancel()">
            <p slot="header" class="drawer-password-modi-header">修改个人密码</p>
            <p class="drawer-password-modi-title">重置密码</p>
            <div class="drawer-password-modi-content">
                <p>新密码 ： </p>
                <Input class="password-modi-input" v-model="password" ref="password" placeholder=" 新密码" type="password" clearable/>
                <p>再次输入新密码 ： </p>
                <Input class="password-modi-input" v-model="passwordAgain" ref="passwordagain" placeholder=" 再次输入新密码" type="password" clearable/>
            </div>
            <div class="drawer-password-modi-footer">
                <Button class="drawer-password-modi-btn" @click="cancel()">取消</Button>
                <Button class="drawer-password-modi-btn" type="primary" @click="ok()">确定</Button>
            </div>
        </Drawer>
    </div>
</template>

<script type="text/javascript">
import JsEncrypt from 'jsencrypt';
export default {
    name: 'PasswordModi',
    data () {
        return {
            password: '',
            passwordAgain: ''
        }
    },
    props: {
        viewPasswordModi: Boolean
    },
    methods: {
        /**
         * @method
         * 确定按钮事件响应
         * 请求：patch -> 性别，生日，电话，邮箱，地址
         *
         * @return {}
         */
        ok () {
            if (this.$refs.password.value === this.$refs.passwordagain.value) {
                let params = { password: this.passwordEncrypt(this.$refs.password.value) }
                this.$emit('on-close', false);
                this.$Message.info('点击了确定');
                this.$ajax({
                    method: 'patch',
                    url: '/home/password',
                    timeout: 60000,
                    responseType: 'json',
                    data: params
                }).then((res) => {
                    this.$Notice.success({ title: '密码重置成功！' });
                    this.password = '';
                    this.passwordAgain = '';
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                this.$Notice.error({ title: '两次密码输入不一致！' });
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
            this.password = '';
            this.passwordAgain = '';
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
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
@import '../../stylesheets/gSize.scss';

.drawer-password-modi-header {
    font-size: $drawerUserinfoHeader;
    font-weight: bold;
    line-height: 24px;
    margin: 8px 0;
}

.drawer-password-modi-title {
    font-size: $drawerUserinfoTitle;
    line-height: 24px;
    margin-bottom: 16px;
}

.drawer-password-modi-content {
    font-size: $drawerUserinfoContent;
}

.drawer-password-modi-footer {
    position: absolute;
    width: 100%;
    bottom: 16px;
    left: 0;
    border-top: 1px solid $separationLine;
    padding: 10px 16px;
    text-align: right;
}

.drawer-password-modi-btn {
    margin-left: 8px;
}

.password-modi-input {
    width: 300px;
    margin: 8px 30px;
}
</style>
