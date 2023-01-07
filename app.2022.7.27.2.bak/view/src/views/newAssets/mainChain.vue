<template>
  <section class="v5-mainChain">
    <div class="mainChain-title" :class="titleClass">
      {{$t('assets.branchName')}}
      <div
        v-if="branchTip"
        class="mainChain-page-icon"
        @mouseover="iconHover = true"
        @mouseout="iconHover = false">
        <svg v-if="!iconHover" class="icon icon-12" aria-hidden="true">
          <use xlink:href="#icon-assets_6"></use>
        </svg>
        <svg v-if="iconHover" class="icon icon-12" aria-hidden="true">
          <use xlink:href="#icon-assets_6_h"></use>
        </svg>
        <transition name="slide-fade">
          <div v-show="iconHover" class="mainChain-page-market v5-19-bg v5-5-cl box-shadow">
            {{branchTip}}
            <span class="triangle v5-19-bd"></span>
          </div>
        </transition>
      </div>
    </div>
    <ul class="branchList fuz-button-group">
      <li
        v-for="(item, index) in branchArr"
        :key="index"
        :class="{
          'u-16-cl v5-1-bg active': item.code === activeBranch,
          '': item.code !== activeBranch,
          '': item.code === branchHover && item.code !== activeBranch,
          '': item.code !== branchHover && item.code !== activeBranch,
        }"
        @mouseover="branchHover = item.code"
        @mouseout="branchHover = null"
        @click="setActiveBranch(item)"
      >
        {{ item.value }}
      </li>
    </ul>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newAssets/mainChain/index';
import 'BlockChain-ui/PC/common-mixin/newAssets/mainChain/index.styl';

export default {
  mixins: [mixin],
  name: 'mainChain',
};
</script>
