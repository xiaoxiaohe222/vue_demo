import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
    messages: zh_CN.messages,
    attributes: {
        phone: '手机号',
        code: '验证码',
        username:"用户名",
        password:"密码",
        capture:"验证码"
    }
})

VeeValidate.Validator.extend('phone', {
    validate: value => {
        return /^1([3456789])\d{9}$/.test(value)
    },
    getMessage: field => field + '必须是11位手机号码'
})
VeeValidate.Validator.extend('code', {
    validate: value => {
        return /^\d{6}$/.test(value)
    },
    getMessage: field => field + '必须是6位数字'
})

