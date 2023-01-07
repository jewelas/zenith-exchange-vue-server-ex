<template>
<section>
  <overviewChars :reqData="reqData" :reqReady="reqReady"/>
  <div class="broker-customer a-7-bd">
    <div class="broker-customer-header b-1-cl">
      <!-- 客户概况 -->
      {{ $t('brokerSystem.overview[8]') }}
    </div>
    <div class="broker-customer-content">
      <!-- 客户总量 (人) -->
      <div class="broker-customer-sum">
        <div class="broker-customer-sumV b-1-cl">{{countTotal}}</div>
        <div class="broker-customer-sumK">
          <!-- 客户总量 (人) -->
          {{ $t('brokerSystem.overview[9]') }}
        </div>
      </div>
      <div class="broker-customer-mess">
        <!-- 直客 (人) -->
        <div class="broker-customer-even a-4-bg clearfix">
          <span class="broker-customer-evenK">
            <!-- 直客 (人) -->
            {{ $t('brokerSystem.overview[10]') }}
          </span>
          <span class="broker-customer-evenV b-1-cl">{{ countCommon }}</span>
        </div>
        <!-- 子经纪 (人) -->
        <div class="broker-customer-even a-4-bg clearfix">
          <span class="broker-customer-evenK">
            <!-- 子经纪 (人) -->
            {{ $t('brokerSystem.overview[11]') }}
          </span>
          <span class="broker-customer-evenV b-1-cl">{{ countAgent }}</span>
        </div>
        <!-- 二级好友 (人) -->
        <div class="broker-customer-even a-4-bg clearfix"  v-if="scaleSecond">
          <span class="broker-customer-evenK">
            {{ $t('coBroker.text3') }}
          </span>
          <span class="broker-customer-evenV b-1-cl">{{ countTwo }}</span>
        </div>
      </div>
      <div class="broker-customer-sort a-3-bd clearfix">
        <!-- 昨日分成用户 (人) -->
        <div class="broker-customer-sortev">
          <div class="broker-customer-sortevV b-1-cl">{{countBonus}}</div>
          <div class="broker-customer-sortevK">
            <!-- 昨日分成用户 (人) -->
            {{ $t('brokerSystem.overview[12]') }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="broker-system">
    <div class="broker-system-header a-3-bd clearfix">
      <c-navTab
        activeClassName="b-1-cl"
        activeColor="a-12-bg"
        class="b-2-cl"
        :currentTab="currentTab"
        :navTab="navTab"
        :lineHeight="lineHeight"
        :marginRight="marginRight"
        @currentType="currentType"
      />
      <div class="update-time b-2-cl">{{$t('brokerSystem.updateTime')}}</div>
    </div>
    <c-table
      v-if="currentTab === 1"
      :loading="loading1"
      :columns="columns"
      :dataList="dataList"
      :colorMap="colorMap"
    />
    <c-table
      v-if="currentTab === 2"
      :loading="loading2"
      :columns="columns2"
      :dataList="dataList2"
      :colorMap="colorMap"
    />
  </div>
</section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/overview/overview';
import 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/overview/overview.styl';
import overviewChars from './overviewChars.vue';

export default {
  mixins: [mixin],
  components: { overviewChars },
  mounted() {
    this.init();
  },
};
</script>
