<template>
  <section class="container" ref="plan">
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
            <img v-if="user.type === 1" class="level-icon" src="../assets/crown-1.png" alt="" />
            <img v-if="user.type === 2" class="level-icon" src="../assets/crown-2.png" alt="" />
            <span style="color: #16181d" v-if="user.type === 1">
              {{ user.level | analysisLevel(self) }}</span>
            <span style="color: #16181d" v-if="user.type === 2">{{ user.vipName }}</span>
            <!-- <span class="link"
            v-if="!(user.level === 3 && user.type === 1)" @click="handleUpgrade"
              >{{$t('reward.plan.datail.upgrade')}}</span
            > -->
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
                  coin: $options.filters.analysisCoin(user.rewardCoin, coinList),
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
                $t("reward.plan.benefits.ani.info1", {
                  rate: $options.filters.formatRate(user.transRewardRate),
                })
              }}
            </li>
          </template>
        </ol>
      </div>
      <div class="box"></div>
    </section>
    <section class="card">
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
    <stakingDialog
      v-if="dialogVisible"
      :showFlag.sync="dialogVisible"
      :config="contentList"
      :id="current"
    />
  </section>
</template>

<script>
import { fixD, getCoinShowName } from '@/utils';
import { mapState } from 'vuex';
import TradeCard from './tradeCard.vue';
import RebateCard from './rebateCard.vue';
import stakingDialog from './dialog/stakingDialog.vue';

export default {
  name: 'PlansDetail',
  components: {
    TradeCard,
    RebateCard,
    stakingDialog,
  },
  props: {
    syncType: { type: [Number, String], default: 0 },
    toSub: { type: Boolean, default: true },
    user: { type: Object, default: () => ({}) },
    boxHeight: { type: Number, default: 0 },
  },
  data() {
    return {
      self: this,
      dialogVisible: false,
      current: '',
      contentList: [],
      flag: true,
    };
  },
  beforeUpdate() {
    if (this.user.vipId && this.user.type === 1) this.initData();
    this.$nextTick(() => {
      this.$emit('update:boxHeight', this.$refs.plan.offsetHeight);
    });
  },
  methods: {
    handleUpgrade() {
      if (this.user.sort === 0 && this.flag) {
        this.dialogVisible = true;
      } else {
        this.$emit('change', true, 1);
      }
    },
    handleRenewal() {
      this.$emit('change', true, 2, this.user.vipId);
    },
    async initData() {
      try {
        const { data, code, msg } = await this.axios({
          url: 'noToken/members/stakingList',
          headers: { 'Content-Type': 'application/json' },
          hostType: 'fe-increment-api',
          params: { vipId: this.user.vipId },
          method: 'post',
        });
        if (code !== 0) throw new Error(msg);
        if (!data) return;
        const { list } = data;
        // if (!list) throw new Error(this.$t('reward.error.staking'));
        if (list) {
          this.contentList = list;
          const findPeriod = Math.max(...this.contentList.map(item => item.stakingPeriod));
          this.current = this.contentList.filter(
            item => item.stakingPeriod === findPeriod,
          )[0].stakingId;
        }
      } catch ({ message }) {
        this.flag = false;
        this.$bus.$emit('tip', { text: message, type: 'error' });
      }
    },
  },
  computed: {
    ...mapState({
      market: state => state.baseData.market,
    }),
    coinList() {
      return this.market ? this.market.coinList : '';
    },
  },
  filters: {
    analysisLevel(state, self) {
      const statusMap = {
        1: self.$t('reward.level.level1'),
        2: self.$t('reward.level.level2'),
        3: self.$t('reward.level.level3'),
      };
      return state ? statusMap[state] : '--';
    },
    analysisCoin(coin, coinList) {
      return coinList ? getCoinShowName(coin, coinList) : '';
    },
    formatRate(rate) {
      return rate ? fixD(rate, 2) : '--';
    },
    formatTime(time) {
      const padZero = num => (num < 10 ? `0${num}` : num);
      const date = new Date(time);
      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());
      const hour = padZero(date.getHours());
      const minute = padZero(date.getMinutes());
      const second = padZero(date.getSeconds());
      return time ? `${year}/${month}/${day} ${hour}:${minute}:${second}` : '--';
    },
  },
};
</script>

<style lang="stylus" scoped>
* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.box{
  clear: both;
}
.detail,
.card {
  width: 588px;
}

.detail {
  height: auto;
  margin: 0 18px 0 8px;
  padding: 72px 32px 32px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(39, 98, 255, 0.1);
  border-radius: 24px;
  position: relative;
}

.detail .label {
  position: absolute;
  top: 12px;
  left: -8px;
  width: 134px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #FFFFFF;
  background-color: #F8BF1D;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid transparent;
    border-right: 10px solid #FFFFFF;
  }
}

.detail .head {
  display: flex;
  width: 100%;
  margin: 20px 0;

  .icon {
    width: 80px;
    height: 80px;
    margin-right: 40px;
    border-radius: 50%;
    background: url('../assets/xlevel-1.png') no-repeat;
  }

  .info {
    height: 90px;
    font-size: 16px;

    >div {
      margin-bottom: 20px;
    }

    .title {
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: 5px;
    }
  }
}

.content {
  width:520px;
  .content-title {
    margin: 0 0 16px 0;
    font-size: 24px;
    font-family: 'DINPro';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    color: #16181D;
  }

  .info {
    margin: 0 0 12px 16px;
    list-style-type:decimal
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-item {
  margin: 16px 0;
}

.link {
  color: #2762FF;
  text-decoration-line: underline;
  margin-left: 5px;
}

.level-icon {
  display: inline-block;
  vertical-align: bottom;
  width: 24px;
  height: auto;
  line-height: 24px;
  margin-right: 5px;
}

.one-card {
  margin-top: 132px;
}

.icon2 {
  background: url('../assets/xlevel-2.png') no-repeat !important;
}
</style>
