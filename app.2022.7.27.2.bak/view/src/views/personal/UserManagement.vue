<template>
  <div class="user-management fuz-card">
    <p class="user-management-child-header b-1-cl a-3-bd a-5-bg fuz-none"
      v-if="templateLayoutType === '2'"
    >
      <!-- 账号管理 -->
      {{$t('personal.navMenu.list.userManagement')}}
    </p>
    <div class="user-management-header fuz-clear-float">
      <img :src="headImg" class="user-management-header-img"/>
      <div class="user-management-header-message b-1-cl">
        <p><span>{{nickName}}</span>
        <c-button
          @click="modify(1)"
          type="text">
          {{this.$t('personal.tool.modify')}}
        </c-button>
        </p>
        <p>{{userName}}</p>
        <p class="b-2-cl">{{this.$t('personal.userManagement.id')}}: {{id}}</p>
      </div>
      <img :src="photo" class="user-management-header-img2 fuz-none"/>
    </div>
    <div class="user-management-content fuz-clear-float fuz-noborder" >
      <p class="title medium b-1-cl a-3-bd fuz-none" >
        {{this.$t('personal.userManagement.securityTitle')}}
      </p>
      <div class="user-management-main clearfix">
        <ul class="ul">
          <li class="li clearfix">
            <!--icon占位用-->
            <!-- <svg class="li-icon icon icon-24" aria-hidden="true">
              <use xlink:href="#icon-e_1"></use>
            </svg> -->
            <img class='li-icon' src="@/assets/fuzionx/images/account/password_icon.png" alt="">
            <div class="li-div a-3-bd b-1-cl clearfix">
              <p class="li-title fuz-title-small">
                {{this.$t('personal.userManagement.securityList.password.text')}}</p>
              <p class="li-text b-2-cl fuz-content-small">
                {{this.$t('personal.userManagement.securityList.password.label')}}</p>
              <div class="li-right clearfix">
                <c-button
                  @click="changePassword"
                  className="li-fun link-btn"
                  type="text">
                  {{this.$t('personal.tool.modify')}}
                </c-button>
                <!--
                <span class="li-fun b-4-cl clearfix" @click="changePassword">
                </span>
                -->
              </div>
            </div>
          </li>
          <!-- authLevel: '', // 身份/实名认证状态，0、未审核，1、通过，2、未通过  3未认证 -->
          <!--icon占位用-->
          <!-- <li class="li clearfix">
            <svg class="li-icon icon icon-24" aria-hidden="true">
              <use xlink:href="#icon-e_2"></use>
            </svg>
            <div class="li-div a-3-bd b-1-cl clearfix">
              <p class="li-title">
                {{this.$t('personal.userManagement.securityList.idAuth.text')}}</p>
              <p class="b-2-cl" v-if="authLevel !== 1">
                {{this.$t('personal.userManagement.securityList.idAuth.label')}}</p>
              <div class="li-right clearfix">
                <c-button
                  v-if="authLevel === 0"
                  type="text"
                  className="li-fun"
                  @click="btnLink('goID')">
                  {{this.$t('personal.state.authentication')}}
                </c-button>
                <span v-if="authLevel === 1" class="li-fun b-2-cl clearfix li-fun-no">
                  {{this.$t('personal.state.certified')}}</span>
                <c-button v-if="authLevel === 2||authLevel === 3"
                        type="solid"
                        :big="true"
                        className="user-button"
                        paddingW="18px"
                        height="30px"
                        @click="btnLink('identity')">
                  {{this.$t('personal.state.certification')}}</c-button>
              </div>
            </div>
          </li> -->
          <li class="li clearfix">
            <!--icon占位用-->
            <!-- <svg class="li-icon icon icon-24" aria-hidden="true">
              <use xlink:href="#icon-e_3"></use>
            </svg> -->
            <img class='li-icon' src="@/assets/fuzionx/images/account/email_icon.png" alt="">
            <div class="li-div a-3-bd b-1-cl clearfix">
              <p class="li-title fuz-title-small">
                {{this.$t('personal.userManagement.securityList.email.text')}}
              </p>
              <p class="li-text b-2-cl fuz-content-small">
                {{this.$t('personal.userManagement.securityList.email.label')}}
              </p>
              <div class="li-right clearfix">
                <c-button
                  v-if="email"
                  type="text"
                  className="li-fun link-btn"
                  @click="changeEmail">
                  {{this.$t('personal.tool.modify')}}
                </c-button>
                <!--
                <span v-if="email"
                      class="li-fun b-4-cl clearfix"
                      @click="changeEmail">{{this.$t('personal').tool.modify}}</span>
                      -->
                  <c-button v-else
                          type="solid"
                          :big="true"
                          className="user-button  link-btn"
                          paddingW="18px"
                          height="30px"
                          @click="btnLink('email')">{{this.$t('personal.tool.bind')}}</c-button>
                <p v-if="email" class="li-email b-2-cl clearfix">{{email}}</p>
              </div>
            </div>
          </li>
          <li class="li clearfix">
            <!--icon占位用-->
            <!-- <svg class="li-icon icon icon-24" aria-hidden="true">
              <use xlink:href="#icon-e_4"></use>
            </svg> -->
            <img class='li-icon' src="@/assets/fuzionx/images/account/phone_icon.png" alt="">
            <div class="li-div a-3-bd b-1-cl clearfix">
              <p class="li-title fuz-title-small">
                {{this.$t('personal.userManagement.securityList.phone.text')}}
              </p>
              <p class="li-text b-2-cl fuz-content-small">
                {{this.$t('personal.userManagement.securityList.phone.label')}}
              </p>
              <div class="li-right clearfix">
                <c-button
                  v-if="smsCode&&googleCode"
                  type="text"
                  className="li-fun li-fun1 link-btn">
                  <router-link class="b-4-cl" to="/personal/closePhone">
                    {{this.$t('personal.state.closeValidatio')}}</router-link>
                </c-button>
                <c-button
                  v-if="!smsCode&&mobileNumber"
                  className="li-fun link-btn"
                  type="text"
                  style="margin-left: 22px;"
                  @click="openMobile">
                  {{this.$t('personal.state.openValidatio')}}
                </c-button>
                <c-button
                  v-if="mobileNumber"
                  type="text"
                  className="li-fun link-btn">
                  <router-link class="b-4-cl" to="/personal/changePhone">
                    {{this.$t('personal.tool.modify')}}</router-link>
                </c-button>
                <c-button v-if="!mobileNumber"
                        type="solid"
                        :big="true"
                        className="user-button link-btn"
                        paddingW="18px"
                        height="30px"
                        @click="btnLink('phone')">{{this.$t('personal.tool.bind')}}</c-button>
                <p class="li-email b-2-cl clearfix" v-if="mobileNumber">{{mobileNumber}}</p>
              </div>
            </div>
          </li>
          <li class="li clearfix" style="border-bottom-width: inherit;">
            <!--icon占位用-->
            <!-- <svg class="li-icon icon icon-24" aria-hidden="true">
              <use xlink:href="#icon-e_5"></use>
            </svg> -->
            <img class='li-icon' src="@/assets/fuzionx/images/account/google_icon.png" alt="">
            <div class="li-div a-3-bd b-1-cl clearfix">
              <p class="li-title fuz-title-small">
                {{this.$t('personal.userManagement.securityList.google.text')}}
              </p>
              <p class="li-text b-2-cl fuz-content-small">
                {{this.$t('personal.userManagement.securityList.google.label')}}
              </p>
              <div class="li-right clearfix">
                <c-button
                  v-if="smsCode&&googleCode"
                  type="text"
                  className="li-fun  link-btn">
                  <router-link class="b-4-cl" to="/personal/closeGoogle">
                    {{this.$t('personal.state.closeValidatio')}}</router-link>
                </c-button>
                <!--
                <span v-if="smsCode&&googleCode" class="li-fun b-4-cl clearfix">
                  <router-link class="b-4-cl" to="/personal/closeGoogle">
                    {{this.$t('personal').state.closeValidatio}}</router-link></span>
                    -->
                <c-button v-if="!googleCode"
                        type="solid"
                        :big="true"
                        className="user-button  link-btn"
                        paddingW="18px"
                        height="30px"
                        @click="btnLink('google')">{{this.$t('personal.tool.bind')}}</c-button>
                <span v-if="googleCode&&!smsCode" class="li-fun b-2-cl clearfix">
                  {{this.$t('personal.state.open')}}</span>
              </div>
            </div>
          </li>
          <li class="li" v-if="feeCoinOpen === '1'">
            <!--icon占位用-->
            <!-- <svg class="li-icon icon icon-24" aria-hidden="true">
              <use xlink:href="#icon-e_6"></use>
            </svg> -->
            <img class='li-icon' src="@/assets/fuzionx/images/account/pay_icon.png" alt="">
            <div class="li-div a-3-bd b-1-cl">
              <p class="li-title fuz-title-small">
                {{this.$t('personal.userManagement.otherList.poundage.text')}}</p>
              <p class="li-text b-2-cl fuz-content-small">
                {{this.$t('personal.userManagement.otherList.poundage.label')}}</p>
              <div class="li-right">
                <c-switch :value="switchValue" @click="switchChange"/>
              </div>
            </div>
          </li>
          <li class="li">
            <!--icon占位用-->
            <!-- <svg class="li-icon icon icon-24" aria-hidden="true">
              <use xlink:href="#icon-b_11"></use>
            </svg> -->
            <img class='li-icon' src="@/assets/fuzionx/images/account/invite_icon.png" alt="">
            <div class="li-div a-3-bd b-1-cl">
              <p class="li-title fuz-title-small">
                {{this.$t('personal.userManagement.otherList.myInviteCod.text')}}</p>
              <p class="li-text b-2-cl fuz-content-small">
                {{this.$t('personal.userManagement.otherList.myInviteCod.label')}}</p>
              <div class="li-right">
                <c-button
                  className='link-btn'
                  @click="modify(2)"
                  type="text">
                  {{this.$t('personal.tool.view')}}
                </c-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <c-dialog :showFlag="dialogFlag"
            paddingBottom="14px"
            paddingTop="14px"
            :confirmLoading="dialogConfirmLoading"
            :confirmDisabled="dialogConfirmDisabled"
            @close="dialogClose"
            @confirm="dialogConfirm"
            :titleText="titleText">
      <!-- 验证框 -->
      <c-inputLine v-if="dialogType === 1"
        name="checkValue"
        maxLength="10"
        :promptText="promptText"
        :errorHave="true"
        :errorText="errorText"
        :errorFlag="checkErrorFlag"
        marginTop="0px"
        :value="checkValue"
        @onchanges="inputChanges"
        @focus="checkFocus"
      >
      </c-inputLine>
      <div class="clearfix invite-link-box">
        <c-button
          @click="goAgent"
          className="invite-link"
          v-if="userInfo && userInfo.agentStatus === 1 && dialogType === 2"
          type="text">
          {{this.$t('personal.userManagement.inviteLink')}}
        </c-button>
      </div>
      <div class="dialog-div a-4-bg" v-if="dialogType === 2">
        <div class="dialog-div-module a-5-bd">
          <p>{{$t('personal.label.inviteCode')}}</p>
          <p>
            <span class="b-2-cl">{{inviteCode}}</span>
            <span @click="copyClick('inviteCode')"
                  @mouseenter="handMouseenter('inviteCode')"
                  @mouseleave="handMouseleave('inviteCode')">
              <span v-if="inviteCodeShow">
                  <svg class="icon icon-14"
                       aria-hidden="true">
                    <use xlink:href="#icon-a_9"></use>
                  </svg>
                </span>
              <span v-else>
                  <svg class="icon icon-14"
                       aria-hidden="true">
                    <use xlink:href="#icon-a_9_1"></use>
                  </svg>
              </span>
            </span>
          </p>
        </div>
        <div class="dialog-div-module a-5-bd">
          <p>{{$t('personal.label.inviteUrl')}}</p>
          <p>
            <span class="b-1-cl">{{inviteUrl}}</span>
            <span @click="copyClick('inviteUrlShow')"
                  @mouseenter="handMouseenter('inviteUrlShow')"
                  @mouseleave="handMouseleave('inviteUrlShow')">
              <span v-if="inviteUrlShow">
                  <svg class="icon icon-14"
                       aria-hidden="true">
                    <use xlink:href="#icon-a_9"></use>
                  </svg>
                </span>
              <span v-else>
                  <svg class="icon icon-14"
                       aria-hidden="true">
                    <use xlink:href="#icon-a_9_1"></use>
                  </svg>
              </span>
            </span>
          </p>
        </div>
        <div class="dialog-div-module a-5-bd">
          <p>{{$t('personal.label.inviteQECode')}}</p>
          <div class="img-div a-5-bg">
            <img :src="inviteQECode"/>
          </div>
        </div>
      </div>
    </c-dialog>
    <!-- 实名认证 -->
    <c-dialog :showFlag="kycPhoneFlag"
            class="idAuthDialog"
            paddingBottom="14px"
            :titleText="$t('personal.idAuth.title')"
            @close="kycPhoneClose"
            @confirm="kycPhoneConfirm"
            :confirmLoading="kycLoading">
      <!-- 请选择您的国家或地区 -->
      <c-select
        :value="country"
        :promptText="$t('personal.kyc.area')"
        @onChanges='countryChange'
        name="certificateType"
        :imgMap="imgMap"
        :errorHave="true"
        :options="countryListMoy"
        :filterable="true"
      />
    </c-dialog>
    <!-- 提示框 -->
    <c-alert :showFlag="alertFlag"
           :buttonText="this.$t('personal').alert.button"
           imageType="1"
           :imgMap="imgMap"
           @close="alertClose"
           @confirm="alertGo">
      <div class="alertTitle b-1-cl">{{this.$t('personal.alert.title')}}</div>
      <div class="alertText">{{this.$t('personal.alert.text')}}</div>
      <div class="alertErrorr a-2-bd">
        <span class="alertError-text b-4-cl">
          {{$t('personal.alert.alertErrorTextGoogle')}}</span>
        <svg class="icon icon-14 alertError-icon" aria-hidden="true">
          <use xlink:href="#icon-a_14"></use>
        </svg>
      </div>
      <div class="alertErrorr alertBot a-2-bd">
        <span class="alertError-text b-4-cl">
          {{$t('personal.alert.alertErrorTextPhone')}}</span>
        <svg class="icon icon-14 alertError-icon" aria-hidden="true">
          <use xlink:href="#icon-a_14"></use>
        </svg>
      </div>
    </c-alert>
    <kycAuthselect :countryVal="country.split('+')[1]"
    :countryKeyCodeVal="countryKeyCode.split('+')[1]" />
    <corpAuthselect
      :countryVal="country.split('+')[1]"
      :countryKeyCodeVal="countryKeyCode.split('+')[1]" />
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/UserManagement/UserManagement';
import 'BlockChain-ui/PC/common-mixin/personal/UserManagement/UserManagement.styl';
import kycAuthselect from './kycAuthselect.vue';
import corpAuthselect from './corpAuthselect.vue';

