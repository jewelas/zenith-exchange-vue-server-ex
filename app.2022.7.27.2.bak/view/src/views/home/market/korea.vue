<template>
  <div class="korea-marker-container inter-tableContentBase">
    <div class="home-table">
      <div class="home-loading" v-if="tableLoading">
        <div class="loading-page">
          <c-loading size="45"/>
        </div>
      </div>
      <div v-else>
        <div class="home-tbody-box">
          <div class="tit">最新价格</div>
          <vue-scroll :ops="ops">
            <div class="home-tbody">
              <div>
                <ul class="home-tbody-list">
                  <li
                    class="home-tbody-li"
                    v-for="(item, index) in setTableData(tableData)"
                    :key="index"
                    @mouseenter="enter(`${index}`)"
                    @mouseleave="leave"
                  >
                    <!-- 币对 -->
                    <div class="even">
                      <span
                        v-html="item.data[0][1].iconSvg"
                        class="evenSymbol"
                        @click="bandLink(item.id)"
                      ></span>
                    </div>
                    <!-- 最新价 -->
                    <div class="even newPrice">
                      <p :class="[...item.data[2][0].classes]" class="price">
                        {{item.data[1][0].text}}
                      </p>
                    </div>
                    <!-- 涨跌幅 -->
                    <div class="even">
                      <div :class="[...item.data[2][0].classes]">
                        {{item.data[2][0].text}}
                      </div>
                    </div>
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
import mixin from 'BlockChain-ui/PC/common-mixin/home/market/korea/korea';
import 'BlockChain-ui/PC/common-mixin/home/market/korea/korea.styl';

export default {
  mixins: [commonMixin, mixin],
  created() {
    this.init();
  },
};
</script>
