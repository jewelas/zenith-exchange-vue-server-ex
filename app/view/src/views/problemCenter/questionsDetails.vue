<template>
  <section class="questionsDetails">
    <div class="title f-1-cl a-3-bd">{{ $t('questions.details') }}</div>
    <div class="content">
      <div class="message clearfix" style="height: 40px;">
        <div class="message-even">
          <!-- 提问时间 -->
          <div class="message-even-title">{{$t('questions.list1')}}</div>
          <div class="message-even-text f-1-cl">{{ rqInfoData.ctime | setTime }}</div>
        </div>
        <div class="message-even">
          <!-- 类型 -->
          <div class="message-even-title">{{$t('questions.list3')}}</div>
          <div class="message-even-text f-1-cl">{{ rqInfoData.rqTypeName || '--' }}</div>
        </div>
      </div>
      <div class="message clearfix" style="height: 40px;">
        <div class="message-even">
          <!-- 编号 -->
          <div class="message-even-title">{{$t('questions.list2')}}</div>
          <div class="message-even-text f-1-cl">{{ rqInfoData.id || '--' }}</div>
        </div>
        <div class="message-even">
          <!-- 状态 -->
          <div class="message-even-title">{{$t('questions.list5')}}</div>
          <div class="message-even-text f-1-cl">
            {{ rqInfoData.rqStatusName || '--' }}
          </div>
        </div>
      </div>
      <div class="message clearfix">
        <div class="message-even">
          <!-- 描述 -->
          <div class="message-even-title">{{$t('questions.list4')}}</div>
          <div class="message-even-text message-even-mess  f-1-cl">
            {{ rqInfoData.rqDescribe || '--' }}
            </div>
        </div>
      </div>
      <div class="message clearfix" v-if="rqInfoData.imageDataStr">
        <div class="message-even">
          <!-- 附件 -->
          <div class="message-even-title">{{$t('questions.fj')}}</div>
          <div class="message-even-imgBox a-2-bd">
            <img :src="rqInfoData.imageDataStr" alt="">
          </div>
        </div>
      </div>
      <div style="width: 380px">
        <c-textAreaLine v-for="(item, index) in reInfoList"
          marginTop="20px"
          :key="index"
          :disabled="true"
          :errorHave="true"
          :value="item.replayContent"
          :warningText="item.ctime | setTime"
          :promptText="item.userType === 1
            ? $t('questions.sendType1')
            : $t('questions.sendType2')"/>
        <c-textAreaLine
          :value="sendText"
          maxLength="1000"
          marginTop="20px"
          @onchanges="inputLineChange"
          :errorHave="true"
          :warningText="`${sendText.length}/1000`"
          :promptText="$t('questions.typeSend')"/>
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
import mixin from 'BlockChain-ui/PC/common-mixin/problemCenter/questionsDetails/questionsDetails';
import 'BlockChain-ui/PC/common-mixin/problemCenter/questionsDetails/questionsDetails.styl';

export default {
  mixins: [mixin],
  mounted() {
    this.init();
  },
};
</script>
