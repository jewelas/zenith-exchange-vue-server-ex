<template>
  <c-dialog
    paddingBottom="40px"
    paddingTop="40px"
    :titleText="$t('reward.dialog.safety')"
    :confirmText="$t('reward.dialog.confirm')"
    :closeText="$t('reward.dialog.cancel')"
    :showFlag="showFlag"
    @close="handleClose"
    @confirm="jumpToKyc"
  >
    <div style="color: #000">{{$t('reward.dialog.kycInfo')}}</div>
  </c-dialog>
</template>

<script>
export default {
  name: 'KycDialog',
  props: {
    showFlag: { default: false, type: Boolean },
  },
  methods: {
    handleClose() {
      this.$emit('update:showFlag', false);
    },
    jumpToKyc() {
      this.$router.push({ path: 'personal/verificationCenter' });
    },
  },
};
</script>

<style lang="stylus" scoped>
* {
  box-sizing: border-box;
  font-family: 'DINPro';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
}

>>> .dialog-frame {
  background: #FFFFFF !important;
  border-radius: 5px;
}

>>> .dialog-frame-head {
  background: #F2F4FB !important;
  border-radius: 5px 5px 0 0;
}

>>> .dialog-frame-head-text {
  color: rgba(22, 24, 29, 1) !important;
}

>>> .common-button {
  background: rgba(39, 98, 255, 1) !important;
}

>>> .closeBtnClass {
  color: rgba(39, 98, 255, 1) !important;
  background: rgba(0, 0, 0, 0) !important;
}
</style>
