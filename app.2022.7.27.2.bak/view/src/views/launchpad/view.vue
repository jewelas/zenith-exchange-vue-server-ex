<template>
  <div class="launchpad-view">
    <div class="launchpad-view-info">
      <div class="view-info-title">
      <span class="view-info-title-return" @click="returnList()"  >
       {{$t('launchpad.text13')}}</span>  <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220705150413833.svg" alt="">  <span> {{ pageData.name }}
       </span>
      </div>
      <div class="view-info-box fuz-card-plain">
        <div class="view-info-box-title">
          {{ pageData.name }}
        </div>
        <div class="view-info-box-content">
          <div class="view-info-box-contentL">
            <img :src="pageData.launchpadBanner ?
            pageData.launchpadBanner : 'https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220705112302185.png'" alt="">
            <div class="left-logo-icon1 left-logo-icon" v-if="pageData.status === 3">
              {{$t('launchpad.text4')}}
            </div>
            <div class="left-logo-icon1 left-logo-icon" v-if="pageData.status === 2">
               {{$t('launchpad.text32')}}
            </div>
            <div class="left-logo-icon2 left-logo-icon" v-if="pageData.status === -1">
              {{$t('launchpad.text9')}}
            </div>
            <div class="left-logo-icon3 left-logo-icon" v-if="pageData.status === 4">
              {{$t('launchpad.text12')}}
            </div>
          </div>
          <div class="view-info-box-contentR">
            <div class="item-content-right-line">
              <p class="item-content-right-lineText">
                <span >
                    <!-- 融资总额 -->
                    <span class="content-right-lineText-name">{{$t('launchpad.text35')}}:</span>
                    {{fixDFun(pageData.money, pageData.coinSymbol)}}
                    {{pageData.coinSymbol | getCoinShowName(coinList)}}
                </span>
                <span>
                  {{countScale(pageData.speed ,100)}}%
                </span>
              </p>
              <div class="item-content-right-bar v5-17-bg">
                <div class="jdt-bar v5-1-bg"
                :style="{'width':countScale(pageData.speed ,100)  + '%'}">
                </div>
              </div>
            </div>
            <div class="view-info-box-input">
                  <c-v5-input
                   :placeholder="promptText"
                    name="amount"
                    marginTop="0px"
                    width="100%"
                    :disabled="amountDisabled"
                    :value="amount"
                    @onChanges="inputChanges"
                    className="spe-input"
                    :warningText="warningText"
                  >
                    <span class="input-slot"  v-if='pageData.orderType === 1' slot="append">
                      {{ pageData.grantSymbol | getCoinShowName(coinList)}}
                    </span>
                    <span class="input-slot"   v-else slot="append">
                      {{ pageData.coinSymbol | getCoinShowName(coinList)}}
                    </span>
                  </c-v5-input>
            </div>
            <div class="view-info-box-input-list v5-17-bg">
                <div class="info-box-input-list-item" >
                  <div class="info-box-input-list-itemL">{{ $t('launchpad.text34') }}</div>
                  <div class="info-box-input-list-itemR">
                    {{ fixDFun(pageData.money, pageData.coinSymbol) }}
                    {{ pageData.coinSymbol | getCoinShowName(coinList) }}
                  </div>
                </div>
                <div class="info-box-input-list-item" >
                  <div class="info-box-input-list-itemL">{{ $t('launchpad.text36') }}</div>
                  <div class="info-box-input-list-itemR">
                    <p class="val" v-if="pageData.orderType === 1">
                        1
                        {{ pageData.grantSymbol | getCoinShowName(coinList) }}
                        =
                        {{ fixDFun(pageData.initPriceV2, pageData.coinSymbol) }}
                        {{ pageData.coinSymbol | getCoinShowName(coinList) }}
                    </p>
                    <p class="val" v-else>
                        1 {{ pageData.coinSymbol | getCoinShowName(coinList) }}
                        =
                        {{ fixDFun(pageData.initPrice, pageData.grantSymbol) }}
                        {{ pageData.grantSymbol | getCoinShowName(coinList) }}
                    </p>
                  </div>
                </div>
                <div class="info-box-input-list-item" >
                  <div class="info-box-input-list-itemL">{{ $t('launchpad.text37') }}</div>
                  <div class="info-box-input-list-itemR">
                    <p class="val" v-if="pageData.singleMaxCount === 0">
                      <!-- 不限制 -->
                      {{ $t("innov.notLimit") }}
                    </p>
                    <p class="val" v-else>{{ pageData.singleMaxCount }}</p>
                  </div>
                </div>
                <div class="info-box-input-list-item" v-if="!pageData.holdCoin" >
                  <div class="info-box-input-list-itemL">{{ $t('launchpad.text38') }}</div>
                  <div class="info-box-input-list-itemR">
                    <p class="val" v-if="!pageData.holdCoin">
                      {{ pageData.singleMinRaiseMoney }} -
                      {{ pageData.singleMaxRaiseMoney }}
                      {{ pageData.coinSymbol | getCoinShowName(coinList) }}
                    </p>
                  </div>
                </div>
                <div class="info-box-input-list-item" style="margin: 0;">
                  <div class="info-box-input-list-itemL">{{ $t('launchpad.text26') }}</div>
                  <div class="info-box-input-list-itemR">{{ formatTimeFn(pageData.endTime) }}</div>
                </div>
            </div>
            <div class="view-info-box-input-btn">
              <c-verify
                v-if="verificationType === '2'"
                :colorMap="colorMap"
                marginTop="6px"
                :errorHave="true"
                product="bind"
                @getCaptchaObj="getCaptchaObj"
                @callback="verifyCallBack"
              />
              <c-v5-button
                type="solid"
                v-if="isLogin"
                :disabled="submitDisabled"
                height="48px"
                width="100%"
                className="logBtn"
                paddingW="0px"
                @click="submit">
                  <!-- 立即兑换 -->
                  {{ buttonText }}
              </c-v5-button>
              <c-v5-button
                v-else
                type="solid"
                height="48px"
                width="100%"
                paddingW="0px"
                @click="goLogin">
                <!-- 登录/注册 -->
                {{ $t("innov.loginReg") }}
              </c-v5-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  class="launchpad-view-table">
      <div  class="launchpad-view-table-left">
        <div class="fuz-card-title">
          <div class="view-table-tabTitle-tab "
          :class="(tabIndex=== '1') ? 'v5-1-bd view-table-tabTitle-tab-active' : ''"
          @click="changeTab('1')">{{ $t("launchpad.text14") }}</div>
          <div class="view-table-tabTitle-tab"
          v-if="pageData.coinSymbolExt && pageData.coinSymbolExt.coinSymbol"
          :class="(tabIndex=== '2') ? 'v5-1-bd view-table-tabTitle-tab-active' : ''"
          @click="changeTab('2')">{{ $t("launchpad.text15") }}</div>
        </div>
        <div class="launchpad-view-table-tab fuz-card-plain">
          <div v-if="tabIndex === '1'">
            <div class="launchpad-view-table-tabName">
              <!-- About Project -->
              {{ $t("launchpad.text16") }}
            </div>
            <div class="launchpad-view-table-tabIcon" v-if='pageData.shareConfiguration'>
              <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182750549.png"
                v-if='pageData.shareConfiguration && pageData.shareConfiguration.twitter'
                @click="openNew(pageData.shareConfiguration.twitter)"
                />
                <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182806218.png"
                v-if='pageData.shareConfiguration && pageData.shareConfiguration.telegram'
                @click="openNew(pageData.shareConfiguration.telegram)"
                />
                <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182827300.png"
                v-if='pageData.shareConfiguration && pageData.shareConfiguration.discord'
                @click="openNew(pageData.shareConfiguration.discord)"
                />
                <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220627182725156.png"
                v-if='pageData.shareConfiguration && pageData.shareConfiguration.other'
                @click="openNew(pageData.shareConfiguration.other)"
                />
            </div>
            <div class="custom-box" v-html="pageData.details"></div>
          </div>
          <div v-if="tabIndex === '2'">
            <div class="launchpad-view-table-tabName">
              <!-- Token Metrics -->
              {{ $t("launchpad.text15") }}
            </div>
            <div class="launchpad-view-table-tokenBox">
              <div class="launchpad-view-table-tokendata bottomBorder">
                  <p>{{ $t("launchpad.text25") }}</p>
                    <p class="val" v-if="pageData.orderType === 1">
                      1
                      {{ pageData.grantSymbol | getCoinShowName(coinList) }}
                      =
                      {{ fixDFun(pageData.initPriceV2, pageData.coinSymbol) }}
                      {{ pageData.coinSymbol | getCoinShowName(coinList) }}
                  </p>
                  <p class="val" v-else>
                      1 {{ pageData.coinSymbol | getCoinShowName(coinList) }}
                      =
                      {{ fixDFun(pageData.initPrice, pageData.grantSymbol) }}
                      {{ pageData.grantSymbol | getCoinShowName(coinList) }}
                  </p>
              </div>
              <div class="launchpad-view-table-tokendata bottomBorder">
                  <p>{{ $t("launchpad.text13") }}{{ $t("launchpad.text27") }}</p>
                  <p>{{formatTimeFn(pageData.startTime)}}</p>
              </div>
              <div class="launchpad-view-table-tokendata bottomBorder">
                  <p>{{ $t("launchpad.text13") }}{{ $t("launchpad.text26") }}</p>
                  <p>{{formatTimeFn(pageData.endTime)}}</p>
              </div>
              <div class="launchpad-view-table-tokendata bottomBorder">
                  <p>{{ $t("launchpad.text28") }}</p>
                  <p>{{formatTimeFn(pageData.coinSymbolExt.publishTime)}}</p>
              </div>
              <div class="launchpad-view-table-tokendata bottomBorder">
                  <p>{{ $t("launchpad.text29") }}</p>
                  <p>{{pageData.coinSymbolExt.currencyAmount}}</p>
              </div>
              <div class="launchpad-view-table-tokendata">
                  <p>{{ $t("launchpad.text30") }}</p>
                  <p>{{pageData.coinSymbolExt.publishAmount}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="launchpad-view-table-right fuz-card-plain">
        <div class="launchpad-view-table-right-title">
          <!-- How to participate？ -->
          {{ $t("launchpad.text17") }}
        </div>
        <div class="launchpad-view-table-right-list">
          <div style="display:flex;align-items: center;">
            <span class="dot"></span>
          {{ $t("launchpad.text18") }}
          <span style="font-family: DINPro-bold;margin-left: 4px;font-weight: 500;font-size:16px;">
          {{publicInfo.msg.company_name}}</span></div>
          <span class="registerBtn v5-1-bg"
          @click="goRouter('/register')"
          v-if="!isLogin">{{ $t("header.register") }}</span>
          <span class='loginBtn v5-1-cl v5-17-bg'
          @click="goRouter('/login')"
          v-if="!isLogin">{{ $t("header.login") }}</span>
        </div>
        <div class="launchpad-view-table-right-list"
         v-if="pageData.isAuthRealname"
       >
          <div>
            <span class="dot"></span>{{ $t("launchpad.text19") }}
            <span class="kycBtn v5-1-cl"
             v-if="userInfo.authLevel !== 1"
            @click="goRouter('/personal/userManagement')">{{ $t("launchpad.text20") }}</span></div>
        </div>
        <div class="launchpad-view-table-right-list"
        v-if="pageData.holdAmount  && pageData.holdAmount !== 0 && pageData.holdSymbol">
          <div>
            <span class="dot"></span>
            {{ $t("launchpad.text21") }} {{ pageData.holdAmount }}
            {{ pageData.holdSymbol | getCoinShowName(coinList) }}
            <span class="kycBtn v5-1-cl"
            @click="goRouter('/newAssets/exchangeAccount')">
            {{ $t("launchpad.text22") }}</span></div>
        </div>
         <div class="launchpad-view-table-right-list"
        v-if="Number(pageData.entranceAmount) > 0">
          <div>
            <span class="dot"></span>
            {{ $t("launchpad.text23") }}  {{ fixFloat(pageData.entranceAmount, precision) }}
              {{ pageData.entranceSymbol | getCoinShowName(coinList) }}，{{ $t("launchpad.text24") }}
            <span class="kycBtn v5-1-cl"
            @click="goRouter('/newAssets/exchangeAccount')">
            {{ $t("launchpad.text22") }}</span></div>
        </div>
        <div class="launchpad-view-table-right-list"
        v-if="pageData.advanceSellConfig">
          <div>
            <span class="dot"></span>
            {{ $t('launchpad.text33',
            {time: pageData.advanceSellConfig.advanceTime,
            type:pageData.advanceSellConfig.advanceTimeType === '0' ?
            $t('innov.hours') : $t('launchpad.day'),
            num: pageData.advanceSellConfig.advanceBuyMultiple}) }}
          </div>
        </div>
      </div>
    </div>
    <div class="custom-box" v-if="customOpen && custom !== 'launchpad_footer_html'">
      <div v-html="custom"></div>
    </div>
    <!-- 去注册 -->
    <div v-if="isLogin" style="height:120px"></div>
    <div class="go-register" v-if="!isLogin">
      <h1 class="go-register-title">
        {{$t('home.custom_text25')}}
      </h1>
      <p>
        {{$t('home.custom_text26')}}
      </p>
      <a href="/register" class="v5-1-bg">
        <span>{{$t('home.custom_text27')}}</span>
        <span>→</span>
        <span class="btn-hover"></span>
      </a>
    </div>
    <!-- 阿里验证 -->
    <c-dialog
      :showFlag="isShowAliCaptcha"
      :titleText="$t('login.SecurityVerification')"
      :haveOption="false"
      @close="isShowAliCaptcha = false"
    >
      <c-verify
        :colorMap="colorMap"
        marginTop="6px"
        :errorHave="true"
        product="bind"
        @callback="verifyCallBack"
      />
    </c-dialog>
    <!-- 对话框  38-24=14 -->
    <c-v5-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :confirmDisabled="confirmBtnFlag"
      :titleText="$t('login.SecurityVerification')"
    >
      <!-- 谷歌验证框 -->
      <c-v5-input
        v-if="userInfo && googleStatus === 1"
        maxLength="6"
        width="100%"
        className="spe-input"
        name="googleVlaue"
        :promptText="googleVlaueForm.text"
        :errorHave="true"
        :errorText="googleErrorText"
        :errorFlag="googleErrorFlag"
        marginTop="0px"
        :value="googleVlaue"
        @onChanges="inputChanges"
      />
      <!-- 短信验证框 -->
      <c-v5-input
        v-if="userInfo && isOpenMobileCheck === 1"
        maxLength="6"
        name="checkValue"
        className="spe-input"
         width="100%"
        :promptText="checkPhione.text"
        :errorHave="true"
        :errorText="checkErrorText"
        :errorFlag="checkErrorFlag"
        marginTop="32px"
        :value="checkValue"
        @onChanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <div slot="append">
          <c-v5-getCode
            :voiceOpen ="voiceSmsOpen"
            name="loginGetcode"
            @click="getCodeClick"
            buttonName="loginGetcodeBtn"
          />
        </div>
      </c-v5-input>
      <!-- 邮箱验证框 -->
      <c-v5-input
        v-if="
          userInfo &&
            emailAuthOpen &&
            isOpenMobileCheck !== 1 &&
            pageData.email_validate_open
        "
        maxLength="6"
        className="spe-input"
        name="emailCheckValue"
        :promptText="emailVlaueForm.text"
        :errorHave="true"
        :errorText="checkErrorText"
        :errorFlag="checkEmailErrorFlag"
        marginTop="0px"
        :value="emailCheckValue"
        @onChanges="inputChanges"
      >
        <!-- 获取验证码 -->\
        <div slot="append">
          <c-getCode
            name="EmailCode"
            @click="postEmailCode"
            buttonName="loginGetcodeBtn"
          />
        </div>
      </c-v5-input>
    </c-v5-dialog>
    <!-- 提示框 -->
    <div class="alert-box" v-if="alertFlag">
      <div class="alert-mark"></div>
      <div class="alert-content-box">
        <div class="alert-header">
          <img src="https://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220630183327306.svg" alt="" @click="closeAlert()">
        </div>
        <div class="alert-content">
          <img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220630183745731.svg" alt="">
          <p class="alert-content-title">{{ $t("launchpad.text31") }}</p>
          <p class="alert-content-list" v-if="userInfo.authLevel !== 1 && pageData.isAuthRealname">
            {{ $t("launchpad.text19") }}
            <span class="v5-1-cl"
            @click="goRouter('/personal/userManagement')">{{ $t("launchpad.text20") }}</span>
          </p>
          <p class="alert-content-list"
          v-if="pageData.holdAmount  && pageData.holdAmount !== 0 && pageData.holdSymbol">
            {{ $t("launchpad.text21") }} {{ pageData.holdAmount }}
            {{ pageData.holdSymbol | getCoinShowName(coinList) }}
            <span class="v5-1-cl"
            @click="goRouter('/newAssets/exchangeAccount')">
            {{ $t("launchpad.text22") }}</span>
          </p>
          <p class="alert-content-list" v-if="Number(pageData.entranceAmount) > 0">
              {{ $t("launchpad.text23") }}  {{ fixFloat(pageData.entranceAmount, precision) }}
                {{ pageData.entranceSymbol | getCoinShowName(coinList) }}，
                {{ $t("launchpad.text24") }}
              <span class="v5-1-cl"
              @click="goRouter('/newAssets/exchangeAccount')">
              {{ $t("launchpad.text22") }}</span>
          </p>

        </div>
        <div class="alert-btn v5-1-bg" @click="closeAlert()">
          {{this.$t('components.alert.buttonText')}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/launchpad/view/view';
import 'BlockChain-ui/PC/common-mixin/launchpad/view/view.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.launchpad-view {
  background: transparent;
}
.launchpad-view .launchpad-view-info {
  background: transparent !important;
  max-width: 1280px;
}
.launchpad-view >>> *
{
  color: #fff !important;
  font-family: Inter;
}
.launchpad-view  >>> .spe-input .content {
  background: transparent !important;
}
.launchpad-view  >>> .spe-input .v5-9-bd {
  border: none !important;
}
.project-normal {
  width: 1280px !important
}
.go-register, .launchpad-view  >>> .custom-box-top {
  background: transparent !important;
}
.launchpad-view  .dot {
  background:#fff !important;
}
.launchpad-view >>> .launchpad-view-table .launchpad-view-table-right {
  margin-top: 97px;
}
</style>
