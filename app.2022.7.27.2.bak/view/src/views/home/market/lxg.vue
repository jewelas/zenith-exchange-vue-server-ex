<template>
  <div
    class="inter-tableContentBase lxg-market-container inter-tableContent"
  >
    <div class="market-table">
      <div class="lxg-title-block">
        <!-- <ul class="market-title f-2-cl" ref="marketUl">
          <li
            class="borderRadius "
            :class="{ 'selected u-16-cl c-8-bg': 'myMarket' === marketCurrent }"
            @click="switchMarket('myMarket')"
          >
            {{ $t("home.marketSet") }}
          </li>
          <li
            v-for="(item, index) in marketAllList"
            :key="index"
            :class="{ 'selected u-16-cl c-8-bg': marketCurrent === item }"
            @click="switchMarket(item)"
          >
            {{ item | getCoinShowName(coinList) }}
          </li>
        </ul> -->
        <span
          class="tab"
          v-if="headerSymbol.length"
          :class="{'active': activeBlock === 'host'}"
          @click="wsActiveBlock('host')">
          <!-- 热门推荐 -->
          {{$t('home.hot')}}
        </span>
        <template v-for="(sitwm, indexs) in tableData">
          <span
          :key="indexs"
          class="tab"
          :class="{'active': activeBlock === indexs}"
          @click="wsActiveBlock(indexs)"
          v-if="Object.keys(tableData).length > 1 && !listfilter" >
            {{ sitwm.title }}
          </span>
        </template>
        <div class="checkAll-btn" @click="goTrade">
          <span>
            <!-- 全部币种 -->
            {{$t('home.allSymbol')}}
          </span>
        </div>
      </div>
      <Recommend
        v-if="headerSymbol.length && activeBlock === 'host'"
        :dataList="recommendDataList"/>
      <div v-else class="home-table">
        <ul class="home-thead">
          <li v-for="(item, index) in columns" :key="index" :class="'item' + index">
            <span
              class="thead-label"
              :class="item.sortable ? 'sortable' : ''"
              @click="sort(item)"
            >
              {{ item.title }}
              <svg v-if="item.sortable" aria-hidden="true" class="icon icon-14">
                <!-- #icon-a_17 -->
                <use xlink :href="item.key | sortIcon(sortValue, sortSell)"></use>
              </svg>
            </span>
          </li>
        </ul>
        <div class="home-loading" v-if="tableLoading">
          <div class="loading-page">
            <c-loading size="45" />
          </div>
        </div>
        <div v-else>
          <div class="home-nodata" v-if="!tableData.length">
            <svg class="icon icon-50" aria-hidden="true">
              <use xlink:href="#icon-g_2"></use>
            </svg>
            <p>
              <!-- 暂无数据 -->
              {{ $t("common.notData") }}
            </p>
          </div>
          <div v-else class="home-tbody-box">
            <vue-scroll :ops="ops">
              <template v-for="(Fitem, Findex) in tableData">
              <div
                v-if="activeBlock === Findex"
                class="home-tbody"
                :key="Findex">
                <ul class="home-tbody-list">
                  <li
                    class="home-tbody-li"
                    v-for="(item, index) in Fitem.data"
                    :class="lineClassesH(`${Findex}-${index}`)"
                    :key="index"
                    @mouseenter="enter(`${Findex}-${index}`)"
                    @mouseleave="leave">
                    <!-- 币对 -->
                    <div class="even even-market item0">
                      <span
                        v-html="item.data[0][0].iconSvg"
                        class="marketIcon"
                        @click="marketClick(item.id)"
                      ></span>
                      <span class="symbol-icon">
                        <img :src="symbolIcon(item)" alt="">
                      </span>
                      <span
                        v-html="syyshowName(item.showName)"
                        class="evenSymbol"
                        @click="bandLink(item.id, item.etfOpen)"
                      ></span>
                    </div>
                    <!-- 最新价 -->
                    <div class="even newPrice item1">
                      <p class="price">{{ item.data[1][0].text }}</p>
                      <p class="b-2-cl">
                        {{ item.data[1][0].subContent.text }}
                      </p>
                    </div>
                    <!-- 涨跌幅 -->
                    <div class="even item2">
                      <div :class="[...item.data[2][0].classes]">
                        {{ item.data[2][0].text }}
                      </div>
                    </div>

                    <div class="even item3">
                        <Charts :key="item.id + index" :dataList="klineDataList[item.id]"
                                :name="item.id + index"
                                height="25px"
                                lineWidth = "1"
                                :haveBg="false"
                                klineColor="#9CA1C2"></Charts>
                      </div>

                    <div class="even item4">{{ item.data[3][0].text }}</div>
                    <div class="even item5">{{ item.data[4][0].text }}</div>
                    <div class="even item6">{{ item.data[5][0].text }}</div>
                    <div class="even item7">{{ item.data[6][0].text }}</div>
                  </li>
                </ul>
              </div>
              </template>

            </vue-scroll>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import commonMixinHome from 'BlockChain-ui/PC/common-mixin/home/home/home';
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/market/market';
import mixin from 'BlockChain-ui/PC/common-mixin/home/market/lxg/lxg';
import 'BlockChain-ui/PC/common-mixin/home/market/lxg/lxg.styl';
import Recommend from '../recommend/lxg.vue';
import Charts from '../charts/china.vue';

export default {
  mixins: [commonMixinHome, commonMixin, mixin],
  components: {
    Recommend,
    Charts,
  },
  created() {
    this.initLxg();
    this.init();
  },
};
</script>
