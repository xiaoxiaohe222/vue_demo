<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isLoginByMessage}" @click="isLoginByMessage=true;isLoginByPassword=false">短信登录</a>
          <a href="javascript:;" :class="{on:isLoginByPassword}" @click="isLoginByMessage=false;isLoginByPassword=true">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isLoginByMessage}">
            <section class="login_message">
              <input name="phone" v-validate="'required|phone'" v-model="phone" type="tel" maxlength="11" placeholder="手机号">
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button :disabled="!regPhone || !waitingCode" class="get_verification"
                      :class="{correct_num:regPhone && waitingCode}"
                      @click.prevent="getCode"
              >{{!waitingCode ? '获取验证码'+count+'(s)' : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input v-model="code"  v-validate="'required|code'" name="code" type="tel" maxlength="8" placeholder="验证码">
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>

            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>



          <div :class="{on:isLoginByPassword}">
            <section>
              <section class="login_message">
                <input v-model="username" v-validate="'required'" name="username" type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
                <span style="color: red;" v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </section>
              <section class="login_verification">
                <input v-model="password" v-validate="'required'" name="password"  :type="showPwd ? 'text' :  'password'" maxlength="8" placeholder="密码">
                <span style="color: red;" v-show="errors.has('password')">{{ errors.first('password') }}</span>

                <div class="switch_button" :class = "showPwd ? 'on' : 'off'"   @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd ? "abc" : ""}}</span>
                </div>
              </section>
              <section class="login_message">
                <input v-model="capture" v-validate="'required'" name="capture"  type="text" maxlength="11" placeholder="验证码">
                <span style="color: red;" v-show="errors.has('capture')">{{ errors.first('capture') }}</span>

                <img ref="capture" class="get_verification" :src="imageCode" alt="captcha" @click="imageCode = (imageCode + '?time=' +Date.now())">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont iconleft"></i>
      </a>
    </div>
  </section>

</template>

<script>
import {reqGetCode} from "@/api";
import {SAVE_USER} from "@/vuex/mutation_type";
import { MessageBox } from 'mint-ui';
export default {
  name: "Login",
  data(){
    return {
      phone:"",
      isLoginByMessage:true,
      isLoginByPassword:false,
      showPwd:false, //密码输入框是否显示密码
      imageCode:"http://localhost:4000/captcha",
      waitingCode:true,
      count:0,
      code:"",
      username:"",
      password:"",
      capture:""
    }
  },
  computed:{
    regPhone(){
      return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)
    }
  },
  methods:{
  async  getCode(){

     this.waitingCode=false;
     this.count=5;

     let timer =  setInterval(()=>{
        this.count--;
        if (this.count === 0){
          clearInterval(timer)
          this.waitingCode = true;
        }
      },1000)
      //后台发送请求获取验证码
    const result =  await reqGetCode(this.phone)
      if (result.code===0){
        MessageBox('提示', '发送成功');
      }else {
        MessageBox('提示', result.msg);
      }

    },
   async login(){
      const {isLoginByMessage} = this;
      let names = isLoginByMessage ? ['phone','code'] : ['username','password','capture']
      const success = await this.$validator.validateAll(names)
     if(success){
       //发送请求到后台进行验证
       const {phone,code,username,password,capture} = this;

       let loginResult;
       if (isLoginByMessage){ //手机号验证码登录方法
          loginResult =   await this.$API.reqLoginByPhone({phone,code})
         if (loginResult.code === 1){
           this.code = "";
           MessageBox('提示', loginResult.msg);
         }
       }else {
         loginResult = await  this.$API.reqLoginByPwd({username,password,capture})
         if (loginResult.code === 1){
           this.$refs.capture.src = this.imageCode + "?time=" + Date.now()
           this.capture= "";
           MessageBox('提示', loginResult.msg);
         }
       }

       if (loginResult.code === 0){
         //说明登录成功
         MessageBox('提示', "登录成功");
         //将用户信息存入到vuex中
          this.$store.dispatch(SAVE_USER,loginResult.data);

          //跳转到个人中心页面
         this.$router.replace("/profile")
       }



     }else {
       alert("未通过前台验证")
     }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"

.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        > a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      > form
        > div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.correct_num
                color #000
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s, border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              > .switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            > a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      > .iconfont
        font-size 20px
        color #999
</style>