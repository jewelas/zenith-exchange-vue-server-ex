<template>
  <section class="withdraw-addAddress">
    <div class="address-form_item">
      <c-v5-select
        width="100%"
        name="symbolValue"
        :imgMap="imgMap"
        :options="selectList"
        :filterable="true"
        :value="symbolValue"
        @onChanges="selectChange">
        <span slot="promptExtend" class="v5-6-cl">{{$t('assets.addressMent.coin')}}</span>
      </c-v5-select>
    </div>
    <div v-if="branchArr.length" class="chain-item">
      <mainChain
        :titleClass="chainTitleClass"
        :branchTip="branchTip"
        :branchArr="branchArr"
        :activeBranch="activeBranch"
        @setActiveBranch="setActiveBranch"/>
    </div>
    <div class="address-form_item">
      <c-v5-input
        name="addressValue"
        width="100%"
        :value="addressValue"
        :placeholder="$t('trade.pleaseInput') + $t('assets.addressMent.WithdrawalAddress')"
        @onChanges="inputChange">
        <span class="v5-6-cl" slot="promptExtend">
          {{$t('assets.addressMent.WithdrawalAddress')}}
        </span>
      </c-v5-input>
      <c-v5-input
        name="remarksValue"
        width="100%"
        :value="remarksValue"
        :placeholder="$t('trade.pleaseInput') + $t('assets.addressMent.Remarks')"
        @onChanges="inputChange"></c-v5-input>
    </div>
    <div class="address-form_item" v-if="isHavePage">
      <c-v5-input
        name="pagesValue"
        width="100%"
        :value="pagesValue"
        :placeholder="$t('assets.addressMent.label')"
        @onChanges="inputChange">
        <div
          class="v5-6-cl addressLabel"
          slot="promptExtend"
          @mouseover="addressIconHover = true"
          @mouseout="addressIconHover = false">
          {{$t('assets.addressMent.label')}}
          <svg v-if="!addressIconHover" class="icon icon-12" aria-hidden="true">
            <use xlink:href="#icon-assets_6"></use>
          </svg>
          <svg v-if="addressIconHover" class="icon icon-12" aria-hidden="true">
            <use xlink:href="#icon-assets_6_h"></use>
          </svg>
          <transition name="slide-fade">
            <div v-show="addressIconHover" class="memo-tip v5-19-bg v5-5-cl">
              {{ $t('assets.withdraw.pageText') }}
            </div>
          </transition>
        </div>
      </c-v5-input>
    </div>
    <div class="trust-select">
      <div class="setTrust">
        <span class="v5-5-cl">{{$t('assets.addressMent.trust')}}</span>
        <i @click="setTrust">
          <svg v-if="!trustAddress" class="icon icon-36" aria-hidden="true">
            <use xlink:href="#icon-assets_16"></use>
          </svg>
          <svg v-else class="icon icon-36" aria-hidden="true">
            <use xlink:href="#icon-assets_17"></use>
          </svg>
        </i>
      </div>
      <div class="trust-tip v5-6-cl">
        {{$t('assets.addressMent.trustTip')}}
      </div>
    </div>
    <div class="footer-button">
      <c-v5-button
        width="100%"
        height="40px"
        :disabled="addressBtnDisabled"
        @click="addressBtnClick">{{ $t('assets.addressMent.add') }}</c-v5-button>
    </div>
  </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/addAddress/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/addAddress/index.styl';
import mainChainMixins from 'BlockChain-ui/PC/common-mixin/newAssets/mainChainMixins';
import mainChain from './mainChain.vue';

export default {
  mixins: [mixin, mainChainMixins],
  components: { mainChain },
  mounted() {
    this.init();
  },
};

</script>
