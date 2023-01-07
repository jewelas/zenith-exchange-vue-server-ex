<template>
  <section class="page-b2cAddressMent">
    <!-- 添加提现账户 -->
    <header class="addressMent-header b-1-cl a-3-bd">
      {{ $t('assets.b2c.addressAddTit') }}
    </header>
    <div class="addressBox clearfix a-7-bd">
      <c-button width="120px"
          height="40px"
          @click="addressBtnClick">{{ $t('assets.addressMent.add') }}</c-button>
    </div>
    <header class="addressMent-header b-1-cl a-3-bd">
      <!-- 账户列表 -->
      {{ $t('assets.b2c.addressListTit') }}
    </header>
    <div class="addressMent-table">
      <c-table
        :colorMap="colorMap"
        :loading="tabelLoading"
        :columns="columns"
        :dataList="tableList"
        @elementClick="tableClick"
      />
      <c-pagination v-if="paginationObj.total > paginationObj.display"
        :total='paginationObj.total'
        :display='paginationObj.display'
        :currentPage='paginationObj.currentPage'
        @pagechange="pagechange"/>
    </div>
    <c-dialog :showFlag="delFlag"
      paddingBottom="14px"
      :confirmLoading="confirmLoading"
      @close="delClose"
      @confirm="delConfirm"
      :titleText="$t('assets.b2c.warning')">
      <span>{{ $t('assets.b2c.deleteWarn') }}</span>
    </c-dialog>
    <c-verifyCationc-alert :showFlag="alertFlag"
      :imgMap="imgMap"
      :titleText="$t('assets.withdraw.safetyWarning')"
      :detaText="authTitleText"
      :dataList="alertData"
      :buttonText="$t('assets.withdraw.GotoOpen')"
      :haveClose="false"
      @close="alertClone"
      @confirm="alertGo"/>
  </section>
</template>
<script>
import b2cMixin from 'BlockChain-ui/PC/common-mixin/assets/b2cMixin/b2cMixin';
import mixin from 'BlockChain-ui/PC/common-mixin/assets/b2cAddressMent/b2cAddressMent';
import 'BlockChain-ui/PC/common-mixin/assets/b2cAddressMent/b2cAddressMent.styl';

export default {
  mixins: [b2cMixin, mixin],
  mounted() {
    this.init();
  },
};
</script>
