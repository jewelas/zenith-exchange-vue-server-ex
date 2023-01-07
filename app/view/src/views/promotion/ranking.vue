<template>
  <div class="ranking-modal" :v-show="showRankingFlag">
    <div class="bg"></div>
    <div class="card">
      <div class="close" @click="closeFn"><img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201525875.png" alt="" /></div>
      <div class="header">
        <img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220609191710280.svg" alt="" />
        <div class="title">
          <p>{{ $t("invitePrize.modalRanking_title") }}</p>
          <div>{{ $t("invitePrize.modalRanking_txt") }}</div>
        </div>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item, index) in rankingList" :key="index">
            <div class="order" v-if="index < 3">
              <img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201701979.svg" v-if="index == 0" /><img
                src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201719991.svg"
                v-if="index == 1"
              /><img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608201730175.svg" v-if="index == 2" />
            </div>
            <span v-else>{{ index + 1 }}</span>
            <p>ID&nbsp;{{ item.rewardUid }}</p>
            <div class="amount">{{ item.totalConversionRewardAmount }}&nbsp;USDT</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/promotion/ranking/ranking';
import 'BlockChain-ui/PC/common-mixin/promotion/ranking/ranking.styl';

export default {
  mixins: [mixin],
  props: {
    showRankingFlag: { default: false, type: Boolean },
  },
  mounted() {
    this.init();
  },
};
</script>
