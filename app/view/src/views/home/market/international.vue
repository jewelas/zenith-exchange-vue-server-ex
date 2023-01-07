<template>
  <div
    class="c-2-bg inter-tableContentBase international-market-container"
    :class="index_international_open === 1 ? '' : 'inter-tableContent'"
  >
    <div class="market-title-box c-5-bd c-2-bg">
      <ul class="market-title f-2-cl" ref="marketUl">
        <li
          class="c-8-bd"
          :class="{ 'selected f-1-cl': 'myMarket' === marketCurrent }"
          @click="switchMarket('myMarket')"
        >
          {{ $t("home.marketSet") }}
        </li>
        <li
          v-for="(item, index) in marketAllList"
          :key="index"
          :class="{ 'selected f-1-cl': marketCurrent === item }"
          @click="switchMarket(item)"
          class="a-12-bd"
        >
          {{ item | getCoinShowName(coinList) }}
        </li>
      </ul>
      <div class="search c-4-bg">
        <i class="icon-serach f-2-cl">
          <svg class="icon icon-14" aria-hidden="true">
            <use xlink:href="#icon-a_12"></use>
          </svg>
        </i>
        <input
          v-model="listfilter"
          ref="serachInp"
          class="search-input f-2-cl"
          type="text"
          :placeholder="$t('home.searchSy')"
        />
      </div>
    </div>
    <div class="home-table">
      <ul class="home-thead c-5-bd c-2-bg">
        <li v-for="(item, index) in columns" :key="index">
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
        <div
          v-else
          :style="{ height: tableHeight + 'px' }"
          class="home-tbody-box"
        >
          <vue-scroll :ops="ops">
            <div
              class="home-tbody"
              v-for="(Fitem, Findex) in tableData"
              :key="Findex"
            >
              <div>
                <div
                  class="home-tbody-title c-5-bd c-2-bg"
                  v-if="Object.keys(tableData).length > 1 && !listfilter"
                >
                  <span class="lable c-5-bd">{{ Fitem.title }}</span>
                </div>
                <ul class="home-tbody-list">
                  <li
                    class="home-tbody-li c-5-bd f-1-cl"
                    v-for="(item, index) in Fitem.data"
                    :class="lineClassesH(`${Findex}-${index}`)"
                    :key="index"
                    @mouseenter="enter(`${Findex}-${index}`)"
                    @mouseleave="leave"
                  >
                    <!-- 币对 -->
                    <div class="even">
                      <span
                        v-html="item.data[0][0].iconSvg"
                        class="marketIcon"
                        @click="marketClick(item.id)"
                      ></span>
                      <span
                        v-html="item.data[0][1].iconSvg"
                        class="evenSymbol"
                        @click="bandLink(item.id, item.etfOpen)"
                      ></span>
                      <span v-if="item.etfOpen && marketCurrent!=='ETF'"
                        class="eft-class u-8-bd u-8-cl">ETF</span>
                    </div>
                    <!-- 最新价 -->
                    <div class="even newPrice">
                      <p class="price">{{ item.data[1][0].text }}</p>
                      <p class="b-2-cl">
                        {{ item.data[1][0].subContent.text }}
                      </p>
                    </div>
                    <!-- 涨跌幅 -->
                    <div class="even">
                      <div :class="[...item.data[2][0].classes]">
                        {{ item.data[2][0].text }}
                      </div>
                    </div>
                    <div class="even">{{ item.data[3][0].text }}</div>
                    <div class="even">{{ item.data[4][0].text }}</div>
                    <div class="even">{{ item.data[5][0].text }}</div>
                    <div class="even">{{ item.data[6][0].text }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </vue-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixin from 'BlockChain-ui/PC/common-mixin/home/market/market';
import mixin from 'BlockChain-ui/PC/common-mixin/home/market/international/international';
import 'BlockChain-ui/PC/common-mixin/home/market/international/international.styl';

export default {
  mixins: [commonMixin, mixin],
  created() {
    this.init();
  },
};
</script>
