<template>
  <section class="page-paxful fuz-card">
    <div class="otc-page-title">
      <div class="page-title-bar b-1-cl">
          <!-- 信用卡购买 -->
          {{ $t('paxful.title') }}
      </div>
    </div>
    <div class="page-paxful-coneent">
      <!-- <vue-scroll> -->
        <div class="page-paxful-bar">
          <!-- 信用卡购买 -->
          <div class="paxful-symbolNav  fuz-card-title">
            {{ $t('paxful.title') }}
            <div class="paxful-imgs fuz-content-small">{{$t('paxful.tip')}}</div>
          </div>
          <!-- 主体 -->
          <div class="paxful-main">
            <!-- 购买数量 -->
            <div class="paxful-main-even">
              <div class="paxful-main-input">
                <c-inputLine
                  name="tokenInput"
                  marginTop="0px"
                  :value="$t('paxful.symbol')"
                  :errorHave="true"
                  @onchanges="inputChanges"
                  :disabled="true"
                >
                  <div class="paxful-main-inputLine a-3-bg"></div>
                </c-inputLine>
              </div>
              <div class="paxful-main-select">
                <div class="b-1-cl symbol a-2-bd">BTC</div>
                <!-- <c-select
                  :options="tokenList"
                  :value="activeToken"
                  :errorHave="true"
                  @onChanges="tokenChange"
                /> -->
              </div>
            </div>
            <!-- 购买金额 -->
            <div class="paxful-main-even">
              <div class="paxful-main-input">
                <c-inputLine
                  name="fiatInput"
                  :promptText="$t('paxful.num')"
                  marginTop="0px"
                  :value="fiatInput"
                  :errorHave="true"
                  @onchanges="inputChanges"
                >
                  <div class="paxful-main-inputLine a-3-bg"></div>
                </c-inputLine>
              </div>
              <div class="paxful-main-select">
                <c-select
                  :options="fiatList"
                  :value="activeFiat"
                  :errorHave="true"
                  @onChanges="fiatChange"
                />
              </div>
            </div>
            <!-- 立即购买 -->
            <c-button type="solid"
              marginTop="20px"
              height="40px"
              width="380px"
              :disabled="buttonDisable"
              paddingW="0px"
              class="fuz-primary-btn"
              v-if="loginFlag"
              @click="submit">
              {{$t('paxful.buy')}}
            </c-button>
            <!-- 登录 -->
            <c-button
              v-else
              type="solid"
              marginTop="20px"
              height="40px"
              width="380px"
              paddingW="0px"
              class="fuz-primary-btn"
              @click="goLogin">
              {{$t('trade.loginReg')}}
            </c-button>
            <div class="powered">
              <span class="powered-tit">Powered by</span>
              <img class="powered-img" src="https://saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20211027184746666.png" alt="">
              <div class="paxful-page-icon">
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-a_15"></use>
                </svg>
                <ul class="paxful-page-market a-4-bg">
                  <li>
                    <!-- MoonPay让每个人都可以更轻松，更快速，
                    更安全地购买数字货币。它接受所有主流的借记卡/信用卡
                    ，和包括Apple Pay在内的新的移动支付方式。 -->
                    {{$t('paxful.mark')}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="paxful-warn">
              <!-- 请注意 -->
              <div class="paxful-warn-even">{{$t('paxful.warnTit')}}:</div>
              <!-- 1.数字货币价格是根据当前报价并非最终成交价, 如果价格变化超过
                 +/-2.5%你将收到来自MoonPay的重新交易确认。 -->
              <div class="paxful-warn-even">
                {{$t('paxful.warn1')}}</div>
              <!-- 2. 完成购买后，您的${订单状态}$可以在MoonPay查看，您的${充值记录}$可以在交易所查看。 -->
              <div class="paxful-warn-even" v-html="warn2Text"></div>
              <!-- 3.如果你有任何问题，请联系MoonPay的客服服务(support@moonpay.io)。 -->
              <div class="paxful-warn-even">
                {{$t('paxful.warn3')}}
              </div>
            </div>
          </div>
        </div>
      <!-- </vue-scroll> -->
    </div>
    <!-- 确认付款弹窗 -->
    <!-- 标题： 前往 MoonPay 支付 -->
    <!-- 确定： 即将跳转至MoonPay -->
    <c-dialog :showFlag="confirmFlag"
      paddingBottom="14px"
      :confirmText="$t('paxful.confirmTit')"
      :confirmDisabled="dialogConfirmDisabled"
      :confirmLoading="dialogConfirmLoading"
      @confirm="confirmSubmit"
      @close="confirmClose"
      :titleText="$t('paxful.confirmBtn')">
      <div class="paxful-confirm">
        <!-- MoonPay会在您付款成功后的2~10分钟之内，将您购买的数字货币充值到您的币币账户充值地址中。 -->
        <div class="paxful-confirm-mess b-1-cl">
          {{$t('paxful.confirmText1')}}
        </div>
        <div class="paxful-confirm-options clearfix">
          <c-checkBox :value="redioFlag" @click="setRedio"/>
          <!-- 您已知晓 MoonPay 是由第三方独立运营的法定货币与数字
          货币交易平台，本交易所不对因使用该服务遭受的任何损失或损害承担任何责任。 -->
          <div class="paxful-confirm-text"
          >{{$t('paxful.confirmText2')}}</div>
        </div>
      </div>
    </c-dialog>
    <c-alert
      :showFlag="emailAuth"
      :imgMap="imgMap"
      imageType="1"
      :buttonText="$t('personal.bindEmail.title')"
      @confirm="gotoAuth"
      @close="cancelAuth">
      <div>
        {{$t('paxful.emailTip')}}
      </div>
    </c-alert>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/paxful/index';
import 'BlockChain-ui/PC/common-mixin/paxful/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
<style scoped>
.paxful-main-select .symbol {
  border:none;
}
.paxful-imgs {
  margin-right: 0 !important;
}
.paxful-main-even {
  gap: 10px;
}
.paxful-main-inputLine {
  display: none;
}
</style>
