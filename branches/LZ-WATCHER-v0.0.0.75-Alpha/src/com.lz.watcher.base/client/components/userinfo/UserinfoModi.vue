<template>
    <div class="userinfo-modi">
        <Drawer class="drawer-userinfo-modi"
            :value="viewUserinfoModi"
            width=400
            :closable="false"
            :mask-closable="true"
            @on-close="cancel()">
            <p slot="header" class="drawer-userinfo-modi-header">修改个人资料</p>
            <p class="drawer-userinfo-modi-title">个人信息</p>
            <div class="drawer-userinfo-modi-content">
                <p>性别 ： </p>
                <RadioGroup class="userinfo-modi-input" v-model="userinfoModiObj.gender" ref="gender">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                </RadioGroup>
                <p>出生日期 ： </p>
                <DatePicker class="userinfo-modi-input-date" v-model="userinfoModiObj.dateOfBirth" ref="dateofbirth" type="date" :start-date="new Date(2000, 5, 15)" placeholder="yyyy-mm-dd"></DatePicker>
            </div>
            <Divider/>
            <p class="drawer-userinfo-modi-title">联系方式</p>
            <div class="drawer-userinfo-modi-content">
                <p>联系电话 ： </p>
                <Input class="userinfo-modi-input" v-model="userinfoModiObj.phone" ref="phone" placeholder=" 联系电话" clearable/>
                <p>电子邮箱 ： </p>
                <Input class="userinfo-modi-input" v-model="userinfoModiObj.email" ref="email" placeholder=" 电子邮箱" clearable/>
                <p>邮寄地址 ： </p>
                <Input class="userinfo-modi-input" v-model="userinfoModiObj.address" ref="address" placeholder=" 办公地址或家庭住址" clearable/>
            </div>
            <div class="drawer-userinfo-modi-footer">
                <Button class="drawer-userinfo-modi-btn" @click="cancel()">取消</Button>
                <Button class="drawer-userinfo-modi-btn" type="primary" @click="ok()">确定</Button>
            </div>
        </Drawer>
    </div>
</template>

<script type="text/javascript">
import Utils from '../../../../../lib/com.lz.mevn.util.utils/Utils.js';
const utils = new Utils();
export default {
    name: 'UserinfoModi',
    data () {
        return {
            userinfoModiObj: {
                gender: '',
                dateOfBirth: '',
                phone: '',
                email: '',
                address: ''
            }
        }
    },
    props: {
        viewUserinfoModi: Boolean,
        userinfo: Object
    },
    watch: {
        userinfo (val) {
            for (let key in this.userinfoModiObj) {
                this.userinfoModiObj[key] = this.userinfo[key];
            }
        }
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
            let dateOfBirth = this.$refs.dateofbirth.value;
            let dateOfBirthStr = '';
            if (typeof dateOfBirth === 'object') {
                dateOfBirthStr = utils.formatDate(dateOfBirth);
            } else {
                dateOfBirthStr = dateOfBirth;
            }
            let params = {
                gender: this.$refs.gender.value,
                dateOfBirth: dateOfBirthStr,
                phone: this.$refs.phone.value,
                email: this.$refs.email.value,
                address: this.$refs.address.value
            }
            this.$emit('on-close', false);
            this.$Message.info('点击了确定');
            this.$ajax({
                method: 'patch',
                url: '/home/userinfo',
                timeout: 60000,
                responseType: 'json',
                data: params
            }).then((res) => {
                this.$Notice.success({ title: '个人资料修改成功！' });
                this.$emit('on-userinfo-update', params);
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
        }
    }
}
</script>

<style scoped lang="scss" type="text/css">
@import '../../stylesheets/gColor.scss';
@import '../../stylesheets/gSize.scss';

.drawer-userinfo-modi-header {
    font-size: $drawerUserinfoHeader;
    font-weight: bold;
    line-height: 24px;
    margin: 8px 0;
}

.drawer-userinfo-modi-title {
    font-size: $drawerUserinfoTitle;
    line-height: 24px;
    margin-bottom: 16px;
}

.drawer-userinfo-modi-content {
    font-size: $drawerUserinfoContent;
}

.drawer-userinfo-modi-footer {
    position: absolute;
    width: 100%;
    bottom: 16px;
    left: 0;
    border-top: 1px solid $separationLine;
    padding: 10px 16px;
    text-align: right;
}

.drawer-userinfo-modi-btn {
    margin-left: 8px;
}

.userinfo-modi-input {
    width: 300px;
    margin: 8px 30px;
}

.userinfo-modi-input-date {
    width: 216px;
    margin: 8px 30px;
}
</style>
