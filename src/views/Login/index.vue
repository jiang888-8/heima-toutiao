<template>
  <div class="login-container">

    <van-nav-bar
      title="登录"
      class="page-nav-bar"
    />

    <van-form ref="from" @submit="onSubmit">
      <van-field
        v-model="form.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="fromRules.mobile"
        type="number"
        maxlength='11'
      >
        <template v-slot:left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>

      <van-field
        v-model="form.code"
        name="code"
        placeholder="请输入验证码"
        :rules="fromRules.code"
        type="number"
        maxlength='6'
      >
        <!-- 左侧图标 -->
        <template v-slot:left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <!-- 右侧按钮 -->
        <template #button>
          <van-count-down @finish='isShowCountDown = false' v-if="isShowCountDown" :time="60*1000" format=" ss s" />
          <van-button v-else size="mini" class="send-btn" native-type="button" @click="onSendCode">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendCode, login } from '@/api/user.js'
const mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
export default {
  name: 'Login',
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      fromRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: mobileReg, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^[0-9]{6}$/, message: '请输入正确的验证码' }
        ]
      },
      isShowCountDown: false
    }
  },

  created () {

  },

  methods: {
    // 提交表单
    async onSubmit () {
      try {
        const { data: res } = await login(this.form)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return this.$toast.fail('验证码错误或者重新登录')
        }
        this.$toast.fail('系统错误')
      }
    },
    async onSendCode () {
      try {
        await this.$refs.from.validate('mobile')
      } catch (err) {
        return
      }

      try {
        await sendCode(this.mobile)
        this.$toast('验证码发送成功')
        this.isShowCountDown = true
      } catch (err) {
        if (err.response && err.response.status === 429) {
          return this.$toast('操作繁忙，请稍后再试')
        }
        this.$toast('网络异常')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-btn {
    width: 152px;
    height: 46px;
    background: #EDEDED;
    border-radius: 23px;
    color: #666;
  }

  .login-btn {
    margin: 53px 28px;

    .van-button {
      width: 694px;
      height: 88px;
      background: #6DB4F8;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>
