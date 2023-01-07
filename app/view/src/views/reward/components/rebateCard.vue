<template>
  <section class="card-item">
    <div class="title">
      <span class="icon"></span>
      {{$t('reward.plan.commission.memberTitle')}}
    </div>
    <div class="price">
      <div class="accumulated">
        <span>
          <span class="count">{{ data.rebateAmount || "--" }}</span>
          <span class="coin">{{ data.rebateCoin | analysisCoin(coinList) }}</span>
          <!-- <span class="coin">QTE</span> -->
        </span>
        <span class="text">{{$t('reward.plan.card.accReward')}}</span>
      </div>
      <div class="yesterday">
        <span>
          <span class="count">{{ data.rebateYesterDayAmount || "--" }}</span>
          <span class="coin">{{ data.rebateCoin | analysisCoin(coinList) }}</span>
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
  name: 'RebateCard',
  mixins: [mixin],
};
</script>

<style lang="stylus" scoped>
.card-item{
  background: linear-gradient(277.69deg, #55C0FF 0%, #466CFF 100%);
  .icon{
    background: url('http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220712175122415.png') no-repeat;
  }
}
</style>
