<template>
  <section class="mainChain">
    <div class="mainChain-title">
      {{$t('assets.branchName')}}
      <div class="mainChain-page-icon" v-if="branchTip">
        <svg class="icon icon-14" aria-hidden="true">
          <use xlink:href="#icon-a_15"></use>
        </svg>
        <ul class="mainChain-page-market a-4-bg">
          <li>
            {{branchTip}}
          </li>
          <!-- <li class="warn b-7-cl">
            充提时请务必核对USDT的主链类型
          </li> -->
        </ul>
      </div>
    </div>
    <ul class="branchList clearfix">
      <li
        v-for="(item, index) in branchArr"
        :key="index"
        :class="item.code === activeBranch ? 'b-1-cl a-4-bg' : ''"
        @click="setActiveBranch(item.code)"
      >
        {{ item.value }}
      </li>
    </ul>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/assets/mainChain/mainChain';
import 'BlockChain-ui/PC/common-mixin/assets/mainChain/mainChain.styl';

export default {
  mixins: [mixin],
  name: 'mainChain',
};
</script>
