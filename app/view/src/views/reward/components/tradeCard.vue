<template>
  <section class="card-item">
    <div class="title">
      <span class="icon"></span>
      {{$t('reward.plan.commission.transTitle')}}
    </div>
    <div class="price">
      <div class="accumulated">
        <span>
          <span class="count">{{ data.transRewardAmount || "--" }}</span>
          <span class="coin">{{ data.rewardCoin | analysisCoin(coinList) }}</span>
          <!-- <span class="coin">QTE</span> -->
        </span>
        <span class="text">{{$t('reward.plan.card.accReward')}}</span>
      </div>
      <div class="yesterday">
        <span>
          <span class="count">{{ data.transRewardYesterDayAmount || "--" }}</span>
          <span class="coin">{{ data.rewardCoin | analysisCoin(coinList) }}</span>
          <!-- <span class="coin">QTE</span> -->
        </span>
        <span class="text">{{$t('reward.plan.card.yesReward')}}</span>
      </div>
    </div>
  </section>
</template>

<script>
import 'BlockChain-ui/PC/common-mixin/reward/card/index.styl';
import mixin from 'BlockChain-ui/PC/common-mixin/reward/card/index';

export default {
  name: 'TradeCard',
  mixins: [mixin],
};
</script>

<style lang="stylus" scoped>
.card-item{
  background: linear-gradient(262.31deg, #F8BF1D 0%, #FF8341 100%);
  .icon{
    background: url('http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220712175059401.png') no-repeat;
  }
}
</style>