export default {
  mixins: [mixin],
  components: { kycAuthselect, corpAuthselect },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.user-management {
  padding: 40px !important;
}
.user-management * {
  float: none !important;
}
.user-management-content {
  height: auto !important;
}
.user-management-header {
  display: flex;
}
.user-management-main ul{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 40px;
}

.user-management-main ul li{
  float: none;
  border: 2px solid rgba(198, 192, 199, 0.1) !important;
  position: relative;
  border-radius: 10px;
}
.user-management-main ul li p {
  padding: 10px 20px;
}
.user-management-main ul li .li-title {
  margin-top: 10px;
}
.user-management-main ul li .li-text {
  margin-bottom: 10px;
  color: rgba(255,255,255,0.5) !important;
}
.user-management .li-div {
  width: 100%;
  float: none;
  border: none !important;
  padding-bottom: 70px;
  height: 180px;
}
.user-management .li-icon {
  position: absolute;
  right: 26px;
  top: 26px;
  height: 60px;
  margin: 0 !important
}
.user-management .li-right{
  position:absolute;
  float:none;
  bottom:0 !important;
  left:0 !important;
  right:0 !important;
  top: auto !important;
  border-top: 2px solid rgba(198, 192, 199, 0.1) !important;
  padding: 0 20px;
  height: 50px;
  display: flex;
  align-items: center;
}
.link-btn {
  top: 0 !important;
  color: #00957B !important;
  font-size: 14px !important;
  background: transparent !important;
}
.link-btn:hover {
  opacity: 0.8 !important;
}
.link-btn >>> * {
  color: #00957B !important;
  font-size: 14px !important;
}
</style>
