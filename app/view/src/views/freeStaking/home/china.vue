<template>
  <div class="free-staking" v-if="homeData">
    <!-- <div class="banner header" :style="`background-image:url(${homeData.banner})`">
      <div class="article-cont">
        <c-button
          v-if="homeData.url"
          width="120px"
          height="36px"
          @click="navToConfigUrl(homeData.url)"
        >
          {{ $t("freeStaking.home.notice") }}
        </c-button>
      </div>
    </div> -->
    <!-- intro -->
    <div class='intro fuz-page-content'>
      <div class="left-content">
        <div class="fuz-title fuz-gap">
          FuzionX Chain –
          <i>Stake and Earn Rewards</i>
        </div>
        <div class="fuz-content fuz-gap">
          FuzionX chain staking program is an easy way to multiply your earning potential.
          Stake coins and earn rewards that grow with time.
        </div>
      </div>
      <div class="right-content">
        <Button width='200' @click="navToPosHistory">My Pos record</Button>
        <Button width='200' ghost @click='toFAQ'>FAQ</Button>
      </div>
    </div>
    <Why/>
    <!-- into end -->
    <div class="free-staking-cont fuz-page-content">
      <!-- <div class="title">
        <div class="titlel f-1-cl">{{ $t("freeStaking.home.title") }}</div>
        <div class="titler" @click="navToPosHistory">
          <svg class="icon icon-17" aria-hidden="true">
            <use xlink:href="#icon-a_22"></use>
          </svg>
          <span class="f-4-cl">{{ homeData.tipMine }}</span>
        </div>
        <div class="clearfix"></div>
      </div> -->
      <div class="nav-tab fuz-noborder">
        <c-navTab
          minWidth="90px"
          activeClassName="f-1-cl"
          activeColor="c-8-bg"
          class="fuz-tab-group outline"
          :currentTab="currentType"
          :navTab="navTab"
          lineHeight="55"
          @currentType="selectType"
        />
        <div class="clearfix"></div>
      </div>
      <div class="min-tab fuz-button-group background">
        <div
          class="min-tab-item"
          :class="[currentStyle(item), {active: item.index === currentStatus}]"
          v-for="item in statusTab"
          :key="item.index"
          @click="changeCurrentStatus(item)"
        >
          {{ item.name }}
        </div>
        <div class="clearfix"></div>
      </div>
      <table class="project-list simple-table" v-if="filterProjectData.length">
        <tr class='table-head'>
          <th style='width: 320px'>Project Name</th>
          <th>Gain Rate</th>
          <th>Staking Period</th>
          <th style='width: 220px'>Staking Progress</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        <tr
          v-for="item in filterProjectData"
          :key="item.index"
        >
          <td class="project-iteml">
            <div class='fuz-row'>
              <img class="logo" :src="item.logo" alt="" />
              <div>
                <div class="coin-base-info c-5-bd">
                  <div class="base-coin f-1-cl">
                    {{ item.shortName }}
                  </div>
                  <div class="short-name f-2-cl">({{ item.gainCoinName }})</div>
                  <div class="label-type" v-if="showLabel(item, 2)">
                    {{ projectLabel(item.labelType) }}
                  </div>
                  <div class="label-type hot f-6-cl" v-if="showLabel(item, 1)">
                    {{ projectLabel(item.labelType) }}
                  </div>
                </div>
                <div class="project-title f-1-cl">{{ item.name }}</div>
              </div>
            </div>
          </td>
          <td>
            <span class='value'>{{ item.gainRate }}%</span>
          </td>
          <td>
            <span  v-if="item.projectType === 3 || item.projectType === 2">
              {{ item.lockDay }}
            </span>
          </td>
          <td>
            <div  v-if="item.projectType === 3" class='progress' :style='getStyle(item)'>
              <span class='value' style='color:#fff'>{{ item.progress }}</span>
            </div>
          </td>
          <td>
            <span
              class="status-text"
              :class="countStatusIsOn(item)"
              >{{ countStatusText(item) }}</span
            >
          </td>
          <td>
            <c-button
              defaultColorClass=""
              width="120px"
              height="40px"
              @click="takeActivityDetail(item)"
            >
              <div class="nav-active-text">
                {{ $t("freeStaking.home.takeActivity") }}
              </div>
            </c-button>
          </td>
        </tr>
      </table>
      <div v-else class="no-data f-2-cl">
        <svg class="icon icon-50" aria-hidden="true" style='font-size: 50px'>
          <use xlink:href="#icon-g_2"></use>
        </svg>
        <p>
          <!-- 暂无数据 -->
          {{ $t("common.notData") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/freeStaking/home/home';
import 'BlockChain-ui/PC/common-mixin/freeStaking/home/home.styl';
import Button from '@/components/fuzionx/button/Button.vue';
import Why from './why.vue';

export default {
  components: { Why, Button },
  mixins: [mixin],
  mounted() {
    this.init();
  },
  methods: {
    toFAQ() {
      window.open('https://support.fuzionx.io/hc/en-us/sections/5610537836573-ANNOUNCEMENTS', '_blank');
    },
    getStyle(item) {
      const percent = parseInt(item.progress, 10);
      const css = { background: `linear-gradient(to right, #00957B 0%, #00957B ${percent}%, rgba(255,255,255,0.1) ${percent}%)` };
      console.log(css);
      return css;
    },
  },
};
</script>
<style scoped>
.intro {
  max-width: 1280px;
  position: relative;
  margin-top: 50px !important;
}
.intro .left-content {
  width: 600px;

}
.intro .right-content {
  position: absolute;
  top: 10px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}
.free-staking-cont {
  position: relative;
}
.min-tab {
  position: absolute;
  right:0;
  top: 20px;
  margin-top: 0 !important;
}
.project-iteml img {
  width: 44px;
}
.coin-base-info {
  display: flex;
  gap: 5px;
}
.label-type {
  margin-right: 12px;
  vertical-align: top;
  text-align: center;
  font-family: Roboto-Regular;
  width: 50px;
  height: 22px;
  line-height: 22px;
  border-radius: 0 6px 0 6px;
  font-size: 12px;
  background: rgba(36,160,245,.15);
  color: #24a0f5 !important;
  display: inline-block;
}
.hot {
  background: rgba(235,77,92,.15);
  color: #eb4d5c!important;
}
.progress {
  height: 28px;
  width: 130px;
  margin-left: 20px;
  border-radius: 4px;
}
.progress .value {
  color:#fff;
  display: block;
  text-align: center;
  line-height: 28px;
}
</style>
