<template>
  <div class="ipfsView">
    <div class="ipfsView-content c-4-bg">
      <div class="main-content">
        <div class="content-top c-5-bd">
          <div class="img">
            <!-- <img :src="pageData.logo" alt /> -->
            <img :src="bannerImg" alt />
          </div>
          <div class="info">
            <h2 class="tit f-1-cl">{{ pageData.name }}</h2>
            <p class="time">
              {{ $t('ipfs.text1') }}
              {{ formatTimeFn(pageData.startTime) }}
               ～
               {{ formatTimeFn(pageData.endTime) }}
            </p>
            <div class="countdown Zf-1-cl">
                  <!-- 倒计时 -->
                  {{ $t('ipfs.text2') }}
                  <div class="countdown-time" v-html="pageData.djs"></div>
              </div>
          </div>
        </div>
      </div>
      <div class="base-info">
        <div class="bf">
          <div>
            <span>
              <!-- 已售 -->
              {{ $t('ipfs.text4') }}
            </span>
            <div class="f-r" v-if="pageData.orderType === 1">
                <!-- 总算力 -->
                {{ $t('ipfs.text5') }}
                <span class="f-1-cl" >
                  {{ fixDFun(pageData.tokenAmount, pageData.grantSymbol) }}
                  {{ pageData.grantSymbol | getCoinShowName(coinList) }}
                </span>
            </div>
            <div class="f-r" v-else>
              <!-- 出售总额 -->
              {{ $t('ipfs.text6') }}
              <span class="f-1-cl">
                {{ fixDFun(pageData.money, pageData.coinSymbol) }}
                {{ pageData.coinSymbol | getCoinShowName(coinList) }}
              </span>
           </div>
          </div>
          <div class="jdt c-5-bg">
            <div class="jdt-bar c-8-bg"
              :style="{'width':countScale(pageData.speed, 100)  + '%'}">
              <span class="num u-16-cl" :class="numClass(pageData.speed)">
                {{countScaleNum(pageData.speed ,100)}}%
              </span>
            </div>

          </div>
        </div>
        <c-navTab
          class="a-3-bd"
          activeClassName="b-1-cl"
          activeColor="a-12-bg"
          className="b-2-cl"
          :currentTab="nowType"
          :navTab="navTab"
          lineHeight="55"
          @currentType="currentType"
        />
        <div v-if="nowType === 1 || !isMobel" class="infor-list">
          <div class="infor-box clearfix">
            <div class="infor-item">
              <p class="key">
                <!-- 矿池 -->
                {{ $t('ipfs.text7') }}
              </p>
              <p class="val f-1-cl">
                {{ pageData.otherName }}
              </p>
            </div>
            <div class="infor-item">
              <p class="key">
                <!-- 租赁周期 -->
                {{ $t('ipfs.text15') }}
              </p>
              <p class="val f-1-cl">
                {{ pageData.times }}
              </p>
            </div>
            <div class="infor-item">
              <p class="key">
                <!-- 算力 -->
                {{ $t('ipfs.text8') }}
              </p>
              <p class="val f-1-cl">
                {{ pageData.power }}
              </p>
            </div>
            <div class="infor-item">
              <p class="key">
                <!-- 技术服务费 -->
                {{ $t('ipfs.text9') }}
              </p>
              <p class="val f-1-cl">
                {{pageData.fee}}
              </p>
            </div>
          </div>
          <div class="dprice">
            <!-- 单价 -->
            {{ $t('ipfs.text10') }}
            <span class="num u-8-cl">
              {{ pageData.initPriceV2 }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
            </span>
            ≈ {{ unitPriceTate }}
          </div>
          <c-inputLine
            name="amount"
            :promptText="promptText"
            :errorHave="errorHave"
            errorText
            :disabled="amountDisabled"
            :errorFlag="errorFlag"
            marginTop="0px"
            :value="amount"
            @onchanges="inputChanges"
          >
            <span class="f-1-cl"  v-if='pageData.orderType === 1' >
              {{ pageData.grantSymbol | getCoinShowName(coinList)}}
            </span>
            <span class="f-1-cl" v-else>
              {{ pageData.coinSymbol | getCoinShowName(coinList)}}
            </span>
          </c-inputLine>
          <p class="symbol_amount" v-if="pageData.orderType === 1">
              <!-- 总金额 -->
              {{ $t('ipfs.text11') }}：
              {{ amountTotal }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
          </p>
          <p class="vol">
            <!-- 余额 -->
            {{ $t('ipfs.text12') }}：
            {{ fixDFun(pageData.u_coinSymbol_amount, pageData.coinSymbol) }}
            {{ pageData.coinSymbol | getCoinShowName(coinList) }}
          </p>
          <c-verify
            v-if="verificationType === '2'"
            :colorMap="colorMap"
            marginTop="6px"
            :errorHave="true"
            product="bind"
            @getCaptchaObj="getCaptchaObj"
            @callback="verifyCallBack"
          />
          <p class="clause">
            <c-checkBox :value="textFlag" @click="checkoutClick"/>
            <!-- 我已阅读并同意  -->
            {{ $t('ipfs.text13') }}
            <span class="clauseLink u-8-cl" @click="clauseLink">
              <!-- 矿机租赁/购买协议  -->
              {{ $t('ipfs.text14') }}
            </span></p>
          <c-button
            type="solid"
            v-if="isLogin"
            :disabled="submitDisabled"
            height="40px"
            width="100%"
            paddingW="0px"
            @click="submit">
              <!-- 立即购买 -->
              {{ buttonText }}
          </c-button>
          <c-button
            v-else
            type="solid"
            height="40px"
            width="100%"
            paddingW="0px"
            @click="goLogin">
            <!-- 登录/注册 -->
            {{ $t("innov.loginReg") }}
          </c-button>
          <!-- 该项目需要持有XXXXX -->
          <p class="tt" v-if="pageData.holdAmount">
            {{ $t("innov.Only") }} {{ pageData.holdAmount }}
            {{ pageData.holdSymbol | getCoinShowName(coinList) }}
            <a @click="goTrade()" class="u-8-cl" href="javascript:;">{{ $t("innov.Hold") }}</a>
          </p>
          <!-- 该项目需要消耗XXXXXX -->
          <div
            class="spend-regon" :class="spendWarning ? 'f-7-cl' : ''"
            v-if=" is_newcoin_project_entrance && pageData.entranceAmount">
            <p>
              {{ $t("innov.spend") }}
              {{ fixFloat(pageData.entranceAmount, precision) }}
              {{ pageData.entranceSymbol | getCoinShowName(coinList) }}
            </p>
            <p>
              {{ $t("innov.currentBalance") }}
              {{ fixFloat(pageData.u_entranceSymbol_account, precision) }}
              {{ pageData.entranceSymbol | getCoinShowName(coinList) }}
              {{ spendWarning ? $t("innov.spendTip") : "" }}
            </p>
          </div>
        </div>
      </div>
      <p style="clear: both"></p>
      <div v-if="nowType === 2 || !isMobel" class="main-text c-5-bd"
        v-html="pageData.details"></div>
    </div>
    <c-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogConfirmLoading"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :confirmDisabled="confirmBtnFlag"
      :titleText="$t('login.SecurityVerification')"
    >
      <!-- 谷歌验证框 -->
      <c-inputLine
        v-if="userInfo && googleStatus === 1"
        maxlength="6"
        name="googleVlaue"
        :promptText="googleVlaueForm.text"
        :errorHave="true"
        :errorText="googleErrorText"
        :errorFlag="googleErrorFlag"
        marginTop="0px"
        :value="googleVlaue"
        @onchanges="inputChanges"
      />
      <!-- 短信验证框 -->
      <c-inputLine
        v-if="userInfo && isOpenMobileCheck === 1"
        maxlength="6"
        name="checkValue"
        :promptText="checkPhione.text"
        :errorHave="true"
        :errorText="checkErrorText"
        :errorFlag="checkErrorFlag"
        marginTop="0px"
        :value="checkValue"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          v-if="checkPhione.haveCode"
          name="loginGetcode"
          @click="getCodeClick"
          buttonName="loginGetcodeBtn"
        />
      </c-inputLine>
      <!-- 邮箱验证框 -->
      <c-inputLine
        v-if="
          userInfo &&
            emailAuthOpen &&
            isOpenMobileCheck !== 1 &&
            pageData.email_validate_open
        "
        maxlength="6"
        name="emailCheckValue"
        :promptText="emailVlaueForm.text"
        :errorHave="true"
        :errorText="checkErrorText"
        :errorFlag="checkEmailErrorFlag"
        marginTop="0px"
        :value="emailCheckValue"
        @onchanges="inputChanges"
      >
        <!-- 获取验证码 -->
        <c-getCode
          v-if="emailVlaueForm.haveCode"
          name="EmailCode"
          @click="postEmailCode"
          buttonName="loginGetcodeBtn"
        />
      </c-inputLine>
    </c-dialog>
     <!-- 温馨提示 -->

    <c-alert :showFlag="alertFlag"
      @close="alertClone"
      imageType= "1"
      :imgMap="imgMap"
      :colorMap="colorMap"
      :buttonText="$t('ipfs.goRecharge')"
      @confirm="confirmFun">
      <div class="alertTitle b-1-cl">
        <!-- 温馨提示 -->
        {{$t('lever.alertTitle')}}
      </div>
      <div class="alertText">
        {{ pageData.coinSymbol | getCoinShowName(coinList) }}
        <!-- 资金账户余额不足，请充值足够的金额后继续下单 -->
        {{$t('ipfs.FundsNot')}}
      </div>
    </c-alert>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/ipfs/view/view';
import 'BlockChain-ui/PC/common-mixin/ipfs/view/view.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
