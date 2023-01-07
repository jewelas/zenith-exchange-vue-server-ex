<template>
    <section class="page-toloanOrder">
        <div class="toloanOrder-nav a-3-bd">
            <c-navTab
                activeClassName="b-1-cl"
                activeColor="a-12-bg"
                className="b-2-cl"
                :currentTab="nowType"
                :navTab="navTab"
                lineHeight="55"
                @currentType="currentType"
            />
        </div>
        <toLoanHis v-if="nowType === 1"
          :borrowSymbolObj="borrowSymbolObj"
          :baseReady="baseReady"/>
        <paymentHis v-if="nowType === 2"
          :borrowSymbolObj="borrowSymbolObj"
          :baseReady="baseReady"/>
        <pledgeRate v-if="nowType === 3"
          :borrowSymbolObj="borrowSymbolObj"
          :baseReady="baseReady"/>
        <closeHis v-if="nowType === 4"
          :borrowSymbolObj="borrowSymbolObj"
          :baseReady="baseReady"/>
    </section>
</template>

<script>
import toLoanHis from './toLoanHis.vue'; // 借贷记录
import paymentHis from './paymentHis.vue'; // 还款记录
import pledgeRate from './pledgeRate.vue'; // 质押率
import closeHis from './closeHis.vue'; // 平仓纪录


export default {
  components: {
    toLoanHis,
    paymentHis,
    pledgeRate,
    closeHis,
  },
  data() {
    return {
      nowType: 1,
      borrowSymbolObj: {},
      baseReady: false,
    };
  },
  created() {
    this.getBaseDate();
  },
  computed: {
    navTab() {
      return [
        // 借贷记录
        { name: this.$t('broToloan.common.tab1'), index: 1 },
        // 还款记录
        { name: this.$t('broToloan.common.tab2'), index: 2 },
        // 质押率调整记录
        { name: this.$t('broToloan.common.tab3'), index: 3 },
        // 平仓记录
        { name: this.$t('broToloan.common.tab4'), index: 4 },
      ];
    },
  },
  methods: {
    getBaseDate() {
      this.axios({
        url: '/noToken/borrow/get_base_config',
        headers: {},
        params: {},
        hostType: 'fe-increment-api',
        method: 'post',
      }).then((data) => {
        if (data.code === 0) {
          const borrowSymbolObj = {};
          data.data.projectList.forEach((item) => {
            // borrowSymbolList.push({
            //   value: item.coinSymbol,
            //   code: item.showName,
            //   fix: item.showPrecision
            // });
            borrowSymbolObj[item.borrowSymbol + item.mortgageSymbol] = {
              showPrecision: item.borrowSymbolScale,
            };
          });
          this.borrowSymbolObj = borrowSymbolObj;
          this.baseReady = true;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    currentType(item) {
      if (this.nowType === item.index) { return; }
      this.nowType = item.index;
      // this.paginationObj.currentPage = 1; // 页码
      // this.paginationObj.total = 0; // 总条数
      // this.tabelList = [];
      // this.tabelLoading = true;
      // this.clearSub();
      // this.getData();
    },
  },
};
</script>

<style lang="stylus" scoped>
.page-toloanOrder {
  .toloanOrder-nav {
    height: 55px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    position: relative;
    padding-left: 32px;
  }
}
</style>
