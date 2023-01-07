<template>
  <section class="initQuestions">
    <div class="title f-1-cl a-3-bd">{{$t('questions.send')}}</div>
    <div class="content">
      <!-- 问题类型 -->
      <c-select :promptText="$t('questions.type')"
        :options="typeList"
        @onChanges='changeType'
        :value="type"/>
      <!-- 问题描述 -->
      <c-textAreaLine name='leavingText'
        maxLength="500"
        marginTop="20px"
        width="380px"
        :value="leavingText"
        :errorHave="true"
        @onchanges="inputLineChange"
        :warningText="`${leavingText.length}/500`"
        :promptText="$t('questions.mess')"/>
      <div class="uploadImg a-4-bg a-2-bd">
        <div class="uploadMark" v-if="!imgLoading">
          <div>
            <svg class="icon icon-24" aria-hidden="true">
              <use xlink:href="#icon-e_9"></use>
            </svg>
          </div>
          <p class="uploadMark-text u-8-cl">
            {{ imgUrl ? $t('questions.upload1') : $t('questions.upload2')}}
          </p>
          <p class="uploadMark-mess">{{ $t('questions.upload3') }}</p>
        </div>
        <div class="uploadLoading" v-else>
          <c-loading size="34"/>
          <p class="uploadMark-text u-8-cl">{{ $t('questions.upload4') }}</p>
        </div>
        <c-oldUploadFile
          className="upload_file"
          name="questionsImg"
          url="common/upload_img"
          :isOpenUploadImg="isOpenUploadImg"
          :expand= []
          :imageType="imageType"
          @tellMessage="onChangeFileFun"
          @uploadFinish="uploadFinish">
        </c-oldUploadFile>
        <div class="b-2-bg imgmk" v-if="imgUrl.length"></div>
        <img v-if="imgUrl.length"
         :src="imgUrl" alt="" class="upload-image">
      </div>
      <c-button
        marginTop="40px"
        height="40px"
        @click="submit"
        :disabled="buttonDisabled"
        :loading="buttonLoading"
        paddingW="32px">{{ $t('questions.summit') }}</c-button>
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/problemCenter/initQuestions/initQuestions';
import 'BlockChain-ui/PC/common-mixin/problemCenter/initQuestions/initQuestions.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
