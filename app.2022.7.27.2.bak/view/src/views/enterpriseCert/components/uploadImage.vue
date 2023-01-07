<template>
  <div class="uploadImage">
    <ul class="upload-wrap">
      <li
        v-if="imageList.length < maxLength"
        class="upload-item v5-9-bg"
        :class="hover ? 'v5-1-bd' : 'v5-9-bd'"
        @click="upload"
        @mouseover="hover = true"
        @mouseout="hover = false">
        <svg class="icon icon-20" aria-hidden="true">
          <use xlink:href="#icon-v5_34"></use>
        </svg>
        <span class="v5-6-cl">{{$t('enterpriseCert.add')}}</span>
        <input
          type="file"
          ref="uploadFile"
          :accept="acceptType"
          @change="imageChange"/>
      </li>
      <li
        class="image-item v5-9-bg"
        v-for="(item, index) in imageList"
        :key="index">
        <img :src="item" alt="">
        <span class="delete-icon" @click="del(index)">
          <svg class="icon icon-16" aria-hidden="true">
            <use xlink:href="#icon-v5_32"></use>
          </svg>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import mixin from 'BlockChain-ui/PC/common-mixin/enterpriseCert/uploadImage/index';
import 'BlockChain-ui/PC/common-mixin/enterpriseCert/uploadImage/index.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
