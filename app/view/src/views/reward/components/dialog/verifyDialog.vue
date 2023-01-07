<template>
  <c-dialog
    :titleText="$t('reward.dialog.safety')"
    :showFlag="showFlag"
    :haveOption="false"
    @close="handleClose"
    class="verify-dialog"
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
      <c-v5-button
        :disabled="btnDisabled" class="btn"
        @click="handleConfirm">{{$t('reward.dialog.confirm')}}</c-v5-button>
    </section>
  </c-dialog>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/reward/dialog/verify';
import 'BlockChain-ui/PC/common-mixin/reward/dialog/verify.styl';

export default {
  mixins: [mixin],
};
</script>

<style lang="stylus" scoped>
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
  background: #F1F4FA !important;
}
>>> .v5-5-cl {
  color: #000 !important;
}
>>> .a-3-bg{
  background-color: rgba(232,235,243,1) !important
}
</style>
