<template>
    <div class="fiatdeal-center">
      <div class="center-management-header clearfix fuz-card-tab">
        <c-navTab
          activeClassName="b-1-cl"
          activeColor="a-12-bg"
          className="b-2-cl"
          :currentTab="currentTab"
          :navTab="navTab"
          :lineHeight="lineHeight"
          :marginRight="marginRight"
          @currentType="currentType"
        />
      </div>
      <div class="center-management-center">
        <!-- <div class="center-header a-3-bd clearfix">
          <div class="center-header-left clearfix">
            <span class="title b-1-cl">{{defaultCoin}}</span>
            <p class="data-main b-1-cl">{{lastPrice}}
              {{otcDefaultPaycoin}}
              <span v-show="roseColor === 0">{{rose | roseFilter}}%</span>
              <span v-show="roseColor === 1" class="b-5-cl">+{{rose | roseFilter}}%</span>
              <span v-show="roseColor === 2" class="b-6-cl">{{rose | roseFilter}}%</span>
            </p>
            <p class="text b-2-cl">{{$t('fiatdeal.center.header.text')}}
              {{avgPrice}} {{otcDefaultPaycoin}}</p>
          </div>
          <div class="center-header-right clearfix">
            <Charts key="klineDataList"
                    :dataList = "klineDataList"
                    name= "klineDataList"
                    height="94px"/>
          </div>
        </div> -->
        <mobilityTrade
          v-if="isShowMobility"
          :seach="side"
          :legal="value2"
          :coin="defaultCoin"/>
        <div class="center-main clearfix">
          <div class="center-main-select clearfix">
            <div class="select">
              <c-select
                :value="value1"
                :promptText="$t('fiatdeal.center.country')"
                @onChanges='listChange'
                name="value1"
                :errorHave="true"
                :errorFlag="countryErrorFlag"
                errorText=""
                :options="list1Copy"
              />
            </div>
            <div class="select" :style="excheifFlag ? 'width:140px' : 'width:120px'">
              <c-select
                :value="value3"
                :promptText="$t('fiatdeal.center.payment')"
                @onChanges='listChange'
                name="value3"
                :errorHave="true"
                :errorFlag="countryErrorFlag"
                errorText=''
                :options="list3Copy"
              />
            </div>
            <div class="select" v-if="paycoinsType === 1">
              <c-select
                :value="value2"
                :promptText="
                  !fiatTradeOpen ? $t('fiatdeal.center.fiat')
                  : $t('assets.b2c.otcShow.lagel')
                "
                @onChanges='listChange'
                name="value2"
                :errorHave="true"
                :errorFlag="countryErrorFlag"
                errorText=""
                :options="list2"
              />
            </div>
            <div class="select select-pay" v-if="paycoinsType === 2">
              <div class="input_line_content a-2-bd">
                <label class="input_line_prompt b-2-cl">{{$t('fiatdeal.center.fiat')}}</label>
                <p class="payTypeList">
                  <template v-for="(v, key) in currencyListShow">
                    <span
                      @click="changKinde(v)"
                      class="u-11-cl"
                      :key='key + "currencyShow"'
                      :class="{'u-12-bg': value2 === v.code}"
                    >
                      {{v.value}}
                    </span>
                  </template>
                  <template v-for="(v, key) in currencyListHide">
                    <span
                      v-if="showMore"
                      @click="changKinde(v)"
                      class="u-11-cl"
                      :key='key + "currencyHide"'
                      :class="{'u-12-bg': value2 === v.code}"
                    >
                      {{v.value}}
                    </span>
                  </template>
                  <span @click="showKinde()" class="u-8-cl">
                    {{openOTxt}}
                  </span>
                </p>
              </div>
            </div>
            <p class="fiatdeal-xyk" v-if="middlemanConfigOpen">
              <img src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200429141529768.svg">
              <img src="https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200429142925574.svg">
              <router-link class="x-3-cl" tag="span" to="/creditCard">
                {{ $t('creditCard.title') }}
              </router-link>
            </p>
          </div>
          <c-table
            :imgMap="imgMap"
            :colorMap="colorMap"
            :classes = 'classes'
            :loading = 'loading'
            :headClasses = 'headClasses'
            :bodyClasses =  'bodyClasses'
            :lineClasses = 'lineClass'
            :columns = "columns"
            :dataList = "dataList"
            :lineNumber = 'lineNumber'
            :cellHeight = 'cellHeight'
            :headHeight = 'headHeight'
            @elementClick = 'operation'
          />
          <c-pagination v-show="count > 15"
                      :total="count"
                      :current-page='page'
                      :display='pageSize'
                      class="a-5-bg"
                      @pagechange="pagechange">
          </c-pagination>
        </div>
      </div>
      <!-- 提示框 -->
      <c-alert :showFlag="alertFlag"
             :buttonText="this.$t('personal.alert.buttonOpen')"
             :imgMap="imgMap"
             :colorMap="colorMap"
             @close="alertClose"
             @confirm="alertGo">
        <div class="alertText">{{tradeTypeErrorText}}</div>
      </c-alert>
    </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/fiatdeal/center/center';
import 'BlockChain-ui/PC/common-mixin/fiatdeal/center/center.styl';
// import Charts from '@/views/home/charts/china.vue';
import mobilityTrade from './mobilityTrade.vue';

export default {
  mixins: [mixin],
  components: {
    // Charts,
    mobilityTrade,
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.center-management-header >>> .activeLine{
  transform: translate(-50%, -2px) !important;
}
</style>
