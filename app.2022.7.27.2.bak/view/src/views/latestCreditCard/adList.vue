<template>
    <section class="myad">
        <div class="myad-box">
            <div class="myad-tabAndsearch">
                <div  class="tab-left fuz-button-group black-background">
                    <div
                    class="tab-left-buy v5-5-cl"
                    @click="currentType('sell')"
                    :class="{'active': this.currentTab === 'sell'}">{{ $t('newOtc.text85') }}</div>
                    <div
                    class="tab-left-sell"
                    @click="currentType('buy')"
                    :class="{'active': this.currentTab === 'buy'}">{{ $t('newOtc.text86') }}</div>
                </div>
                <div class="search-right">
                    <c-v5-button
                    type="solid"
                    height="50px"
                    paddingW="18px"
                    :defaultColorClass="colorList_1[0]"
                    :hoverColorClass="colorList_1[1]"
                    :activeColorClass="colorList_1[2]"
                    @click="goOtcRelease()">
                    <!-- 发布广告 -->
                    {{ $t('newOtc.text87') }}
                    </c-v5-button>
                </div>
            </div>
            <div  class="myad-dataTable fuz-card">
                <c-table
                    :imgMap="imgMap"
                    :colorMap="colorMap"
                    :loading ='loading'
                    :columns ="columns"
                    @elementClick = 'closeData'
                    :dataList="dataList"
                    :classes="'v5-10-bg v5-table'"
                    :lineClassesHover="'v5-9-bg'"
                    :lineClasses ="'v5-12-bd'"
                    :headClasses = 'headClasses'
                    :bodyClasses = 'bodyClasses'
                    :cellHeight = '60'
                    :headHeight = '0'
                >
                </c-table>
                <c-v5-pagination v-show="count > 15"
                            :total="count"
                            :currentPage='page'
                            :display='pageSize'
                            @pagechange="pagechange">
                </c-v5-pagination>
            </div>
        </div>
      <c-v5-dialog :showFlag="dialogFlag"
              paddingBottom="14px"
              :confirmLoading="dialogConfirmLoading"
              :confirmDisabled="dialogConfirmDisabled"
              @close="dialogClose"
              @confirm="dialogConfirm"
              :titleText="titleText">
        <p class="dialog-p">{{$t('personal.dialog.closeAdPrompt')}}</p>
      </c-v5-dialog>
    </section>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/newOtc/myAd/index';
import 'BlockChain-ui/PC/common-mixin/newOtc/myAd/index.styl';


export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  components: {

  },
};
</script>
<style scoped>
.myad-box {
  width: 1280px;
}
</style>
