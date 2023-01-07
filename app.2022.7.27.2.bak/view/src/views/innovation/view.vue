<template>
  <div class="innovation-view fuz-page-content">
    <!-- <c-pageBanner
      :title="bannerTitle"
      :backgroungImgUrl="bannerImg"
      :imgMap="imgMap"
    /> -->
    <div class="innovation-content">
      <div class="base-info fuz-card-plain">
        <h3 class="title" v-if="publicInfo.msg.companyId.toString() !== '1654'">
          <!-- 已募集 & 状态 -->
          <div class="f-1-cl">{{$t('innov.raised')}}：
            <b class="u-8-cl">
              {{ fixDFun(pageData.raisedMoney, pageData.coinSymbol) }}
            </b>
            {{ pageData.coinSymbol | getCoinShowName(coinList) }}
          </div>
          <span class="b-2-cl">{{ setStatusText(pageData) }}</span>
        </h3>
        <div class="bf" v-if="!isHideBar && publicInfo.msg.companyId.toString() !== '1654'">
          <p>
            <span>
              <!-- 当前人数 -->
              {{ $t("innov.supportNum") }}
            </span>
            <span class="f-r">
              <!-- 进度 -->
              {{ $t("innov.current") }}
            </span>
          </p>
          <div class="jdt c-5-bg">
            <div
              class="jdt-bar c-8-bg"
              :style="{ width: countScale(pageData.speed, 100) + '%' }"
            ></div>
          </div>
          <p class="f-1-cl">
            <span>{{pageData.supportPerson}}</span>
            <span class="f-r">
              {{ speed }}%
            </span>
          </p>
        </div>
        <div class="timeInterval">
          <div class="timer-title b-1-cl">
            {{timerTitle}}
          </div>
          <ul>
            <li class="c-5-bg">
              <div class="b-1-cl">{{lostTime.days}}</div>
              <span>{{$t('innov.day')}}</span>
            </li>
            <li class="c-5-bg">
              <div class="b-1-cl">{{lostTime.hours}}</div>
              <span>{{$t('innov.hours')}}</span>
            </li>
            <li class="c-5-bg">
              <div class="b-1-cl">{{lostTime.minutes}}</div>
              <span>{{$t('innov.minutes')}}</span>
            </li>
            <li class="c-5-bg">
              <div class="b-1-cl">{{lostTime.seconds}}</div>
              <span>{{$t('innov.seconds')}}</span>
            </li>
          </ul>
        </div>
        <div class="infor-list">
          <p class="key">
            <!-- 募集金额 -->
            {{ this.titleText[3] }}
          </p>
          <p class="val f-1-cl">
            {{ fixDFun(pageData.money, pageData.coinSymbol) }}
          </p>
          <p class="key">
            <!-- 初始价格 -->
            {{ this.titleText[4] }}
          </p>
          <p class="val f-1-cl" v-if="pageData.orderType === 1">
              1
              {{ pageData.grantSymbol | getCoinShowName(coinList) }}
              =
              {{ fixDFun(pageData.initPriceV2, pageData.coinSymbol) }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
          </p>
          <p class="val f-1-cl" v-else>
              1 {{ pageData.coinSymbol | getCoinShowName(coinList) }}
              =
              {{ fixDFun(pageData.initPrice, pageData.grantSymbol) }}
              {{ pageData.grantSymbol | getCoinShowName(coinList) }}
          </p>
          <!-- 个人限购次数 -->
          <p class="key">
            <!-- 个人限购次数 -->
            {{ this.titleText[5] }}
          </p>
          <p class="val f-1-cl" v-if="pageData.singleMaxCount === 0">
            <!-- 不限制 -->
            {{ $t("innov.notLimit") }}
          </p>
          <p class="val f-1-cl" v-else>{{ pageData.singleMaxCount }}</p>
          <!-- 个人限购数量 -->
          <p class="key">
            <!-- 个人限购数量 -->
            {{ this.titleText[6] }}
          </p>
          <p class="key" v-if='pageData.holdType === 1'>
              <!-- 持仓时间点 -->
              {{ formatTimeFn(pageData.stime) }}
              {{ $t("innov.timeHold") }}
              {{ pageData.holdCoin | getCoinShowName(coinList) }}
              {{
                pageData.otherType !== 0
                ? (pageData.otherType === 1 ? '、' : $t("innov.or"))
                : ''
              }}
              {{
                pageData.otherType !== 0
                ? pageData.holdCoinOther
                : ''
                | getCoinShowName(coinList)
              }}
              {{ $t("innov.canParticipateExchange") }}
            </p>
          <p class="val f-1-cl" v-if="!pageData.holdCoin">
            {{ pageData.singleMinRaiseMoney }} -
            {{ pageData.singleMaxRaiseMoney }}
            {{ pageData.coinSymbol | getCoinShowName(coinList) }}
          </p>
          <template v-else-if="pageData.holdCoin && !pageData.otherType">
            <p class="val f-1-cl" v-for="(item, index) in pageData.holdLevelList" :key="index">
              {{ $t("innov.holdPositions") }}
              {{ pageData.holdCoin | getCoinShowName(coinList) }} ≥
              {{ thousandsComma(item.holdCoinAmount) }} :
              {{ $t("innov.purchaseLimitation") }}
              {{ thousandsComma(item.levelAmount) }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
            </p>
          </template>
          <template v-else>
            <p class="val f-1-cl" v-for="(item, index) in pageData.holdLevelList" :key="index">
              {{
                pageData.holdType === 2
                ? $t("innov.averageHoldPositions")
                : $t("innov.holdPositions")
              }}
              {{ pageData.holdCoin | getCoinShowName(coinList) }} ≥
              {{ thousandsComma(item.holdCoinAmount) }}
              {{ pageData.otherType === 1 ? $t("innov.and") : $t("innov.or") }}<br/>
              {{
                pageData.holdType === 2
                ? $t("innov.averageHoldPositions")
                : $t("innov.holdPositions")
              }}
              {{ pageData.holdCoinOther | getCoinShowName(coinList) }} ≥
              {{ thousandsComma(item.otherHoldCoinAmount) }} :
              {{ $t("innov.purchaseLimitation") }}
              {{ thousandsComma(item.levelAmount) }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
            </p>
          </template>
          <p class="key">
            <!-- 开始时间 -->
            {{ this.titleText[7] }}
          </p>
          <p class="val f-1-cl">{{ formatTimeFn(pageData.startTime) }}</p>
          <p class="key">
            <!-- 结束时间 -->
            {{ this.titleText[8] }}
          </p>
          <p class="val f-1-cl">{{ formatTimeFn(pageData.endTime) }}</p>
          <c-inputLine
            name="amount"
            :promptText="promptText"
            :errorHave="errorHave"
            errorText
            :errorFlag="errorFlag"
            marginTop="0px"
            :disabled="amountDisabled"
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
            <!-- 购买金额 -->
              {{ $t("innov.PurchaseAmount") }}：
              {{ amountTotal }}
              {{ pageData.coinSymbol | getCoinShowName(coinList) }}
          </p>
          <p class="vol">
            <!-- 可用余额： -->
            {{ $t('innov.kybalance')}}:
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
          <c-button
            type="solid"
            v-if="isLogin"
            :disabled="submitDisabled"
            height="40px"
            width="100%"
            paddingW="0px"
            @click="submit">
              <!-- 立即兑换 -->
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
          <p class="tt">
            {{ $t("innov.Only") }} {{ pageData.holdAmount }}
            {{ pageData.holdSymbol | getCoinShowName(coinList) }}
            <a @click="goTrade()" href="javascript:;">{{ $t("innov.Hold") }}</a>
          </p>
          <p
            v-if="userInfo.authLevel !== 1 && pageData.isAuthRealname"
            class="tt">
            <!-- 该项目需实名认证方可申购 -->
            {{ $t("innov.requires") }}
            <router-link class="f-1-cl" to="/personal/userManagement">
              <!-- 立即认证 -->
              {{ $t("innov.Authenticate") }}
            </router-link>
          </p>
          <div
            class="spend-regon"
            :class="spendWarning ? 'f-7-cl' : ''"
            v-if="
              is_newcoin_project_entrance &&
                ((userInfo.authLevel === 1 && pageData.isAuthRealname) ||
                  !pageData.isAuthRealname) &&
                Number(pageData.entranceAmount) > 0">
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
      <div class="main-content fuz-card-plain">
        <div class="content-top fuz-border">
          <div class="img">
            <img :src="pageData.logo" alt />
          </div>
          <div class="info">
            <h2 class="tit f-1-cl">
              【{{ pageData.grantSymbol | getCoinShowName(coinList) }}】{{ pageData.name }}
            </h2>
            <div class="share"></div>
            <div class="info-text">
              <!-- {{pageData.projectIntro}} -->
            </div>
          </div>
        </div>
        <div class="main-text" v-html="pageData.details"></div>
      </div>

      <p style="clear: both"></p>
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
          :voiceOpen ="voiceSmsOpen"
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
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/innovation/view/view';
import 'BlockChain-ui/PC/common-mixin/innovation/view/view.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.innovation-content{
  width: 1280px !important;
}
.main-content {
  width: 900px;
}
</style>
