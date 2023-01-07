<template>
  <div v-if="flag">
    <section class="intro">
      <div class="requirements">
        <div class="title">{{ $t("reward.plan.requirements.title") }}</div>
        <ol class="content">
          <li class="info" v-if="config.kycLimit === 1">
            {{ $t("reward.plan.requirements.info1") }}
          </li>
          <li class="info">
            <!-- Requires a {{ config.vipAmount || 0 }}
             {{ config.vipCoin | analysisCoin(self) }} membership package. -->
            {{
              $t("reward.plan.requirements.info2", {
                amount: config.vipAmount || 0,
                coin: $options.filters.analysisCoin(config.vipCoin, coinList),
              })
            }}
          </li>
          <template v-if="config.type === 1">
            <li class="info">
              {{
                $t("reward.plan.requirements.info3", {
                  coin: $options.filters.analysisCoin(config.stakingCoin, coinList),
                })
              }}
            </li>
            <li class="info">
              <!-- Freeze
              {{ config.freezeRate | formatRate }}% of {{ config.transCoin| analysisCoin(self) }}
              every day. -->
              {{
                $t("reward.plan.requirements.info4", {
                  rate: $options.filters.formatRate(config.freezeRate),
                  coin: $options.filters.analysisCoin(config.transCoin, coinList),
                })
              }}
            </li>
            <li class="info">
              {{
                $t("reward.plan.requirements.info5", {
                  coin: $options.filters.analysisCoin(config.transCoin, coinList),
                  startTime: $options.filters.formatTime(config.withdrawStartTime),
                  endTime: $options.filters.formatTime(config.withdrawEndTime),
                })
              }}
              <!-- {{ config.transCoin | analysisCoin(self) }} withdrawal time:
              {{ config.withdrawStartTime | formatTime }}
              ~{{ config.withdrawEndTime | formatTime }} (UTC+8) -->
            </li>
          </template>
        </ol>
      </div>
      <div class="benefits">
        <div class="title">{{ $t("reward.plan.benefits.title") }}</div>
        <ol class="content">
          <template v-if="config.type === 1">
            <li class="info">
              {{
                $t("reward.plan.benefits.member.info1", {
                  rate: $options.filters.formatRate(config.rewardRate),
                  coin: $options.filters.analysisCoin(config.rewardCoin, coinList),
                })
              }}
              <!-- Members can get {{ config.rewardRate | formatRate }}%
              {{ config.rewardCoin | analysisCoin(self) }} reward of daily transaction amount. -->
            </li>
            <li class="info" v-if="config.vipReward || config.transReward">
              <span v-if="config.vipReward && config.transReward">
                {{ $t("reward.plan.benefits.member.info2.text1") }}
              </span>
              <span v-else-if="config.vipReward">
                {{ $t("reward.plan.benefits.member.info2.text2") }}
              </span>
              <span v-else-if="config.transReward">
                {{ $t("reward.plan.benefits.member.info2.text3") }}
              </span>
            </li>
            <li class="info">{{ $t("reward.plan.benefits.member.info3") }}</li>
            <li class="info" v-if="config.vipReward">
              {{
                $t("reward.plan.benefits.member.info4", {
                  rate: $options.filters.formatRate(config.roleRate),
                })
              }}
            </li>
            <li class="info" v-if="config.transReward">
              {{
                $t("reward.plan.benefits.member.info5", {
                  rate: $options.filters.formatRate(config.transRewardRate),
                })
              }}
            </li>
          </template>
          <template v-if="config.type === 2">
            <li class="info" v-if="config.transReward">
              {{
                $t("reward.plan.benefits.ani.info1", {
                  rate: $options.filters.formatRate(config.transRewardRate),
                })
              }}
            </li>
            <li class="info">
              {{ $t("reward.plan.benefits.ani.info2") }}
            </li>
            <li class="info">{{ $t("reward.plan.benefits.ani.info3") }}</li>
          </template>
        </ol>
      </div>
    </section>
    <section class="commission">
      <div class="title">{{ $t("reward.plan.commission.title") }}</div>
      <div class="intro-text">
        <span v-if="config.vipReward && config.transReward">
          {{ $t("reward.plan.commission.info1",{
            name:config.vipName
          }) }}
          </span>
        <span v-else-if="config.vipReward">
          {{ $t("reward.plan.commission.info2",{
            name:config.vipName
          }) }}
        </span>
        <span v-else-if="config.transReward">
          {{ $t("reward.plan.commission.info3",{
            name:config.vipName
          }) }}
          </span>
      </div>
      <div class="commission-item">
        <div class="rebate" v-if="config.vipReward === 1">
          <div class="commission-item-title">{{ $t("reward.plan.commission.memberTitle") }}</div>
          <div class="table">
            <div class="header-row">
              <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
            </div>
            <div class="content-row" v-for="(item, index) in config.roleRateList" :key="index">
              <div class="cell">{{ item.roleName }}</div>
              <div class="cell">{{ item.roleRate | formatRate }}%</div>
            </div>
          </div>
          <div v-if="!config.roleRateList.length" class="nodata">{{ $t("reward.nodata") }}</div>
        </div>
        <div class="reward" v-if="config.transReward === 1">
          <div class="commission-item-title">{{ $t("reward.plan.commission.transTitle") }}</div>
          <div class="table">
            <div class="header-row">
              <div class="cell" v-for="(item, index) in headerList" :key="index">{{ item }}</div>
            </div>
            <div
              class="content-row"
              v-for="(item, index) in config.transRewardRateList"
              :key="index"
            >
              <div class="cell">{{ item.roleName }}</div>
              <div class="cell">{{ item.roleRate | formatRate }}%</div>
            </div>
          </div>
          <div  v-if="!config.transRewardRateList.length" class="nodata">
          {{ $t("reward.nodata") }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fixD, getCoinShowName } from '@/utils';
