<template>
  <div class="ex-broker">
    <div class="top-content" :style="backgroundImg">
      <div class="warp">
        <h2 class="page-title f-8-cl">
          <!-- 经纪人系统 -->
          {{$t('broker.broker')}}
        </h2>
        <div class="wk-info">
          <div class="item-box item-box-lefts">
            <div class="box-bar c-9-bd">
              <p class="name f-8-cl">
                {{bonusAmount}}
                <span class="dy">
                  {{bonusCoinName | getCoinShowName(coinList)}}
                </span>
              </p>
              <p class="txt f-9-cl">
                <!-- 本月总收入 -->
                {{$t('broker.revenue')}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="warp main-content">
      <div class="mining-data">
        <div class="mining-tit f-2-cl c-5-bd c-4-bg">
          <p class="viewTit f-1-cl">
            <!-- 返佣明细 -->
            {{$t('broker.returnDetails')}}
            <em class="f-2-cl">UID{{uid}}</em>
          </p>
          <div class="search">
            <!-- 导出文档 -->
            <!-- <c-buttons
              class="button"
              type = "text"
              marginTop= "2px"
              @click = "exportWord">
              {{$t('broker.export')}}
            </c-buttons> -->
          </div>
        </div>
        <div class="filter-box f-2-cl c-5-bd c-4-bg">
          <c-calendar
            width = "120px"
            name = "startTime"
            :value = "startTime"
            :promptText="startTimeText"
            @onChanges = "onChangeCalendar"
          />
          <c-calendar
            width = "120px"
            name = "endTime"
            :value = "endTime"
            :promptText="endTimeText"
            @onChanges = "onChangeCalendar"
          />
        </div>
        <c-table
          :imgMap="imgMap"
          :colorMap="colorMap"
          :columns = 'columns'
          :dataList = 'dataList'
          :loading = 'tableLoading'
          :bodyClasses = 'bodyClasses'
          :headClasses = 'headClasses'
        />
      </div>
      <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                    :total="pagination.count"
                    classes="c-4-bg"
                    :current-page='pagination.page'
                    :display='pagination.pageSize'
                    @pagechange="pagechange">
      </c-pagination>
    </div>


  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/broker/view/view';
import 'BlockChain-ui/PC/common-mixin/personal/broker/view/view.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
