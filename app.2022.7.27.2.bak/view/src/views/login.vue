<!-- // Created by 任泽阳 on 18/12/06.
// 登录页面 -->
<template>
  <section class="page-login fuz-card" >
    <div class="fuz-card-title big">
        <p :class="isInternationTem?'b-1-cl':'b-8-cl'">
          Sign in to Zenith
        </p>
        <div class="warn-text fuz-text-small" v-if="loginForbidden === '1'">
          {{$t('login.loginBan')}}
        </div>
    </div>
    <!-- 主体 -->
    <div class="page-login-content">
      <div class='fuz-text-small fuz-gap small fuz-white'>
          Please ensure you are visiting the correct url.
      </div>
      <div class='fux-text-small fuz-gap fuz-white'>
        <span class='fuz-blue'>https:// </span>www.zenithcex.com/login
      </div>
      <div class="content-center">
        <!-- 手机/邮箱 -->
        <c-inputLine
          maxLength="100"
          name="userValue"
          :promptText="userInputPrompt"
          :errorHave="true"
          :errorText="$t('login.formatIncorrect')"
          :errorFlag="userErrorFlag"
          :value="userValue"
          @onchanges="inputChanges">
        </c-inputLine>
        <!-- 密码 -->
        <c-inputLine
          maxLength="20"
          name="passValue"
          :promptText="$t('login.password')"
          :errorHave="true"
          :errorText="$t('login.passwordError')"
          :errorFlag="passErrorFlag"
          marginTop="0px"
          :value="passValue"
          inputType="password"
          @onchanges="inputChanges"
          :isLogin="true"
        />
        <!-- 选择验证方式 -->
        <c-select
          v-if="openLoginVerificationMode"
          :value="selectValue"
          :promptText="$t('login.VerificationMode')"
          name="loginType"
          :errorHave="true"
          :errorFlag='false'
          :errorText="$t('login.AuthenticationMethod')"
          :options="selectOptions"
          @onChanges="selectChange"
        />
        <!-- 极验 -->
        <!-- marginTop 70-40-24=4 -->
        <c-verify v-if="!verificationType"
          marginTop="6px"
          :errorHave="true"
          :colorMap="colorMap"
          @callback='verifyCallBack'/>
        <c-button type="text" className="logBtn"
          @click="goUrl('/resetPass')">
          {{$t('login.ForgetPassword')}}
        </c-button>
        <c-button type="solid"
          :disabled="submitDisabled || loginForbidden === '1'"
          :loading="submitLoading"
          marginTop="20px"
          height="40px"
          width="100%"
          class='fuz-primary-btn'
          paddingW="0px"
          @click="submit">{{loginButtonText}}
        </c-button>
        <div class="thirdBox" v-if="thirdList && !singPassCode && !singpassState">
          <!-- 其他登录方式 -->
          <div class="thirdBoxTitle b-2-cl">
            {{$t('singPassLogin.mainText1')}}
          </div>
          <div class="thirdInfor a-2-bd"
            @click="goThirdUrl(thirdList[0])"
            @mouseover.stop="addHover('0')"
            @mouseout.stop="removeHover()"
            :class="{ 'a-4-bg':  '0' === addHoverclass, 'notborder': thirdList.length < 2}">
            <img :src="thirdList[0].img" >
            <div class="thirdName">{{thirdList[0].value}}</div>
            <i v-if="thirdList.length > 1" class="dowm-icon"></i>
          </div>
          <div v-if="thirdList.length > 1" class="third-list a-5-bg b-1-cl">
            <template v-for = "(item, index) in thirdList">
              <div class="third-item"
                :key="index"
                v-if="index > 0"
                :class="{ 'a-4-bg':  index === addHoverclass }"
                @click="goThirdUrl(item)"
                @mouseover="addHover(index)"
                @mouseout="removeHover()">
                  <img :src="item.img" >
                  <div class="third-val">{{item.value}}</div>
              </div>
            </template>
            </div>
        </div>
        <div>
          <div class="guide-text b-2-cl register-tips"  v-if="registerHide === '0'">
            <span class="guide-ht">{{ $t('login.NotRegisteredUsersYet') }}</span>
            <!-- 立即注册 -->
            <c-button type="text"
              className="goRegister logBtn"
              @click="goUrl('/register')">
              {{$t('login.goRegister')}}
            </c-button>
          </div>
        </div>
        <!-- 底部区域 -->
        <div class="copy z-2-cl"
            style="border-color: #293448 !important;">
          Copyright © 2021 {{companyName}}. All rights reserve
        </div>
      </div>
    </div>
    <!-- 对话框  38-24=14 -->
    <c-dialog :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('login.SecurityVerification')">
      <!-- 验证框 -->
      <c-inputLine
        v-for="(item, index) in checkTypeList"
        :key="index"
        maxLength="6"
        :name="checkValues(item)"
        :promptText="checkOptions(item).text"
        :errorHave="true"
        :errorText="checkTexts(item)"
        :errorFlag="checkErrorFlags(item)"
        marginTop="0px"
        :value="checkValueFN(item)"
        @onchanges="inputChanges"
      >
        <!-- 手机验证码 -->
        <c-getCode v-if="checkOptions(item).haveCode && item === '2'"
          :voiceOpen ="voiceSmsOpen"
          :name="`loginGetcode${item}`"
          @click="getCodeClick"
          buttonName="loginGetcodeBtn"/>
          <!-- 邮箱验证码 -->
        <c-getCode v-if="checkOptions(item).haveCode && item === '3'"
          :name="`loginGetcode${item}`"
          @click="getCodeClick"
          buttonName="loginGetcodeBtn"/>
      </c-inputLine>
    </c-dialog>
    <div class="spcpqr-a5c3" style="dispaly: none;"></div>
    <singPassLogin :isShow="singPassDialogFlag" />
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/login/login';
import 'BlockChain-ui/PC/common-mixin/login/login.styl';
import singPassLogin from './singPassLogin.vue';

export default {
  mixins: [mixin],
  components: {
    singPassLogin,
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.page-login {
  margin: 60px auto !important;
  max-width: 466px;
}
.register-tips {
  position: relative;
  top: 90px;
  text-align: center;
}
.page-login-content {
  padding: 40px 60px 40px 60px;
}
.content-center {
  width: 100% !important;
}
.page-login-content >>>  .logBtn .common-button-slot {
  color: inherit !important
}
.guide-ht{
  color: #fff;
}
</style>
