<template>
  <c-dialog
    :titleText="$t('reward.dialog.safety')"
    :showFlag="showFlag"
    :haveOption="false"
    @close="handleClose"
  >
    <section class="container">
      <template v-if="OpenGoogle">
        <div class="row">
          <div class="label">{{$t('reward.dialog.verify.google')}}</div>
          <c-v5-input
            class="options"
            :width="'100%'"
            name="googleCode"
            :value="verifyCode"
            :errorHave="true"
            :errorFlag="googleError"
            :errorText="$t('assets.addressMent.googleCodeError')"
            @onChanges="inputLineChange"
          />
        </div>
      </template>

      <template v-else-if="OpenMobile">
        <div class="row">
          <div class="label">{{$t('reward.dialog.verify.mobile')}}</div>
          <c-v5-input
            maxLength="6"
            class="options"
            :width="'100%'"
            name="phoneCode"
            :value="verifyCode"
            :errorHave="true"
            :errorFlag="phoneError"
            :errorText="$t('assets.addressMent.phoneCodeError')"
            @onChanges="inputLineChange"
          >
            <!-- 获取验证码 -->
            <div slot="append">
              <c-v5-getCode name="addressGetcode" @click="getCode" />
            </div>
          </c-v5-input>
        </div>
      </template>

      <template v-else>
        <div class="row">
          <div class="label">{{$t('reward.dialog.verify.email')}}</div>
          <c-v5-input
            class="options"
            maxLength="6"
            :width="'100%'"
            name="emailCode"
            :value="verifyCode"
            :errorHave="true"
            :errorFlag="emailError"
            :errorText="$t('register.emailCodeError')"
            @onChanges="inputLineChange"
          >
            <!-- 获取验证码 -->
            <div slot="append">
              <c-v5-getCode name="getEmailCode" @click="getEmailCode" />
            </div>
          </c-v5-input>
        </div>
      </template>
    </section>
    <section>
      <c-button class="btn" @click="handleConfirm">{{$t('reward.dialog.confirm')}}</c-button>
    </section>
  </c-dialog>
</template>

<script>
export default {
  name: 'VerifyDialog',
  props: {
    showFlag: { default: false, type: Boolean },
    payment: { default: () => ({}), type: Object },
  },
  data() {
    return {
      verifyCode: '',
      dialogStatus: '',
    };
  },
  methods: {
    async handleConfirm() {
      try {
        const { code, msg } = await this.axios({
          url: 'members/payment',
          headers: { 'Content-Type': 'application/json' },
          hostType: 'fe-increment-api',
          params: { verifyCode: this.verifyCode, ...this.payment },
          method: 'post',
        });
        if (code !== 0) throw new Error(msg);
        this.$bus.$emit('tip', { text: msg, type: 'success' });
        window.location.replace(window.location.href);
        this.handleClose();
      } catch ({ message }) {
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    async getCode(name, type) {
      try {
        const { code, msg } = await this.axios({
          url: 'v4/common/smsValidCode',
          params: {
            operationType: '101',
            smsType: type && type === 'voiceSms' ? '1' : '0',
          },
        });
        if (code.toString() !== '0') throw new Error(msg);
        // 短信已发送，请注意查收
        const successText = type && type === 'voiceSms'
          ? this.$t('login.voiceSendSuccess')
          : this.$t('login.phoneSendSuccess');
        this.$bus.$emit('tip', { text: successText, type: 'success' });
        this.smsType = type === 'sms' ? 'sms' : 'voiceSms';
      } catch ({ message }) {
        // 倒计时重置
        this.$bus.$emit('getCode-clear', 'addressGetcode');
        // tip框提示错误
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    async getEmailCode() {
      try {
        const { code, msg } = await this.axios({
          url: 'v4/common/emailValidCode',
          params: { operationType: '19' },
        });
        if (code.toString() !== '0') throw new Error(msg);
        this.$bus.$emit('tip', { text: this.$t('register.emailSendSuccess'), type: 'success' });
      } catch ({ message }) {
        // 倒计时重置
        this.$bus.$emit('getCode-clear', 'getEmailCode');
        // tip框提示错误
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
    inputLineChange(value) {
      this.verifyCode = value;
    },
    handleClose() {
      this.$emit('update:showFlag', false);
    },
  },
  computed: {
    // 用户是否开启手机
    OpenMobile() {
      let flag = false;
      const { userInfo } = this.$store.state.baseData;
      if (userInfo && userInfo.isOpenMobileCheck.toString() === '1') {
        flag = true;
      }
      return flag;
    },
    // 用户是否开启谷歌
    OpenGoogle() {
      let flag = false;
      const { userInfo } = this.$store.state.baseData;
      if (userInfo && userInfo.googleStatus.toString() === '1') {
        flag = true;
      }
      return flag;
    },
    // phoneCode 是否复合正则验证
    phoneCodeFlag() {
      return this.$store.state.regExp.verification.test(this.verifyCode);
    },
    // googleCode 是否复合正则验证
    googleCodeFlag() {
      return this.$store.state.regExp.verification.test(this.verifyCode);
    },
    // emailCode 是否复合正则验证
    emailFlag() {
      return this.$store.state.regExp.verification.test(this.verifyCode);
    },
    emailError() {
      if (this.verifyCode.length !== 0 && !this.emailFlag) return true;
      return false;
    },
    phoneError() {
      if (this.verifyCode.length !== 0 && !this.phoneCodeFlag) return true;
      return false;
    },
    googleError() {
      if (this.verifyCode.length !== 0 && !this.googleCodeFlag) return true;
      return false;
    },
  },
};
</script>

<style lang="stylus" scoped>
* {
  box-sizing: border-box;
  font-family: 'DINPro';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
}

>>> .dialog-frame {
  background: #FFFFFF !important;
  border-radius: 5px;
}

>>> .dialog-frame-head {
  background: #F2F4FB !important;
  border-radius: 5px 5px 0 0;
}

>>> .dialog-frame-head-text {
  color: rgba(22, 24, 29, 1) !important;
}

>>> .v5-9-bd {
  border: 0px !important;
}

>>> .v5-9-bg {
  background: #F1F4FA;
}

>>> .v5-5-cl {
  color: #000;
}

.container {
  width: 100%;
}

// .row {
//   margin-bottom: 30px;

//   .label {
//     margin-bottom: 5px;
//   }
// }

.btn {
  width: 100%;
  margin-top: 40px !important;
  background-color: #2762FF;
  border-radius: 4px;
}
</style>
