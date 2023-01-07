// Created by 任泽阳 on 18/12/18.
// 重置密码页面
<template>
  <section class="page-resetPass">
    <div class="go-home-btn a-3-bd" @click="goUrl('/login')">
      <svg class="icon icon-18" aria-hidden="true">
          <use xlink:href="#icon-e_11"></use>
        </svg>
      Sign In
    </div>
    <!-- 引导 -->
    <c-intoGuide :imgMap="imgMap">
      <div class="guide-center">
        <!-- 重置登录密码 -->
        <p :class="isInternationTem?'b-1-cl':'b-8-cl'">
          {{ $t('resetPass.ResetLoginPassword') }}
        </p>
        <!-- 重置登录密码后24小时内禁止提币 -->
        <div class="guide-text b-2-cl">
          {{safetyTimeSet.is_open && safetyTimeSet.is_open.toString() === '1' ?
         $t('personal.prompt.text5', { number: safetyTimeSet.hour })
         : $t('personal.prompt.ResetLoginPasswordError') }}
        </div>
      </div>
    </c-intoGuide>
    <div class="page-resetPass-content">
      <div class="content-center">
        <!-- tab -->
        <c-intoTab
          v-if="tabFlag && nowStep !== '3'"
          :list="tabList"
          :nowKey="nowType"
          :disabled="submitLoading"
          className="resetPassTab"
          @onchenges="setNowType"/>
        <!-- user框 步骤1时展示可输入 步骤2时展示不可输入 -->
        <c-inputLine name="userValue"
          :maxLength="maxLength"
          :key="domKeys.userKey"
          v-if="nowStep !== '3'"
          :disabled="nowStep === '2'"
          :value="userValue"
          :promptText="domTexts.userText"
          :errorHave="true"
          :errorText="domTexts.userError"
          :errorFlag="userErrorFlag"
          @onchanges="inputChanges"/>
        <!-- 滑动验证 仅步骤1展示 -->
        <c-verify
          name="phone"
          :colorMap="colorMap"
          :key="domKeys.verifyKey"
          v-if="nowStep === '1' && !verificationType"
          marginTop="6px"
          :errorHave="true"
          @callback='verifyCallBack'/>
        <!-- 验证码框 仅在步骤2展示 -->
        <c-inputLine
          maxLength="6"
          name="checkValue"
          :key="domKeys.checkKey"
          v-if="nowStep === '2'"
          :value="checkValue"
          :promptText="domTexts.codeText"
          :errorHave="true"
          :errorText="domTexts.codeError"
          :errorFlag="checkErrorFlag"
          @onchanges="inputChanges">
          <!-- 手机验证码 -->
          <c-getCode
            v-if="nowType === 'phone'"
            :voiceOpen ="voiceSmsOpen"
            name="resetPassGetcode"
            @click="getCodeClick"/>
            <!-- 邮箱验证码 -->
          <c-getCode
            v-else
            name="resetPassGetcode"
            @click="getCodeClick"/>
        </c-inputLine>
        <!-- 谷歌 -->
        <c-inputLine
          maxLength="6"
          name="googleValue"
          :key="domKeys.googleKey"
          v-if="nowStep === '2' && haveGoogle"
          :value="googleValue"
          :promptText="$t('resetPass.googleCode')"
          :errorHave="true"
          :errorText="$t('resetPass.googleError')"
          :errorFlag="googleErrorFlag"
          @onchanges="inputChanges">
        </c-inputLine>
        <!-- 身份证 -->
        <c-inputLine
          maxLength="100"
          name="IDValue"
          :key="domKeys.IDKey"
          v-if="nowStep === '2' && haveID"
          :value="IDValue"
          :promptText="$t('resetPass.IDCode')"
          :errorHave="true"
          :errorText="$t('resetPass.IDError')"
          :errorFlag="IDErrorFlag"
          @onchanges="inputChanges">
        </c-inputLine>
         <!-- 密码框 仅在步骤3展示 -->
        <c-inputLine
          maxLength="20"
          name="passValue"
          inputType="password"
          :key="domKeys.passKey"
          v-if="nowStep === '3'"
          :value="passValue"
          :promptText="$t('resetPass.password')"
          :errorHave="true"
          :errorText="$t('resetPass.passwordError')"
          :errorFlag="passErrorFlag"
          @onchanges="inputChanges"/>
         <!-- 确认秘密框 仅在步骤3展示 -->
        <c-inputLine
          maxLength="20"
          name="comfirmValue"
          inputType="password"
          :key="domKeys.comfirmKey"
          v-if="nowStep === '3'"
          :value="comfirmValue"
          :promptText="$t('resetPass.confrimPassWord')"
          :errorHave="true"
          :errorText="$t('resetPass.confrimPassWordError')"
          :errorFlag="comfirmErrorFlag"
          @onchanges="inputChanges"/>
        <!-- 提交按钮 -->
        <c-button
          marginTop="46px"
          height="40px"
          width="100%"
          :disabled="submitStatus.disabled"
          :loading="submitLoading"
          @click="submit"
          paddingW="0px">{{ submitStatus.text }}</c-button>
      </div>
      <!-- 底部区域 -->
      <div class="copy z-2-cl"
          style="border-color: #293448 !important;">
        Copyright © 2021 {{companyName}}. All rights reserve
      </div>
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/resetPass/resetPass';
import 'BlockChain-ui/PC/common-mixin/resetPass/resetPass.styl';
// 获取验证码
export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style lang="stylus">

</style>
