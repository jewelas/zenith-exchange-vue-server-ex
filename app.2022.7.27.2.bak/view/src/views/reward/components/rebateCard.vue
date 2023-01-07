<template>
  <section class="cards">
    <div class="title">
      <span class="rebate-icon"></span>
      {{$t('reward.plan.commission.memberTitle')}}
    </div>
    <div class="price">
      <div class="accumulated">
        <span>
          <span class="count">{{ data.rebateAmount || "--" }}</span>
          <!-- <span class="coin">{{ data.rewardCoin || "QTE" }}</span> -->
          <span class="coin">USDT</span>
        </span>
        <span class="text">{{$t('reward.plan.card.accReward')}}</span>
      </div>
      <div class="yesterday">
        <span>
          <span class="count">{{ data.rebateYesterDayAmount || "--" }}</span>
          <!-- <span class="coin">{{ data.rewardCoin || "QTE" }}</span> -->
          <span class="coin">USDT</span>
        </span>
        <span class="text">{{$t('reward.plan.card.yesReward')}}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RebateCard',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="stylus" scoped>
* {
  box-sizing: border-box;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  color: #FFFFFF;
}

.cards {
  width: 588px;
  height: 216px;
  padding: 32px;
  border-radius: 24px;
  background: linear-gradient(277.69deg, #55C0FF 0%, #466CFF 100%);
}

.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 28px;
  text-transform: capitalize;

  span {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    background: url('../assets/info-1.png') no-repeat;
  }
}

.price {
  display: flex;
  padding: 34px 40px 0;
  justify-content: space-between;
  font-weight: 400;

  .count {
    font-family: 'DINPro';
    font-weight: 700;
    font-size: 48px;
  }

  .coin {
    font-weight: 400;
    font-size: 16px;
  }
}

.accumulated, .yesterday {
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    font-family: 'PingFang SC';
    font-weight: 600;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    opacity: 0.6;
  }
}

.accumulated {
  .text {
    margin-top: 16px;
  }
}

.yesterday {
  .count {
    font-weight: 400;
  }

  .text {
    margin-top: 12px;
  }
}
</style>
