<template>
  <div class="personal-fiatAccount fuz-card with-title">
    <p class="fiatAccount-header fuz-card-title">
      {{ $t("personal.navMenu.list.fiatAccount") }}
    </p>
    <div class="fiatAccount-main clearfix">
      <ul class="ul">
        <li class="li clearfix">
          <!--icon占位用-->
          <svg class="li-icon icon icon-24" aria-hidden="true">
            <use xlink:href="#icon-e_7"></use>
          </svg>
          <div class="li-div li-divs a-3-bd b-1-cl clearfix">
            <p class="li-title">
              {{ $t("personal.navMenu.list.fiatAccount") }}
            </p>
            <p class="li-text b-2-cl">
              {{ $t("fiatAccount.tip") }}
            </p>
            <div class="li-right clearfix">
              <c-button
                type="solid"
                :big="true"
                className="user-button"
                paddingW="18px"
                height="30px"
                @click="addBankCard"
                >{{ $t("personal.tool.add") }}</c-button>
            </div>
          </div>
        </li>
        <li class="li clearfix" v-for="item in dataList" :key="item.id">
          <div class="li-div li-div-right a-3-bd b-1-cl clearfix">
            <p class="li-title">
              <span class="li-title-icon" :style="{ background: item.color }"></span>
              <span class="li-title-name">{{ item.bankNameShow }}</span>
              <span
                class="li-title-symbol a-4-bg"
                v-for="symbol in item.supportSymbolList"
                :key="symbol.symbol">
                <img :src="symbol.logo" alt="" />
                {{symbol.symbol}}
              </span>
            </p>
            <p class="li-text b-2-cl">
              <span>
                {{item.bankAccount}}&nbsp;|&nbsp;{{item.bankCardNumber}}&nbsp;|&nbsp;{{item.remark}}
              </span>
            </p>
            <div class="li-right clearfix">
              <c-switch
                :value="Boolean(item.status)"
                @click="switchChange(`${item.id}`, `${item.status}`)"
              />
              <c-button
                className="li-fun b-4-cl clearfix"
                type="text"
                @click="edit(item, 'delete')"
              >
                {{ $t("personal.tool.delete") }}
              </c-button>
              <c-button
                className="li-fun b-4-cl clearfix"
                type="text"
                @click="edit(item, 'modify')"
              >
                {{ $t("personal.tool.modify") }}
              </c-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <c-dialog
      :showFlag="isShowDelTip"
      paddingBottom="14px"
      @close="isShowDelTip = false"
      @confirm="confirmDelete"
      :titleText="$t('personal.leaglTenderSet.dlalogText')">
      {{ $t("fiatAccount.deleteTip") }}
    </c-dialog>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/fiatAccount/index';
import 'BlockChain-ui/PC/common-mixin/personal/fiatAccount/index.styl';

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
li {
  position:relative;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 0 40px 0 120px !important;
}
li:last-child {
  border:none !important;
}
</style>
