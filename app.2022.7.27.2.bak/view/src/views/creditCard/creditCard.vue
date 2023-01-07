<template>
  <section class="page-creditCard a-5-bg">
    <div class="otc-page-title a-5-bg a-7-bd">
      <div class="page-title-bar b-1-cl">
          <!-- 信用卡购买 -->
          {{ $t('creditCard.title') }}
      </div>
    </div>
    <div class="page-creditCard-coneent">
      <!-- <vue-scroll> -->
        <div class="page-creditCard-bar">
          <!-- 信用卡购买 -->
          <div class="creditCard-symbolNav a-3-bd b-1-cl">
            {{ $t('creditCard.title') }}
            <div class="creditCard-imgs">
              <img src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200429141529768.svg">
              <img src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200429142925574.svg">
              <img src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200429142747706.svg">
            </div>
          </div>
          <!-- 主体 -->
          <div class="creditCard-main">
            <!-- 购买数量 -->
            <div class="creditCard-main-even">
              <div class="creditCard-main-input">
                <c-inputLine
                  name="tokenInput"
                  :promptText="$t('creditCard.amount')"
                  marginTop="0px"
                  :value="tokenInput"
                  :errorHave="true"
                   @onchanges="inputChanges"
                >
                  <div class="creditCard-main-inputLine a-3-bg"></div>
                </c-inputLine>
              </div>
              <div class="creditCard-main-select">
                <c-select
                  :options="tokenList"
                  :value="activeToken"
                  :errorHave="true"
                  @onChanges="tokenChange"
                />
              </div>
            </div>
            <!-- 购买金额 -->
            <div class="creditCard-main-even">
              <div class="creditCard-main-input">
                <c-inputLine
                  name="fiatInput"
                  :promptText="$t('creditCard.num')"
                  marginTop="0px"
                  :errorFlag="inputError.show"
                  :errorText="inputError.text"
                  :value="fiatInput"
                  :errorHave="true"
                  @onchanges="inputChanges"
                >
                  <div class="creditCard-main-inputLine a-3-bg"></div>
                </c-inputLine>
              </div>
              <div class="creditCard-main-select">
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
              class="fuz-primary-btn"
              :disabled="buttonDisable"
              paddingW="0px"
              v-if="loginFlag"
              @click="submit">
              {{$t('creditCard.buy')}}
            </c-button>
            <!-- 登录 -->
            <c-button
              v-else
              type="solid"
              marginTop="20px"
              height="40px"
              width="380px"
              class="fuz-primary-btn"
              paddingW="0px"
              @click="goLogin">
              {{$t('trade.loginReg')}}
            </c-button>
            <div class="powered">
              <span class="powered-tit">Powered by</span>
              <img class="powered-img" src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200429142935518.png" alt="">
              <div class="creditCard-page-icon">
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-a_15"></use>
                </svg>
                <ul class="creditCard-page-market a-4-bg">
                  <li>
                    <!-- MoonPay让每个人都可以更轻松，更快速，
                    更安全地购买数字货币。它接受所有主流的借记卡/信用卡
                    ，和包括Apple Pay在内的新的移动支付方式。 -->
                    {{$t('creditCard.mark')}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="creditCard-warn">
              <!-- 请注意 -->
              <div class="creditCard-warn-even">{{$t('creditCard.warnTit')}}:</div>
              <!-- 1.数字货币价格是根据当前报价并非最终成交价, 如果价格变化超过
                 +/-2.5%你将收到来自MoonPay的重新交易确认。 -->
              <div class="creditCard-warn-even">
                {{$t('creditCard.warn1')}}</div>
              <!-- 2. 完成购买后，您的${订单状态}$可以在MoonPay查看，您的${充值记录}$可以在交易所查看。 -->
              <div class="creditCard-warn-even" v-html="warn2Text"></div>
              <!-- 3.如果你有任何问题，请联系MoonPay的客服服务(support@moonpay.io)。 -->
              <div class="creditCard-warn-even">
                {{$t('creditCard.warn3')}}
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
      :confirmText="$t('creditCard.confirmTit')"
      :confirmDisabled="dialogConfirmDisabled"
      :confirmLoading="dialogConfirmLoading"
      @confirm="confirmSubmit"
      @close="confirmClose"
      :titleText="$t('creditCard.confirmBtn')">
      <div class="creditCard-confirm">
        <!-- MoonPay会在您付款成功后的2~10分钟之内，将您购买的数字货币充值到您的币币账户充值地址中。 -->
        <div class="creditCard-confirm-mess b-1-cl">
          {{$t('creditCard.confirmText1')}}
        </div>
        <div class="creditCard-confirm-options clearfix">
          <c-checkBox :value="redioFlag" @click="setRedio"/>
          <!-- 您已知晓 MoonPay 是由第三方独立运营的法定货币与数字
          货币交易平台，本交易所不对因使用该服务遭受的任何损失或损害承担任何责任。 -->
          <div class="creditCard-confirm-text"
          >{{$t('creditCard.confirmText2')}}</div>
        </div>
      </div>
    </c-dialog>
    <!-- 回调弹窗 -->
    <!-- 标题： MoonPay支付反馈 -->
    <!-- 确定： 去交易 -->
    <!-- 取消： 查看资产 -->
    <c-dialog :showFlag="callBackFlag"
      paddingBottom="14px"
      :confirmText="$t('creditCard.callBackFalse')"
      @confirm="callBackSubmit"
      @close="callBackClose"
      :titleText="$t('creditCard.callBackTit')">
      <ul class="creditCard-callBack">
        <!-- "1. 当付款完成，您会收到来自MoonPay的邮件。你可以在MoonPay${查询付款状态$}" -->
        <li v-html="callBackText1"></li>
        <!-- 2. 付款完成后，MoonPay将通过充值的方式充值至您的币币账户。 -->
        <li>{{$t('creditCard.callBackText2')}}</li>
        <!-- 3. 如果你有任何问题，请联系MoonPay的客服服务(support@moonpay.io)。 -->
        <li>{{$t('creditCard.callBackText3')}}</li>
      </ul>
    </c-dialog>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/creditCard/creditCard';
import 'BlockChain-ui/PC/common-mixin/creditCard/creditCard.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
<style scoped>
.creditCard-main >>> .v5-input-content {
  z-index: 99;
}
</style>
