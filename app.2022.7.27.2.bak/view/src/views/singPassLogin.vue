<!-- // Created by 任泽阳 on 18/12/06.
// 登录页面 -->
<template>
  <section class="page-login">
    <c-dialog :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      :confirmDisabled="dialogConfirmDisabled"
      :haveOption="dialoghaveOption"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="titleText">
      <div class="singPass-dialog-content">
          <div class="singPass-login-content a-4-bg b-1-cl">
            <!-- <div class="account-login" @click="accountLogin">
              <svg class="icon icon-42" aria-hidden="true">
                <use xlink:href="#icon-g_4"></use>
              </svg>
            </div> -->
            <div id="qr_wrapper"></div>
            <div v-if="isShowRefresh" class="spcpqr-cent">
                <p class="b-1-cl">{{$t('singPassLogin.mainText3')}}</p>
                <c-button
                @click="refreshHandler"
                height="30px"
                class="header-login-button">
                  {{$t('singPassLogin.mainText4')}}
                </c-button>
            </div>
            <div class="sys">
              <div class="sys-icon">
                  <svg class="icon icon-32" aria-hidden="true">
                  <use xlink:href="#icon-f_5"></use>
                </svg>
              </div>
              <div class="sys-text">
                <p>{{$t('singPassLogin.mainText5')}}
                  <span class="u-8-cl">
                  {{$t('singPassLogin.mainText6')}}</span></p>
                <p>{{$t('singPassLogin.mainText7')}}</p>
              </div>
            </div>
          </div>
          <div class="dow-singpass-app">
            {{$t('singPassLogin.mainText8')}}
            <span @click="goDow" class="u-8-cl">{{$t('singPassLogin.mainText9')}}</span>
          </div>
      </div>

    </c-dialog>
    <c-dialog :showFlag="assDialogFlag"
      paddingBottom="14px"
      :confirmLoading="assDialogConfirmLoading"
      :confirmDisabled="assDialogConfirmDisabled"
      @close="dialogClosetwo"
      class="selselogintype-dialog"
      @confirm="assDialogConfirm"
      :titleText="titleText">
      <div>
        <p class="b-7-cl">
          <svg style="float:left" aria-hidden="true" class="icon icon-16">
            <use xlink:href="#icon-c_2"></use>
          </svg>
          {{$t('singPassLogin.mainText10')}}
          </p>
        <div class="singPass-login-content b-1-cl">
          <div class="ass-item a-4-bg u-8-bd" @click="singPassLogin(1)">
              {{$t('singPassLogin.mainText11')}}
          </div>
          <div class="ass-item a-4-bg u-8-bd" @click="singPassLogin(2)">
            {{$t('singPassLogin.mainText12')}}
          </div>
        </div>
      </div>
    </c-dialog>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/singpassLogin/singpassLogin';
import 'BlockChain-ui/PC/common-mixin/singpassLogin/singpassLogin.styl';


export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
