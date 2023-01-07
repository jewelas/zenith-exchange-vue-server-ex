<template>
  <div class="invite-modal" :v-show="showInviteFlag">
    <c-dialog
      width="auto"
      :showFlag="showInviteFlag"
      :haveOption="false"
      @close="changeFlag(false)"
      class="invite-modal"
    >
      <div class="modal-content" style="padding: 0; margin: auto" ref="modalRef">
        <div style="width: 400px; height: 560px">
          <div class="change-img">
            <div class="left" v-show="posterImgData.length > 1">
              <img
                @click="changeNext('left')"
                v-if="imgIndex"
                src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608200734995.svg"
                alt=""
              />
              <img v-else src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608200751489.svg" alt="" />
            </div>
            <div class="center" id="center-img">
              <div class="img">
                <img :src="posterImgData[imgIndex] + '?t=' + Date.now()" crossorigin="anonymous" />
              </div>
              <div class="info">
                <div class="contact">
                  <p>{{ contactNum }}</p>
                  <div>
                    {{ $t("invitePrize.modalInvite_textInfo", { company: companyName }) }}
                  </div>
                </div>
                <div class="code"><img :src="codeImg" alt="" /></div>
              </div>
            </div>
            <div class="right" v-show="posterImgData.length > 1">
              <img
                v-if="!imgIndex"
                @click="changeNext('right')"
                src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608200829600.svg"
                alt=""
              />
              <img v-else src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608200840495.svg" alt="" />
            </div>
          </div>
          <div class="download-btn">
            <c-button width="400px" height="40px" type="solid" @click="downLoadImg()"
              ><div class="down-slot-div">
                <img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220608200959416.svg" width="16px" />{{
                  $t("invitePrize.download")
                }}
              </div></c-button
            >
          </div>
        </div>
      </div>
    </c-dialog>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/promotion/invite/invite';
import 'BlockChain-ui/PC/common-mixin/promotion/invite/invite.styl';

export default {
  mixins: [mixin],
  props: {
    showInviteFlag: { default: false, type: Boolean },
  },
  mounted() {
    this.init();
  },
  methods: {
    resize() {
      const pWidth = this.$refs.modalRef.parentNode.clientWidth - 80;
      const pHeight = this.$refs.modalRef.parentNode.clientHeight - 80;
      const a = pWidth / 400;
      const b = pHeight / 560;
      const c = Math.min(a, b);
      this.$refs.modalRef.children[0].style.transform = `scale(${c})`;
      this.$refs.modalRef.children[0].style.transformOrigin = '0 0';
      this.$refs.modalRef.style.width = `${400 * c}px`;
      this.$refs.modalRef.style.height = `${560 * c}px`;
      this.$refs.modalRef.style.overflow = 'hidden';
    },
  },
  watch: {
    showInviteFlag(v) {
      if (v) {
        this.$nextTick(() => this.resize());
      }
    },
  },
};
</script>
<style scoped>
.invite-modal >>> .common-dialog .dialog-frame {
  width: auto;
  background: transparent !important;
}
.invite-modal >>> .dialog-frame-body {
  padding: 40px;
}
</style>
