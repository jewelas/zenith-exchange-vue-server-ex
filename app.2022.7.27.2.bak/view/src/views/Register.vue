// Created by 任泽阳 on 18/12/06.
// 注册页面
<template>
  <div class="page-register fuz-card">
    <div class="fuz-card-title big">
      <!-- 欢迎注册 -->
      <p :class="isInternationTem?'b-1-cl':'b-8-cl'">
        {{registerPageTitle}}
      </p>
      <div class="warn-text" v-if="registerForbidden === '1'">{{$t('login.registerBan')}}</div>
    </div>
    <div class="page-register-content">
      <div class='fuz-text-small fuz-gap small fuz-white'>
          Please ensure you are visiting the correct url.
      </div>
      <div class='fux-text-small fuz-gap fuz-white'>
        <span class='fuz-blue'>https:// </span>www.zenithcex.com/login
      </div>
      <div class="content-center">
        <c-intoTab
          v-if="tabFlag"
          :list="tabList"
          :nowKey="nowType"
          :disabled="submitLoading"
          className="registerTab"
          @onchenges="setNowType"/>
        <!-- 选择国家 -->
        <c-select
          v-if="nowType === 'phone'"
          :value="country"
          :filterable="true"
          :promptText="$t('register.location')"
          @onChanges='countryChange'
          @opent-chang="countryFocus"
          name="country"
          :errorHave="true"
          :errorFlag="countryErrorFlag"
          :errorText="$t('register.PleaseSelectAcountry')"
          :options="registerCountryList"
        />
        <!-- 手机号/邮箱 -->
        <c-inputLine
          :maxLength="maxLength"
          :key="domKeys.userKey"
          name="userValue"
          :value="userValue"
          :promptText="domTexts.userText"
          :errorHave="true"
          :errorText="domTexts.userError"
          :errorFlag="userErrorFlag"
          @focus="userFocus"
          @onchanges="inputChanges">
        </c-inputLine>
        <!-- 密码 -->
        <c-inputLine
          maxLength="20"
          :key="domKeys.passKey"
          inputType="password"
          name="passValue"
          :value="passValue"
          :promptText="$t('register.password')"
          :errorHave="true"
          :errorText="$t('register.passwordError')"
          :errorFlag="passErrorFlag"
          @onchanges="inputChanges">
        </c-inputLine>
        <!-- 确认密码 -->
        <c-inputLine
          maxLength="20"
          :key="domKeys.comfirmKey"
          inputType="password"
          name="comfirmValue"
          :value="comfirmValue"
          :promptText="$t('register.confirmPassword')"
          :errorHave="true"
          :errorText="$t('register.confirmPasswordError')"
          :errorFlag="comfirmErrorFlag"
          @onchanges="inputChanges">
        </c-inputLine>
        <!-- 邀请码 -->
        <c-inputLine
          v-if="templateType!=='3' || !urlHasinvitedCode"
          :key="domKeys.invitedKey"
          name="invitedValue"
          :value="invitedValue"
          :promptText="invitedText"
          :errorHave="true"
          :errorText="$t('register.InvitationCodeError')"
          :errorFlag="invitedErrorFlag"
          @onchanges="inputChanges">
        </c-inputLine>
        <div class="resgister-opions" v-if="coinsKrwOpen !== '1'">
          <c-checkBox :value="textFlag" @click="checkoutClick"/>
          <span class="text" @click="checkoutClick(!textFlag)">
            <!-- 我已阅读并同意 -->
            {{$t('register.IHaveReadAndAgreed')}}
            {{serverName}}
          </span>
          <!-- <a>服务条款</a> <a>隐私保护</a> -->
          <!-- 用户协议 -->
          <!-- <router-link to="cms/agreement"
            target="_blank"
            class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
          <c-button type="text"
            className="goLogin"
            @click="goUrl('cms/agreement')">
            {{$t('register.UserAgreement')}}
          </c-button>
        </div>
        <div v-else>
          <div class="resgister-opions">
          <c-checkBox :value="textFlag" @click="checkoutClick"/>
            <span class="text" @click="checkoutClick(!textFlag)">
              <!-- 我已阅读并同意 -->
              {{$t('krwAdd.regstmust')}}
              {{$t('register.IHaveReadAndAgreed')}}
              {{serverName}}
            </span>
            <!-- <a>服务条款</a> <a>隐私保护</a> -->
            <!-- 用户协议 -->
            <!-- <router-link to="cms/agreement"
              target="_blank"
              class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
            <c-button type="text"
              className="goLogin"
              @click="goUrl('cms/ystk1')">
              <!-- 隐私条款 -->
              {{$t('krwAdd.regst1')}}
            </c-button>
          </div>
          <div class="resgister-opions">
            <c-checkBox :value="textFlag2" @click="checkoutClick2"/>
            <span class="text" @click="checkoutClick2(!textFlag2)">
              <!-- 我已阅读并同意 -->
              {{$t('krwAdd.regstmust')}}
              {{$t('register.IHaveReadAndAgreed')}}
              {{serverName}}
            </span>
            <!-- <a>服务条款</a> <a>隐私保护</a> -->
            <!-- 用户协议 -->
            <!-- <router-link to="cms/agreement"
              target="_blank"
              class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
            <c-button type="text"
              className="goLogin"
              @click="goUrl('cms/agreement1')">
              <!-- 用户协议 -->
              {{$t('krwAdd.regst2')}}
            </c-button>
          </div>
          <div class="resgister-opions">
            <c-checkBox :value="textFlag3" @click="checkoutClick3"/>
            <span class="text" @click="checkoutClick3(!textFlag3)">
              <!-- 我已阅读并同意 -->
              {{$t('krwAdd.regstother')}}
              {{$t('register.IHaveReadAndAgreed')}}
              {{serverName}}
            </span>
            <!-- <a>服务条款</a> <a>隐私保护</a> -->
            <!-- 用户协议 -->
            <!-- <router-link to="cms/agreement"
              target="_blank"
              class="b-4-cl">{{ $t('register.UserAgreement') }}</router-link> -->
            <c-button type="text"
              className="goLogin"
              @click="goUrl('cms/yxgg')">
              <!-- 营销广告使用同意书 -->
              {{$t('krwAdd.regst3')}}
            </c-button>
          </div>
        </div>

        <!-- 注册 -->
        <c-button
          marginTop="20px"
          height="40px"
          width="100%"
          class='fuz-primary-btn'
          :disabled="submitDisabled  || registerForbidden === '1'"
          :loading="submitLoading"
          @click="buttonClick"
          paddingW="0px">{{ submitButtonText }}</c-button>

          <div class="guide-text b-2-cl  register-tips" v-if="loginHide === '0'">
            <!-- 已经是注册用户 -->
            <span class="guide-ht">{{ $t('register.AlreadyAregisteredUser') }} </span>
            <!-- 立即登录 -->
            <!-- <router-link to="/login" class="b-4-cl">
              {{ $t('register.logInImmediately') }}
            </router-link> -->
            <!-- 立即注册 -->
            <c-button type="text"
              className="goLogin logBtn"
              @click="goUrl('/login')">
              {{$t('register.logInImmediately')}}
            </c-button>
          </div>
        <!-- 底部区域 -->
        <div class="copy z-2-cl"
            style="border-color: #293448 !important;">
          Copyright © 2021 {{companyName}}. All rights reserve
        </div>
      </div>
    </div>
    <c-dialog :showFlag="dialogFlag"
      :titleText="$t('login.SecurityVerification')"
      :haveOption="haveOption"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm">
      <c-verify
        :key="domKeys.verifyKey"
        :colorMap="colorMap"
        marginTop="6px"
        :errorHave="true"
        v-if="!haveOption && !verificationType"
        geetestBg="a-5-bg"
        @callback='verifyCallBack'/>
       <c-inputLine
          v-else
          maxLength="6"
          :key="domKeys.checkKey"
          name="checkValue"
          :value="checkValue"
          :promptText="domTexts.codeText"
          :errorHave="true"
          :errorText="domTexts.codeError"
          :errorFlag="checkErrorFlag"
          @onchanges="inputChanges">
          <!-- 获取验证码 -->
          <c-getCode
            v-if="nowType === 'phone'"
            name="registerGetcode"
            @click="getCodeClick"
            @clear="getCodeClear"
            :autoStart="Boolean(voiceSmsOpen)"
            :voiceOpen ="voiceSmsOpen"
            buttonName="registerGetcodeBtn"/>
            <c-getCode
            v-else
            name="registerGetcode"
            @click="getCodeClick"
            @clear="getCodeClear"
            :autoStart="false"
            buttonName="registerGetcodeBtn"/>
        </c-inputLine>
    </c-dialog>
    <c-dialog :showFlag="localFlag"
      :titleText="$t('etfAdd.newRegister')"
      :confirmText="$t('etfAdd.localFail')"
      :closeText="$t('etfAdd.localTure')"
      :closeFlag="false"
      style="padding:0 20px;!important"
      @close="goUrl('/')"
      @confirm="localDialogConfirm">
      <div>
        <p class="localBox">{{$t('etfAdd.localNote')}}</p>
      </div>
    </c-dialog>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/register/register';
import 'BlockChain-ui/PC/common-mixin/register/register.styl';
// 滑动验证
export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {
  },
};
</script>
<style scoped>
.page-register {
  margin: 60px auto !important;
  max-width: 466px;
}
.register-tips {
  position: relative;
  top: 90px;
  text-align: center;
}
.page-register-content {
  padding: 40px 60px 40px 60px;
}
.content-center {
  width: 100% !important;
}
.guide-ht{
  color: #fff;
}
</style>
