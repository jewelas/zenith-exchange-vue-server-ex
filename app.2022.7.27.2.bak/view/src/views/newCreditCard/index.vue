<template>
  <section class="v5-page-creditCard fuz-card">
    <!-- 信用卡购买 -->
    <div class="creditCard-form">
      <header class="creditCard-header v5-5-cl fuz-border">
        <svg class="icon icon-20" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-v5_36"></use>
        </svg>
        <span>{{ $t('creditCard.title') }}</span>
      </header>
      <div class="page-creditCard-content">
        <div class="creditCard-imgs">
          <svg class="icon icon-54" aria-hidden="true">
            <use xlink:href="#icon-assets_18"></use>
          </svg>
          <svg class="icon icon-54" aria-hidden="true">
            <use xlink:href="#icon-assets_19"></use>
          </svg>
          <svg class="icon icon-54" aria-hidden="true">
            <use xlink:href="#icon-assets_20"></use>
          </svg>
        </div>
        <!-- 主体 -->
        <div class="creditCard-main">
          <!-- 购买数量 -->
          <div class="creditCard-main-item">
              <c-v5-input
                name="tokenInput"
                width="378px"
                :promptText="$t('creditCard.amount')"
                promptClass="v5-6-cl"
                :value="tokenInput"
                @onChanges="inputChanges">
                <div slot="append" class="input-append amount">
                  <c-v5-select
                    class="transparent"
                    type="fill"
                    width="140px"
                    height="38px"
                    inputHeight="38px"
                    selectedClass="v5-6-cl"
                    :showPrompt="false"
                    :options="tokenList"
                    :value="activeToken"
                    @onChanges="tokenChange"
                  />
                </div>
              </c-v5-input>
          </div>
          <!-- 购买金额 -->
          <div class="creditCard-main-item">
            <c-v5-input
              name="fiatInput"
              width="378px"
              :promptText="$t('creditCard.num')"
              promptClass="v5-6-cl"
              :errorFlag="inputError.show"
              :errorText="inputError.text"
              :value="fiatInput"
              :errorHave="true"
              @onChanges="inputChanges"
            >
              <div slot="append" class="input-append amount">
                <c-v5-select
                  class="transparent"
                  type="fill"
                  width="140px"
                  height="38px"
                  inputHeight="38px"
                  selectedClass="v5-6-cl"
                  :showPrompt="false"
                  :options="fiatList"
                  :value="activeFiat"
                  :errorHave="true"
                  @onChanges="fiatChange"
                />
              </div>
            </c-v5-input>
          </div>
          <div class="submit-button">
            <!-- 立即购买 -->
            <c-v5-button
              type="solid"
              height="40px"
              width="378px"
              class="fuz-primary-btn"
              :disabled="buttonDisable"
              v-if="loginFlag"
              @click="submit">
              {{$t('creditCard.buy')}}
            </c-v5-button>
            <!-- 登录 -->
            <c-v5-button
              v-else
              type="solid"
              height="40px"
              width="378px"
              class="fuz-primary-btn"
              @click="goLogin">
              {{$t('trade.loginReg')}}
            </c-v5-button>
          </div>
          <div class="powered">
            <span class="powered-tit">Powered by</span>
            <img class="powered-img" :src="imgMap.moonpay" alt="">
            <div
              class="creditCard-page-icon"
              @mouseover="iconHover = true"
              @mouseout="iconHover = false">
              <svg v-if="!iconHover" class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_6"></use>
              </svg>
              <svg v-else class="icon icon-14" aria-hidden="true">
                <use xlink:href="#icon-assets_6_h"></use>
              </svg>
              <c-popover
                :show="iconHover"
                id="creditCard-popover"
                position="bottom"
                :content="$t('creditCard.mark')"
                parent=".creditCard-page-icon">
              </c-popover>
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
    </div>
    <!-- 确认付款弹窗 -->
    <!-- 标题： 前往 MoonPay 支付 -->
    <!-- 确定： 即将跳转至MoonPay -->
    <c-v5-dialog :showFlag="confirmFlag"
      :confirmText="$t('creditCard.confirmTit')"
      :confirmDisabled="dialogConfirmDisabled"
      :confirmLoading="dialogConfirmLoading"
      @confirm="confirmSubmit"
      @close="confirmClose"
      :titleText="$t('creditCard.confirmBtn')">
      <div class="creditCard-confirm">
        <!-- MoonPay会在您付款成功后的2~10分钟之内，将您购买的数字货币充值到您的币币账户充值地址中。 -->
        <div class="creditCard-confirm-mess v5-5-cl">
          {{$t('creditCard.confirmText1')}}
        </div>
        <div class="creditCard-confirm-options clearfix">
          <c-checkBox :value="redioFlag" fontClass="icon-14" @click="setRedio"/>
          <!-- 您已知晓 MoonPay 是由第三方独立运营的法定货币与数字
          货币交易平台，本交易所不对因使用该服务遭受的任何损失或损害承担任何责任。 -->
          <div class="creditCard-confirm-text"
          >{{$t('creditCard.confirmText2')}}</div>
        </div>
      </div>
    </c-v5-dialog>
    <!-- 回调弹窗 -->
    <!-- 标题： MoonPay支付反馈 -->
    <!-- 确定： 去交易 -->
    <!-- 取消： 查看资产 -->
    <c-v5-dialog :showFlag="callBackFlag"
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
    </c-v5-dialog>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newCreditCard/index';
import 'BlockChain-ui/PC/common-mixin/newCreditCard/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};

</script>
<style scoped>
</style>
