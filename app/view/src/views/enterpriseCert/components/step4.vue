<template>
  <div class="enterpriseCert-relation">
    <h3 class="step-title v5-5-cl">{{$t('enterpriseCert.item4')}}</h3>
    <ul class="list-wrap">
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">{{$t('enterpriseCert.general')}}</h6>
         <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.uploadTip')}}</div>
         <UploadImage
          name="generalList"
          :list="generalList"
          @delete="deleteImg"
          @change="imageChange"/>
      </li>
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">{{$t('enterpriseCert.limited')}}</h6>
         <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.uploadTip')}}</div>
         <UploadImage
          name="limitedList"
          :list="limitedList"
          @delete="deleteImg"
          @change="imageChange"/>
      </li>
      <li class="list-item">
        <h6 class="list-item_title v5-5-cl">{{$t('enterpriseCert.auth')}}</h6>
         <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.traderTip1')}}</div>
         <div class="list-item_tip v5-6-cl">{{$t('enterpriseCert.traderTip2')}}</div>
         <UploadImage
          name="traderList"
          :list="traderList"
          @delete="deleteImg"
          @change="imageChange"/>
      </li>
    </ul>
    <div class="warn-tip v5-9-bg">
      <div>
        <img src="http://dev-saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220228142427735.png" alt="" />
        <span class="v5-5-cl">{{$t('enterpriseCert.warn')}}:</span>
      </div>
      <ul class="warn-list v5-7-cl">
        <li class="warn-item">{{$t('enterpriseCert.warnTip1')}}</li>
        <li class="warn-item">{{$t('enterpriseCert.warnTip2')}}</li>
        <li class="warn-item">{{$t('enterpriseCert.warnTip3')}}</li>
      </ul>
    </div>
    <div class="enterpriseCert-footer">
      <div>
        <c-v5-button
          type="solid"
          width="150px"
          height="40px"
          paddingW="0"
          :disabled="btnDisabled"
          @click="next"
        >{{$t('enterpriseCert.next')}}</c-v5-button>
        <span
          class="save-draft v5-1-cl"
          @click="saveDraft">{{$t('enterpriseCert.saveDraft')}}</span>
      </div>
      <span
        class="previous v5-6-cl"
        @click="previous">
        <svg class="icon icon-12" aria-hidden="true">
          <use xlink:href="#icon-v5_3"></use>
        </svg>{{$t('enterpriseCert.previous')}}
      </span>
    </div>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/enterpriseCert/step4/index';
import 'BlockChain-ui/PC/common-mixin/enterpriseCert/step4/index.styl';
import uploadImage from './uploadImage.vue';

export default {
  mixins: [mixin],
  components: {
    UploadImage: uploadImage,
  },
  mounted() {
    this.init();
  },
};
</script>
