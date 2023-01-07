<template>
  <div class="c2cSetting fuz-card with-title" :class="{'light-theme': userSkin === '2'}">
    <div class="fuz-card-tab">
      <c-v5-navTab
        activeClassName="v5-5-cl"
        activeColor="v5-1-bg"
        className="v5-6-cl"
        :currentTab="nowType"
        :navTab="navTab"
        lineHeight="60"
        @currentType="currentType"/>
    </div>
    <div class="user-management-main clearfix">
      <ul class="ul">
        <li class="li clearfix">
          <!--icon占位用-->
          <svg class="li-icon icon icon-24" aria-hidden="true">
            <use xlink:href="#icon-e_7"></use>
          </svg>
          <div class="li-div li-divs v5-12-bd v5-5-cl clearfix">
            <p class="li-title">
              {{ $t("personal.leaglTenderSet.titleList")[0].text }}
            </p>
            <p class="li-text v5-6-cl">
              {{ $t("personal.leaglTenderSet.titleList")[0].label }}
            </p>
            <div class="li-right clearfix">
              <c-v5-button
                type="hollow"
                className="user-button"
                :defaultColorClass="colorList_1[0]"
                :hoverColorClass="colorList_1[1]"
                :activeColorClass="colorList_1[2]"
                paddingW="30px"
                height="36px"
                @click="addPayment"
                >
                <svg class="icon icon-14" aria-hidden="true">
                  <use xlink:href="#icon-assets_10"></use>
                </svg>
                <span>
                  {{ $t("personal.setUp.title2") }}
                </span>
                </c-v5-button
              >
            </div>
          </div>
        </li>
        <li class="li clearfix" v-for="obj in dataList" :key="obj.id">
          <div class="li-div li-div-right v5-12-bd v5-5-cl clearfix">
            <p class="li-title">
              <span class="line" :style="{'background-color': obj.color}"></span>
              <span class="text">{{ obj.title }}</span>
              <span
                class="carp-coin"
                v-if="excheifFlag && obj.payment === 'otc.payment.domestic.bank.transfer'">
                {{ obj.coinName }}
              </span>
            </p>
            <ul class="li-text v5-5-cl">
              <li
                class="li-text_value"
                v-for="(item, index) in obj.paymentFieldList"
                :key="index">
                <div
                  v-if="item.fieldType !== 3"
                  class="text fieldValue-text"
                  :class="'fieldValue' + obj.id + index"
                  @mouseover="handleFiledValueHover(obj.id, index)"
                  @mouseleave="fieldValueHover = null">
                  {{item.fieldValue}}
                  <c-popover
                    v-if="item.fieldValue.toString().length > 20"
                    :show="fieldValueHover === obj.id + '' + index"
                    id="popover"
                    position="bottom"
                    :content="item.fieldValue"
                    :parent="'.fieldValue' + obj.id + index">
                  </c-popover>
                </div>
                <div
                  v-else
                  class="qrcode"
                  @mouseover="qrcodeHover = obj.id + '' + index"
                  @mouseleave="qrcodeHover = null">
                  <svg
                    v-if="qrcodeHover === obj.id + '' + index"
                    class="icon icon-14"
                    aria-hidden="true">
                    <use xlink:href="#icon-assets_11_h"></use>
                  </svg>
                  <svg
                    v-else
                    class="icon icon-14"
                    aria-hidden="true">
                    <use xlink:href="#icon-assets_11"></use>
                  </svg>
                  <transition name="slide-fade">
                    <div
                      v-show="qrcodeHover === obj.id + '' + index"
                      class="qrcode-view box-shadow v5-19-bg">
                      <img :src="item.fieldValue" alt="" />
                    </div>
                  </transition>
                </div>
              </li>
            </ul>
            <div class="li-right-fun clearfix">
              <c-v5-switch
                :value="Boolean(obj.isOpen)"
                @click="switchChange(obj.id, obj.isOpen)"
              />
              <c-v5-button
                className="li-fun clearfix"
                type="text"
                height="20px"
                @click="click(obj, 'delete')">
                {{ $t("personal.tool.delete") }}
              </c-v5-button>
              <c-v5-button
                className="li-fun clearfix"
                type="text"
                height="20px"
                @click="click(obj, 'modify')">
                {{ $t("personal.tool.modify") }}
              </c-v5-button>
            </div>
          </div>
        </li>
        <li class="li clearfix">
          <!--icon占位用-->
          <svg class="li-icon icon icon-24" aria-hidden="true">
            <use xlink:href="#icon-e_8"></use>
          </svg>
          <div class="li-div li-divs v5-12-bd v5-5-cl clearfix">
            <p class="li-title">
              {{ $t("personal.leaglTenderSet.titleList")[1].text }}
            </p>
            <p class="li-text v5-6-cl">
              {{ $t("personal.leaglTenderSet.titleList")[1].label }}
            </p>
            <div class="li-right clearfix">
              <c-v5-button
                v-if="isCapitalPwordSet === 0"
                type="hollow"
                :defaultColorClass="colorList_1[0]"
                :hoverColorClass="colorList_1[1]"
                :activeColorClass="colorList_1[2]"
                className="user-button"
                paddingW="18px"
                height="32px"
                @click="btnLink('modifySettings')"
                >{{ $t("personal.tool.setUp") }}</c-v5-button
              >
              <c-v5-button
                v-else
                className="li-fun v5-1-cl clearfix"
                type="text"
                @click="btnLink('modifySettings')"
              >
                {{ $t("personal.tool.modify") }}
              </c-v5-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 提示框 -->
    <c-alert
      :showFlag="alertFlag"
      :buttonText="this.$t('personal.alert.certif')"
      imageType="1"
      :imgMap="imgMap"
      :colorMap="colorMap"
      @close="alertClose"
      @confirm="alertGo"
    >
      <div class="alertTitle v5-5-cl">
        {{ fiatTradeOpen
          ? $t("assets.b2c.otcShow.fiatTitle")
          : $t("personal.alert.fiatTitle") }}
      </div>
      <div class="alertText">{{ authTitleText }}</div>
      <div class="alertError a-2-bd">
        <span class="alertError-text v5-1-cl">
          {{ this.$t("personal.alert.nickName") }}</span
        >
        <span v-if="!this.nickName">
          <svg class="icon icon-14 alertError-icon" aria-hidden="true">
            <use xlink:href="#icon-a_14"></use>
          </svg>
        </span>
        <span v-else>
          <svg class="icon icon-14 alertError-icon" aria-hidden="true">
            <use xlink:href="#icon-a_14_1"></use>
          </svg>
        </span>
      </div>
      <div class="alertError a-2-bd">
        <span class="alertError-text v5-1-cl">
          {{ this.$t("personal.alert.id") }}</span
        >
        <span v-if="this.authLevel !== 1">
          <svg class="icon icon-14 alertError-icon" aria-hidden="true">
            <use xlink:href="#icon-a_14"></use>
          </svg>
        </span>
        <span v-else>
          <svg class="icon icon-14 alertError-icon" aria-hidden="true">
            <use xlink:href="#icon-a_14_1"></use>
          </svg>
        </span>
      </div>
      <div class="alertError a-2-bd">
        <span class="alertError-text v5-1-cl">
          {{ this.$t("personal.alert.alertErrorTextGoogle") }}</span
        >
        <span v-if="!this.google">
          <svg class="icon icon-14 alertError-icon" aria-hidden="true">
            <use xlink:href="#icon-a_14"></use>
          </svg>
        </span>
        <span v-else>
          <svg class="icon icon-14 alertError-icon" aria-hidden="true">
            <use xlink:href="#icon-a_14_1"></use>
          </svg>
        </span>
      </div>
      <div class="alertError alertBot a-2-bd" v-if="!enforceGoogleAuth">
        <span class="alertError-text v5-1-cl">
          {{ this.$t("personal.alert.alertErrorTextPhone") }}</span
        >
        <span v-if="!this.sms">
          <svg class="icon icon-14 alertError-icon" aria-hidden="true">
            <use xlink:href="#icon-a_14"></use>
          </svg>
        </span>
        <span v-else>
          <svg class="icon icon-14 alertError-icon" aria-hidden="true">
            <use xlink:href="#icon-a_14_1"></use>
          </svg>
        </span>
      </div>
    </c-alert>
    <c-v5-dialog
      :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogLoading"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('personal.leaglTenderSet.dlalogText')">
      {{ $t("personal.leaglTenderSet.dlalogMess") }}
    </c-v5-dialog>
    <!-- 添加收款方式 -->
    <c-v5-dialog
      :showFlag="showAddPayment"
      :titleText="$t('personal.setUp.title2')"
      :haveOption="false"
      @close="showAddPayment = false"
      @confirm="goAddPayment">
      <div v-if="recPaymentList.length > 0" class="recommand v5-12-bd">
        <!-- 推荐收款方式 -->
        <div class="title v5-6-cl">{{$t("personal.leaglTenderSet.recommand")}}</div>
        <ul class="recommand-list">
          <li
            class="list-item"
            v-for="(item, index) in recPaymentList"
            @mouseover="paymentHover = 'rec' + index"
            @mouseleave="paymentHover = null"
            @click="goAddPayment(item)"
            :key="index">
            <span class="item-line" :style="{'background-color': item.color }"></span>
            <span
              class="item-name"
              :class="paymentHover === ('rec' + index) ? 'v5-1-cl':'v5-5-cl'">
              {{item.paymentName}}
            </span>
          </li>
        </ul>
      </div>
      <div class="all-payment v5-12-bd">
        <!-- 推荐收款方式 -->
        <div class="title v5-6-cl">{{$t("personal.leaglTenderSet.all")}}</div>
        <div class="search">
          <c-v5-inputFind
           class="payment-search"
           :promptText="$t('message.search')"
           :value="paymentSearch"
           @onChanges="findPayment"></c-v5-inputFind>
        </div>
        <ul v-if="paymentList.length > 0" class="payment-list">
          <li
            class="list-item"
            v-for="(item, index) in paymentList"
            @mouseover="paymentHover = item.payment"
            @mouseleave="paymentHover = null"
            @click="goAddPayment(item)"
            :key="index">
            <span class="item-line" :style="{'background-color': item.color }"></span>
            <span
              class="item-name"
              :class="paymentHover === item.payment ? 'v5-1-cl':'v5-5-cl'">
              {{item.paymentName}}
            </span>
          </li>
        </ul>
        <div v-else class="no-option">
          <!-- 暂无数据 -->
          <img :src="imgMap.no_data" alt="">
          {{ $t('components.select.noData') }}
        </div>
      </div>
    </c-v5-dialog>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/LeaglTenderSet/index';
import 'BlockChain-ui/PC/common-mixin/personal/LeaglTenderSet/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.li-div {
  width: 100% !important;
  border: none !important;
}
.li-icon{
  margin: 0 !important;
  position: absolute;
  left: 20px;
  top:20px;
  font-size:60px;
  color: #4056D8;
}
.li-icon * {
  fill: #4056D8 !important;
}
.user-management-main li {
  position:relative;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 0 40px 0 120px !important;
}
.user-management-main li:last-child {
  border:none !important;
}
</style>
