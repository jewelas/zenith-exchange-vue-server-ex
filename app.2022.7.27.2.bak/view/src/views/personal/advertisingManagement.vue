<template>
    <div class="advertising-management fuz-card with-title">
      <div class="advertising-management-header fuz-card-tab">
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
      <div class="advertising-management-center">
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
          @elementClick = 'closeData'
        />
        <c-pagination v-show="count > 10"
                    :total="count"
                    :current-page='page'
                    :display='pageSize'
                    @pagechange="pagechange">
        </c-pagination>
      </div>
      <c-dialog :showFlag="dialogFlag"
              paddingBottom="14px"
              :confirmLoading="dialogConfirmLoading"
              :confirmDisabled="dialogConfirmDisabled"
              @close="dialogClose"
              @confirm="dialogConfirm"
              :titleText="titleText">
        <p class="dialog-p">{{$t('personal.dialog.closeAdPrompt')}}</p>
      </c-dialog>
    </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/advertisingManagement/advertisingManagement';
import 'BlockChain-ui/PC/common-mixin/personal/advertisingManagement/advertisingManagement.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