import { mapState } from 'vuex';

export default {
  name: 'PlansInfo',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      self: this,
      flag: false,

    };
  },
  computed: {
    ...mapState({
      market: state => state.baseData.market,
    }),
    coinList() {
      return this.market ? this.market.coinList : '';
    },
    headerList() {
      return this.$t('reward.plan.commission.headerList');
    },
  },
  watch: {
    config: {
      handler() {
        if (this.config) this.flag = true;
      },
      immediate: true,
    },
  },
  filters: {
    formatTime(time) {
      const padZero = num => (num < 10 ? `0${num}` : num);
      const date = new Date(time);
      const hour = padZero(date.getHours());
      const minute = padZero(date.getMinutes());
      return time ? `${hour}:${minute}` : '--';
    },
    formatRate(rate) {
      return rate ? fixD(rate, 2) : '--';
    },
    analysisCoin(coin, coinList) {
      return coinList ? getCoinShowName(coin, coinList) : '';
    },
  },
};
</script>

<style lang="stylus" scoped>
* {
  box-sizing: border-box;
}

.title {
  font-family: 'DINPro';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: #16181D;
}

.intro {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #16181D;
  overflow: hidden;

  .requirements, .benefits {
    width: 48%;
  }

  .content {
    margin: 32px 0 0 20px;
  }

  .info {
    list-style-type:decimal
    margin: 12px 0;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
}

.commission {
  margin-top: 60px;
  width: 100%;

  .intro-text {
    margin: 16px 0 0 0;
    font-family: 'DINPro';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    color: #888FA1;
  }

  .commission-item {
    display: flex;
    justify-content: flex-start;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #16181D;

    .rebate, .reward {
      width: 50%;
    }

    .commission-item-title {
      width: 392px;
      margin: 32px 0 18px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #16181D;
      text-align: center;
    }
  }
}

.table {
  display: table;
  border: 1px solid #E8EBF3;

  .header-row, .content-row {
    display: table-row;
    text-align: center;
    border: 1px solid #E8EBF3;

    .cell {
      display: table-cell;
      width: 196px;
      padding: 12px 0;
      vertical-align: middle;
      border: 1px solid #E8EBF3;
    }
  }

  .header-row .cell {
    background-color: #F5F8FE;
  }
}

.plans-info {
  padding-top: 184px;
}

.nodata {
  display: flex;
  width: 392px;
  height: 40px;
  justify-content: center;
  align-items: center;
}
</style>
