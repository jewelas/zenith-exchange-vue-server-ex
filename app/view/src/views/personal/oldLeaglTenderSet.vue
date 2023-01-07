<template>
  <div class="legal-tender-set">
    <p class="user-management-child-header b-1-cl a-3-bd">
      {{ $t("personal.leaglTenderSet.title") }}
    </p>
    <div class="user-management-main clearfix">
      <ul class="ul">
        <li class="li clearfix">
          <!--icon占位用-->
          <svg class="li-icon icon icon-24" aria-hidden="true">
            <use xlink:href="#icon-e_7"></use>
          </svg>
          <div class="li-div li-divs a-3-bd b-1-cl clearfix">
            <p class="li-title">
              {{ $t("personal.leaglTenderSet.titleList")[0].text }}
            </p>
            <p class="li-text b-2-cl">
              {{ $t("personal.leaglTenderSet.titleList")[0].label }}
            </p>
            <div class="li-right clearfix">
              <c-button
                type="solid"
                :big="true"
                className="user-button"
                paddingW="18px"
                height="30px"
                @click="btnLink('setUp')"
                >{{
                  dataList.length === 0
                    ? $t("personal.tool.setUp")
                    : $t("personal.tool.add")
                }}</c-button
              >
            </div>
          </div>
        </li>
        <li class="li clearfix" v-for="obj in dataList" :key="obj.id">
          <div class="li-div li-div-right a-3-bd b-1-cl clearfix">
            <p class="li-title">
              <c-otcPayIcon :imgUrl="obj.icon" />
              {{ obj.title }}
              <span
                class="carp-coin"
                v-if="
                  excheifFlag &&
                    obj.payment === 'otc.payment.domestic.bank.transfer'
                "
              >
                {{ obj.coinName }}</span
              >
            </p>
            <p class="li-text b-2-cl" v-html="resloveText(obj)"></p>
            <div class="li-right clearfix">
              <c-switch
                :value="Boolean(obj.isOpen)"
                @click="switchChange(`${obj.id}`, `${obj.isOpen}`)"
              />
              <c-button
                className="li-fun b-4-cl clearfix"
                type="text"
                @click="click(`${obj.id}`, 'delete')"
              >
                {{ $t("personal.tool.delete") }}
              </c-button>
              <!--
              <span class="li-fun b-4-cl clearfix" @click="click(`${obj.id}`, 'delete')">
                {{$t('personal.tool.delete')}}</span>
                -->
              <c-button
                className="li-fun b-4-cl clearfix"
                type="text"
                @click="click(obj, 'modify')"
              >
                {{ $t("personal.tool.modify") }}
              </c-button>
              <!--
              <span class="li-fun b-4-cl clearfix" @click="click(obj, 'modify')">
                {{$t('personal.tool.modify')}}</span>
                -->
            </div>
          </div>
        </li>
        <li class="li clearfix">
          <!--icon占位用-->
          <svg class="li-icon icon icon-24" aria-hidden="true">
            <use xlink:href="#icon-e_8"></use>
          </svg>
          <div class="li-div li-divs a-3-bd b-1-cl clearfix">
            <p class="li-title">
              {{ $t("personal.leaglTenderSet.titleList")[1].text }}
            </p>
            <p class="li-text b-2-cl">
              {{ $t("personal.leaglTenderSet.titleList")[1].label }}
            </p>
            <div class="li-right clearfix">
              <c-button
                v-if="isCapitalPwordSet === 0"
                type="solid"
                :big="true"
                className="user-button"
                paddingW="18px"
                height="30px"
                @click="btnLink('modifySettings')"
                >{{ $t("personal.tool.setUp") }}</c-button
              >
              <c-button
                v-else
                className="li-fun b-4-cl clearfix"
                type="text"
                @click="btnLink('modifySettings')"
              >
                {{ $t("personal.tool.modify") }}
              </c-button>
              <!--
              <span v-else class="li-fun b-4-cl clearfix"
                    @click="btnLink('modifySettings')">{{$t('personal.tool.modify')}}</span>
                    -->
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
      <div class="alertTitle b-1-cl">
        {{ fiatTradeOpen
          ? $t("assets.b2c.otcShow.fiatTitle")
          : $t("personal.alert.fiatTitle") }}
      </div>
      <div class="alertText">{{ authTitleText }}</div>
      <div class="alertError a-2-bd">
        <span class="alertError-text b-4-cl">
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
        <span class="alertError-text b-4-cl">
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
        <span class="alertError-text b-4-cl">
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
        <span class="alertError-text b-4-cl">
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
    <c-dialog :showFlag="dialogFlag"
      paddingBottom="14px"
      :confirmLoading="dialogLoading"
      @close="dialogClose"
      @confirm="dialogConfirm"
      :titleText="$t('personal.leaglTenderSet.dlalogText')">
      {{ $t("personal.leaglTenderSet.dlalogMess") }}
    </c-dialog>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/oldLeaglTenderSet/LeaglTenderSet';
import 'BlockChain-ui/PC/common-mixin/personal/oldLeaglTenderSet/LeaglTenderSet.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
