<template>
  <section class="page-otcDetailOrder " ref="content">
    <vue-scroll>
      <div class="page-otcDetailOrder-bar a-5-bg">
        <Title :isReady="isReady" :commonData="commonData" @getData="getData" ref="title"/>
        <Message
          :isReady="isReady"
          @update:identificationShow="identificationShow = true"
          :commonData="commonData"/>
        <div class="otcDetailOrder-options">
          <Pays :isReady="isReady"
                :commonData="commonData"
                :payObj="payObj"
                @setPayObj="setPayObj"/>
          <div class="otcDetailOrder-buttons" v-if="orderIsReady">
            <!-- 买1 -->
            <div v-if="status === '1' && commonData.side === 'BUY'">
              <!-- 去支付 -->
              <c-button paddingW="40px"
                :disabled="goPayDisabled"
                @click="goPayClick">{{ $t('otcDetailOrder.goPay') }}</c-button>
              <!-- 取消订单 -->
              <c-button paddingW="40px" type="text" height="40px"
                class="textButtonClass" @click="cancelOrderClick">
                {{ $t('otcDetailOrder.CancellationOrder') }}
                </c-button>
            </div>
            <!-- 卖1 -->
            <div v-if="status === '1' && commonData.side === 'SELL'">
              <!-- 等待对方支付 -->
              <c-button paddingW="40px" :disabled="true">
                {{ $t('otcDetailOrder.WaitingPayment') }}
              </c-button>
            </div>
            <!-- 买2/卖2 -->
            <div v-if="status === '2'">
              <!-- 对方正在放币 -->
              <c-button paddingW="40px"
                :disabled="true"
                v-if="commonData.side === 'BUY'">
                {{ $t('otcDetailOrder.WaitingPuttingMoney') }}
              </c-button>
              <!-- 确认收款并放币 -->
              <c-button paddingW="40px"
                @click="releaseClick"
                v-if="commonData.side === 'SELL'">
                {{ $t('otcDetailOrder.ConfirmReleaseMoney') }}
              </c-button>
              <!-- 提交申诉 -->
              <c-button paddingW="40px" type="text" height="40px"
                class="textButtonClass"
                @click="appealClick">
                {{ $t('otcDetailOrder.SubmitAcomplaint') }}
              </c-button>
            </div>
            <!-- 买3/卖3 买8/卖8 -->
            <div v-if="status === '3' || status === '8'">
              <!-- 返回场外大厅 -->
              <c-button paddingW="40px" @click="goHall">
                {{ $t('otcDetailOrder.goHall') }}
              </c-button>
            </div>
            <!-- 买4/卖4 -->
            <div v-if="status === '4' || status === '9'">
              <!-- 订单已关闭 -->
              <c-button paddingW="40px" :disabled="true">
                {{ $t('otcDetailOrder.OrderClosed') }}
              </c-button>
            </div>
            <!-- 买5/卖5 -->
            <div v-if="status === '5'">
              <!-- 订单申诉中 -->
              <c-button paddingW="40px" :disabled="true">
                {{ $t('otcDetailOrder.OrdersAppeal') }}
              </c-button>
              <!-- 取消申诉 -->
              <c-button paddingW="40px" type="text" height="40px"
                v-if="axiosData.isComplainUser.toString() === '1'"
                class="textButtonClass"
                @click="cancelAppealClick">
                {{ $t('otcDetailOrder.CancellationComplaint') }}
              </c-button>
            </div>
            <!-- 买7/卖7 -->
            <div v-if="status === '7'">
              <!-- 订单异常 -->
              <c-button paddingW="40px" :disabled="true">
                {{ $t('otcDetailOrder.OrderException') }}
              </c-button>
            </div>
          </div>
          <c-otcReminder/>
        </div>
        <!-- 聊天 -->
        <chatVue :chatTop="chatTop" :isReady="isReady" :commonData="commonData"/>
        <c-alert :showFlag="false"  :imgMap="imgMap"/>
        <div class="maxEvmAll u-7-bg" v-if="maxEvmFlag" @click="maxEvm(false)"></div>
        <div class="maxEvm h-2-bg" v-if="maxEvmFlag" @click="maxEvm(false)">
          <img :src="payObj.qrcodeImg">
        </div>
        <!-- 确认付款弹窗 -->
        <c-dialog :showFlag="goPayFlag"
          :titleText="$t('otcDetailOrder.ConfirmPayment')"
          :confirmText="$t('otcDetailOrder.MarkedAsPaid')"
          :closeText="$t('otcDetailOrder.NotYetPaid')"
          @close="goPayClose"
          @confirm="gopayConfirm"
          :confirmLoading="gopayConfirmLoading"
          paddingTop="20px">
          <div class="goPayDialog">
            <p class="text">
              <svg class="icon icon-16" aria-hidden="true">
                <use xlink:href="#icon-c_2"></use>
              </svg>&nbsp;
              <!-- 本平台不支持自动扣款，请您本人向以上账号自行转账 -->
              <span class="b-7-cl">{{ $t('otcDetailOrder.payWarning') }}</span>
            </p>
            <div class="payInfo">
              <div>
                {{ $t('otcDetailOrder.PaymentAmount') }}
              </div>
              <div class="payInfo-price b-1-cl">
                <span class="price-text">{{goPayText.totalPrice}} </span>
                <span class="price-coin">{{goPayText.paycoin}}</span>
              </div>
              <div class="paayInfo-orderId">
                <span>{{ $t('otcDetailOrder.PaymentReference') }}: </span>
                <span>{{ goPayText.id }}</span>
              </div>
            </div>
            <div class="b-1-cl">{{ $t('otcDetailOrder.Otherparty') }}
                  {{ payObj.name }}</div>
            <ul class="list">
              <!-- 对方支付方式 -->
              <li
                class="a-4-bg"
                v-for="(item, index) in payObj.paymentFieldList"
                :class="{'hide': Number(item.fieldType) === 3}"
                :key="index">
                <div v-if="Number(item.fieldType) !== 3" class="b-2-cl">{{item.fieldTitle}}</div>
                <div v-if="Number(item.fieldType) !== 3" class="value b-1-cl haveEvm">
                  <span>{{item.fieldValue}}</span>
                  <div class="copy">
                    <c-button
                      type="text"
                      @click="copy(item.fieldValue)">{{$t('otcDetailOrder.copy')}}</c-button>
                  </div>
                </div>
                <div
                  v-else
                  class="payEvm"
                  @click="maxEvm(true)"
                  :style="{backgroundImage: `url(${item.fieldValue})`}">
                </div>
              </li>
            </ul>
          </div>
        </c-dialog>
        <!-- 确认收款并放币 弹窗 -->
        <c-dialog :showFlag="releaseFlag"
          :titleText="$t('otcDetailOrder.ConfirmReleaseMoney')"
          paddingTop="20px"
          @confirm="releaseConfirm"
          @close="releaseClose"
          :confirmDisabled="releaseConfirmDisbale"
          :confirmLoading="releaseConfirmLoading">
          <div class="releaseDialog">
            <p class="text">
              <svg class="icon icon-16" aria-hidden="true">
                <use xlink:href="#icon-c_2"></use>
              </svg>&nbsp;
              <!-- 请务必登录账号确认收到该笔款项 -->
              <span class="b-7-cl">{{ $t('otcDetailOrder.ConfirmReleaseMoneyWarning') }}</span>
            </p>
            <!-- 资金密码 -->
            <c-inputLine :promptText="$t('otcDetailOrder.pass')"
              inputType="password"
              name="passValue"
              :value="passValue"
              marginTop="10px"
              :errorHave="true"
              :errorFlag="passErrorFlag"
              :errorText="$t('otcDetailOrder.passError')"
              @onchanges="inputLineChange"/>
            <div class="passValueText">
              <c-checkBox :value="passCheck" @click="passCheckClick"/>&nbsp;
              <!-- 我确认已登录收款账户，并核对收款无误 -->
              <span class="passValueText-text" @click="passCheckClick">
                {{ $t('otcDetailOrder.ConfirmReleaseMoneyConfrim') }}</span>
            </div>
          </div>
        </c-dialog>
        <!-- 取消订单 弹窗 -->
        <c-dialog :showFlag="cancelOrderFlag"
          :titleText="$t('otcDetailOrder.CancellationOrderTitle')"
          paddingTop="20px"
          @close="cancelOrderClose"
          @confirm="cancelOrderConfirm"
          :confirmLoading="cancelOrderLoading"
          :confirmDisabled="cancelOrderConfirmDisabled">
          <div class="cancelOrderDialog">
            <ul>
              <!-- 取消订单后不会退款，如您已付款，请勿取消订单。 -->
              <li>{{ $t('otcDetailOrder.CancellationOrderWarning1') }}</li>
              <!-- 取消规则：买方访日累计取消3笔订单，将会限制当日买入功能 -->
              <li>{{ $t('otcDetailOrder.CancellationOrderWarning2') }}</li>
            </ul>
            <div class="cancelOrderDialog-check">
              <!-- 我确定还没付款给对方 -->
              <c-checkBox :value="cancelOrderCheck" @click="cancelOrderCheckClick"/>&nbsp;
              <span class="cancelOrderDialog-check-text" @click="cancelOrderCheckClick">
                {{ $t('otcDetailOrder.CancellationOrderConfrim') }}</span></div>
          </div>
        </c-dialog>
        <!-- 申诉 弹窗 -->
        <c-dialog :showFlag="appealFlag"
          :titleText="$t('otcDetailOrder.AppealTitle')"
          paddingTop="20px"
          @close="appealClose"
          @confirm="appealConfirm"
          :confirmLoading="appealLoading"
          :confirmDisabled="appealConfirmDisabled">
          <div class="appealDialog">
            <p class="text">
              <svg class="icon icon-16" aria-hidden="true">
                <use xlink:href="#icon-c_2"></use>
              </svg>&nbsp;
              <!-- 如果订单遇到纠纷，可以通过申诉渠道解决。 -->
              <span class="b-7-cl">{{ $t('otcDetailOrder.AppealWarning') }}</span>
            </p>
            <!-- 申诉理由 -->
            <c-textAreaLine :promptText="$t('otcDetailOrder.ReasonsAppeal')"
              name="appealValue"
              :value="appealValue"
              marginTop="10px"
              @onchanges="inputLineChange"
              maxLength="200"
              :warningText="`${appealValue.length}/200`"
              :errorHave="true"/>
          </div>
        </c-dialog>
        <!-- 取消申诉 弹窗 -->
        <c-dialog :showFlag="cancelAppealFlag"
          :titleText="$t('otcDetailOrder.CancellationComplaintTitle')"
          paddingTop="40px"
          @close="cancelAppealClose"
          @confirm="cancelAppealConfirm"
          :confirmLoading="cancelAppealLoading">
          <div class="cancelAppealDialog">
            <!-- 取消申诉代表您对此订单无争议，您确定取消申诉吗？ -->
            {{ $t('otcDetailOrder.CancellationComplaintConfrim') }}
          </div>
        </c-dialog>
        <c-dialog
          :titleText="$t('otcDetailOrder.connection')"
          :showFlag="identificationShow"
          @close="identificationShow=false"
          @confirm="identificationShow=false"
          class="connection-dialog"
          >
          <ul class="connection-list" v-if="identificationInfo.isTwoMin">
            <li class="connection-li a-4-bg" v-if="identificationInfo.mobileNumber">
              <p class="connection-title b-2-cl">{{$t('otcDetailOrder.phone')}}</p>
              <p class="connection-desc b-1-cl">{{identificationInfo.mobileNumber}}</p>
            </li>
            <li class="connection-li a-4-bg" v-if="identificationInfo.email">
              <p class="connection-title b-2-cl">{{$t('register.email')}}</p>
              <p class="connection-desc b-1-cl">{{identificationInfo.email}}</p>
            </li>
          </ul>
          <p class="towMin" v-else>{{$t('otcDetailOrder.twoMin')}}</p>
        </c-dialog>
      </div>
    </vue-scroll>
    <input type="text" v-model="copyValue" ref="copyInput" class="copyInput">
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/otcDetailOrder/index/index';
import 'BlockChain-ui/PC/common-mixin/otcDetailOrder/index/index.styl';
import Title from './title.vue';
import Message from './message.vue';
import Pays from './pays.vue';
import chatVue from './chat.vue';

export default {
  mixins: [mixin],
  components: {
    Title,
    Message,
    Pays,
    chatVue,
  },
  mounted() {
    this.init();
  },
};
</script>
