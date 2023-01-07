<template>
  <section class="plansdetail-container" ref="plan" v-if="flag">
    <section class="detail">
      <div class="label" v-if="user.type === 1">{{ user.vipName }}</div>
      <div class="label" v-if="user.type === 2" style="background-color: #2762ff">
        {{ user.vipName }}
      </div>
      <div class="head">
        <div class="icon" v-if="user.type === 1"></div>
        <div class="icon icon2" v-if="user.type === 2"></div>
        <div class="info">
          <div>
            <span class="title">{{$t('reward.plan.datail.level')}}:</span>
            <img v-if="user.type === 1" class="level-icon" src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220712172750884.png" alt="" />
            <img v-if="user.type === 2" class="level-icon" src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220712172805999.png" alt="" />
            <span style="color: #16181d" v-if="user.type === 1">
              {{ user.level | analysisLevel(self) }}</span>
            <span style="color: #16181d" v-if="user.type === 2">{{ user.vipName }}</span>
            <span class="link"
              v-if="user.type" @click="handleUpgrade"
              >{{$t('reward.plan.datail.upgrade')}}
            </span>
          </div>
          <div v-if="user.type === 1">
            <span class="title">{{$t('reward.plan.datail.rate')}}:</span>
            <span style="color: #16181d">{{ user.rewardRate | formatRate }}%</span>
          </div>
          <div>
            <span class="title">{{$t('reward.plan.datail.date')}}:</span>
            <span style="color: #16181d">{{ user.endTime | formatTime }}</span>
            <!-- <span class="link"
            @click="handleRenewal">{{$t('reward.plan.datail.renew')}}</span> -->
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-title">{{ $t("reward.plan.benefits.title") }}</div>
        <ol class="content-text">
          <template v-if="user.type === 1">
            <li class="info" v-if="user.level">
              {{
                $t("reward.plan.member_detail.info1", {
                  rate: $options.filters.formatRate(user.rewardRate),
                  coin: $options.filters.analysisCoin(user.transCoin, coinList),
                })
              }}
            </li>
            <li class="info" v-if="user.vipReward || user.transReward">
              <span v-if="user.vipReward && user.transReward">
                {{ $t("reward.plan.member_detail.info2.text1") }}
              </span>
              <span v-else-if="user.vipReward">
                {{ $t("reward.plan.member_detail.info2.text2") }}
              </span>
              <span v-else-if="user.transReward">
                {{ $t("reward.plan.member_detail.info2.text3") }}
              </span>
            </li>
            <li class="info">{{ $t("reward.plan.member_detail.info3") }}</li>
            <li class="info" v-if="user.vipReward">
             {{
                $t("reward.plan.member_detail.info4", {
                  rate: $options.filters.formatRate(user.roleRate),
                })
              }}
            </li>
            <li class="info" v-if="user.transReward">
              {{
                $t("reward.plan.member_detail.info5", {
                  rate: $options.filters.formatRate(user.transRewardRate),
                })
              }}
            </li>
          </template>
          <template v-if="user.type === 2">
            <li class="info">
              {{ $t("reward.plan.benefits.ani.info2") }}
            </li>
            <li class="info">
              {{
                $t("reward.plan.benefits.ani.info4", {
                  rate: $options.filters.formatRate(user.roleRate),
                })
              }}
            </li>
          </template>
        </ol>
      </div>
      <div class="box"></div>
    </section>
    <section class="card" :style="user.vipReward&&user.transReward?'justify-content: center':''">
      <TradeCard
        class="card-item"
        v-if="user.transReward"
        :data="user"
        :class="!user.vipReward ? 'one-card' : ''"
      />
      <RebateCard
        class="card-item"
        v-if="user.vipReward"
        :data="user"
        :class="!user.transReward ? 'one-card' : ''"
      />
    </section>
    <div class="box"></div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/reward/plans/detail';
import 'BlockChain-ui/PC/common-mixin/reward/plans/detail.styl';

import TradeCard from './tradeCard.vue';
import RebateCard from './rebateCard.vue';

export default {
  mixins: [mixin],
  components: {
    TradeCard,
    RebateCard,
  },
  beforeUpdate() {
    this.$nextTick(() => {
      this.$emit('update:boxHeight', this.$refs.plan.offsetHeight);
    });
  },
};
</script>
