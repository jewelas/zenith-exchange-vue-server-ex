<template>
  <div class="invite-system">
    <p class="user-management-child-header b-1-cl a-3-bd">{{$t('brokerSystem.invite[0]')}}</p>
    <div class="invite-system-cont a-3-bd">
      <div class="invite-system-contl b-1-cl">{{$t('personal.label.inviteUrl')}}</div>
      <div class="invite-system-contr">
        <div class="url b-1-cl">
          <span>{{inviteUrl}}</span>
          <c-button
            marginTop="-11px"
            class="b-4-cl copy"
            type="text"
            @click="copy">
            {{$t('brokerSystem.otherText[2]')}}
        </c-button>
        </div>
        <div class="info b-2-cl">{{$t('brokerSystem.inviteInfo[0]')}}</div>
      </div>
    </div>
    <!-- <div class="invite-system-cont a-3-bd fill">
      <div class="invite-system-contl b-1-cl">{{$t('brokerSystem.inviteStyle[1]')}}</div>
      <div class="invite-system-contr">
        <div class="url b-1-cl">
          <span>http://m.xxx.com/zh_CN/reister?inviteCode=邀请码</span>
          <c-button
            marginTop="-11px"
            class="b-4-cl copy"
            type="text">
            {{$t('brokerSystem.otherText[2]')}}
        </c-button>
        </div>
        <div class="info b-2-cl">{{$t('brokerSystem.inviteInfo[0]')}}</div>
      </div>
    </div> -->
    <div class="invite-hongbao" v-if="openType">
      <div class="invite-hongbao-title b-1-cl">{{$t('brokerSystem.invite[1]')}}</div>
      <div class="invite-hongbao-info b-2-cl">{{$t('brokerSystem.inviteInfo[1]')}}</div>
      <div class="invite-process">
        <div class="invite-step">
          <div class="invite-step-num b-4-bg b-1-cl">1</div>
          <div class="invite-step-cont b-1-cl">
            <div class="invite-title">
              <div class="text a-5-bg">{{$t('brokerSystem.inviteStyle[2]')}}</div>
              <div class="line a-3-bg"></div>
            </div>
            <div class="invite-img">
              <img :src="imgMap['jingji-invite-1']" alt="">
            </div>
          </div>
        </div>
        <div class="invite-step">
          <div class="invite-step-num b-4-bg b-1-cl">2</div>
          <div class="invite-step-cont b-1-cl">
            <div class="invite-title">
              <div class="text a-5-bg">{{$t('brokerSystem.inviteStyle[3]')}}</div>
              <div class="line a-3-bg"></div>
            </div>
            <div class="invite-img">
              <img :src="imgMap['jingji-invite-2']" alt="">
            </div>
          </div>
        </div>
        <div class="invite-step">
          <div class="invite-step-num b-4-bg b-1-cl">3</div>
          <div class="invite-step-cont b-1-cl">
            <div class="invite-title">
              <div class="text a-5-bg">{{$t('brokerSystem.inviteStyle[4]')}}</div>
            </div>
            <div class="invite-img">
              <img :src="imgMap['jingji-invite-3']" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/invite/invite';
import 'BlockChain-ui/PC/common-mixin/personal/brokerSystem/invite/invite.styl';

export default {
  mixins: [mixin],
  mounted() {
    // this.init();
  },
};
</script>
