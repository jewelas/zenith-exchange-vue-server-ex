<template>
    <div
      class="order-list-box a-6-bg"
      :class="{'fc-order-list-box' : is_more_position === 1}">
      <div class="tab-box a-3-bd e-2-cl a-21-bg">
        <span
          class="tab-item"
          v-for="(item, index) in tabTypeItem"
          :key="index + 'tab'"
          @click="switchType(index)"
          :class="{'selected b-1-cl a-12-bd': orderType === index}">
            {{item}}
        </span>
      </div>
      <div class="order-conent">
        <vue-scroll>
          <c-table
            :columns = 'columns'
            :imgMap="imgMap"
            :colorMap="colorMap"
            :dataList = 'dataList'
            :loading = 'tableLoading'
            :cellHeight = 'cellHeight'
            @elementClick = "elementClick"
            @lineClick = "lineClickEveent"
            :bodyClasses = 'bodyClasses'
           />
        </vue-scroll>
      </div>
       <c-pagination v-if="(pagination.count/pagination.pageSize) > 1"
                :total="pagination.count"
                classes="a-6-bg"
                :current-page='pagination.page'
                :display='pagination.pageSize'
                @pagechange="pagechange">
        </c-pagination>
        <c-dialog
          :showFlag="isShowDialog"
          paddingBottom="14px"
          :confirmDisabled = "confirmDisabled"
          @close="dialogClose"
          @confirm="dialogConfirm"
          :titleText="confirmFormTitle">
          <div class="form-info">
            <div class="info-item a-4-bg">
              <div class="radio">
                <span class="b-1-cl" @click="setReviseType('Add')">
                  <c-redio :value="marginReviseType === 'Add'" />
                  <!-- 增加保证金 -->
                  {{$t('contract.addEnsure')}}
                </span>
                <span class="b-1-cl" @click="setReviseType('Minus')">
                  <c-redio :value="marginReviseType === 'Minus'" />
                  <!-- 减少保证金 -->
                  {{$t('contract.minusEnsure')}}
                </span>
              </div>
            </div>
            <div class="info-item a-4-bg">
              <p class="text1">
              <!-- 仓位数量 -->
              {{$t('contract.coNumber')}}
              </p>
              <p class="text2 b-1-cl">
                {{currentOrder.volume}}
                <!-- 张合约 -->
                {{$t('contract.piece')}}{{$t('contract.co')}}
                ({{currentOrder.leverageLevel}}X)
              </p>
            </div>
            <div class="info-item a-4-bg">
              <p class="text1">
                <!-- 已分配保证金 -->
                {{$t('contract.fqEnsure')}}
              </p>
              <p class="text2 b-1-cl">
                {{currentOrder.usedMargin}} BTC
              </p>
            </div>
            <div class="info-item a-4-bg">
              <p class="text1">
                <!-- 可用保证金 -->
                {{$t('contract.kyEnsure')}}
              </p>
              <p class="text2 b-1-cl">
                {{currentOrder.canUseMargin}} BTC
              </p>
            </div>
          </div>
          <div class="inline-input">
            <c-inputLine
              name="marginValue"
              :value="marginValue"
              :promptText="marginPromptText"
              :errorHave="true"
              :errorText="marginErrorText"
              :errorFlag="marginErrorFlag"
              @onchanges="inputChanges">
              <!-- 获取验证码 -->
              <i>BTC</i>
            </c-inputLine>
          </div>
        </c-dialog>
    </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/coTrade/orderList/orderList';
import 'BlockChain-ui/PC/common-mixin/modules/coTrade/orderList/orderList.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
  // 组件离开前执行
  beforeDestroy() {
    clearInterval(this.getDataInter);
  },
};
</script>
<style scoped>
  .table-head th, .table-head td, .table-body td {
    padding:0 !important;
    font-size: 12px !important;
  }
  .order-content .table-head {
    background: #000 !important;
  }
</style>
