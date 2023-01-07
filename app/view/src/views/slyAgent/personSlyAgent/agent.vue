<template>
  <div class="sly-agent">
    <div class="user-management-content a-7-bd a-5-bg">
      <p class="title b-1-cl a-3-bd">{{ $t('slyAgent.text2') }}</p>
      <div class="user-management-main clearfix">
        <ul class="ul">
          <li class="li clearfix" v-if="agentUserSatus !== 3">
            <!--icon占位用-->
            <span class="li-icon" :style="slyAgentIcon1"></span>
            <div class="li-div a-3-bd b-1-cl clearfix">
              <p class="li-title">{{ $t('slyAgent.text3') }}</p>
              <p class="li-text b-2-cl">{{ $t('slyAgent.text7') }}</p>
              <div class="li-right clearfix">
                <c-button
                  @click="aplly"
                  className="li-fun"
                  type="solid">
                    {{ agentUserSatus === 0 ?
                    $t('slyAgent.button1') : agentUserSatus === 1 ?
                    $t('slyAgent.text72') : $t('slyAgent.text73') }}
                </c-button>
                <!-- <span  class="li-fun b-4-cl clearfix">
                  完成任务即可成为经纪人哦
                </span> -->

              </div>
            </div>
          </li>
          <li class="li clearfix" v-if="agentUserSatus === 3">
            <span class="li-icon" :style="slyAgentIcon2"></span>
            <div class="li-div a-3-bd b-1-cl clearfix">
                <p class="li-title">{{ $t('slyAgent.text4') }}</p>
                <p class="li-text b-2-cl">{{ $t('slyAgent.text8') }}</p>
                <div class="li-right clearfix">
                    <c-button
                        @click="jump('/sly/slyAgent/agentPower')"
                        className="li-fun"
                        type="solid">
                        {{ $t('slyAgent.button2') }}
                    </c-button>
                </div>
            </div>
          </li>
          <li class="li clearfix" v-if="agentUserSatus === 3">
            <span class="li-icon" :style="slyAgentIcon3"></span>
            <div class="li-div a-3-bd b-1-cl clearfix">
                <p class="li-title">{{ $t('slyAgent.text5') }}</p>
                <p class="li-text b-2-cl">{{ $t('slyAgent.text9') }}</p>
                <div class="li-right clearfix">
                    <span class="b-1-cl">{{inviteUrl}}</span>
                    <span class="slylinkCopy" @click="copyClick('inviteUrlShow')">
                        {{ $t('slyAgent.button3') }}
                    </span>
                </div>
            </div>
          </li>
          <li class="li clearfix" style="border-bottom-width: inherit;" v-if="agentUserSatus === 3">
            <!--icon占位用-->
            <span class="li-icon" :style="slyAgentIcon4"></span>
            <div class="li-div a-3-bd b-1-cl clearfix">
              <p class="li-title">
                {{ $t('slyAgent.text6') }}
              </p>
              <p class="li-text b-2-cl">
                {{ $t('slyAgent.text10') }}
              </p>
              <div class="li-right clearfix">
                <c-button
                  @click="jump('/sly/slyAgent/inviteFriends')"
                  type="solid"
                  className="li-fun">
                  {{ $t('slyAgent.button2') }}
                </c-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <c-dialog
        paddingBottom="30px"
        paddingTop="41px"
        :showFlag="dialogFlag"
        :confirmLoading="dialogConfirmLoading"
        :confirmDisabled="dialogConfirmDisabled"
        @close="dialogClose"
        @confirm="dialogConfirm"
        :titleText="titleText">
      <div class="dialog-div a-4-bg">
        <div class="dialog-div-module a-5-bd">
          <p>{{ $t('slyAgent.text5') }}</p>
          <p>
            <span class="b-1-cl">{{inviteUrl}}</span>
            <span @click="copyClick()"
                  @mouseenter="inviteUrlShow = false"
                  @mouseleave="inviteUrlShow = true">
              <span v-if="inviteUrlShow">
                  <svg class="icon icon-14"
                       aria-hidden="true">
                    <use xlink:href="#icon-a_9"></use>
                  </svg>
                </span>
              <span v-else>
                  <svg class="icon icon-14"
                       aria-hidden="true">
                    <use xlink:href="#icon-a_9_1"></use>
                  </svg>
              </span>
            </span>
          </p>
        </div>
        <div class="dialog-div-module a-5-bd">
          <p>{{ $t('slyAgent.text22') }}</p>
          <p>
            <span class="b-2-cl">{{ $t('slyAgent.text23') }}</span>
          </p>
        </div>
      </div>
    </c-dialog>
  </div>
</template>

<script>
import { imgMap } from '@/utils';
import 'BlockChain-ui/PC/common-mixin/personal/UserManagement/UserManagement.styl';
import './agent.styl';

export default {
  // mixins: [mixin],
  data() {
    return {
      imgMap,
      slyAgentIcon1: `background: url(${imgMap.slyAgentIcon1})`,
      slyAgentIcon2: `background: url(${imgMap.slyAgentIcon2})`,
      slyAgentIcon3: `background: url(${imgMap.slyAgentIcon3})`,
      slyAgentIcon4: `background: url(${imgMap.slyAgentIcon4})`,
      dialogFlag: false,
      dialogConfirmLoading: false,
      dialogConfirmDisabled: false,
      inviteUrlShow: true,
    };
  },
  computed: {
    baseData() { return this.$store.state.baseData; },
    userInfo() { return this.$store.state.baseData.userInfo; },
    isLogin() { return this.$store.state.baseData.isLogin; },
    inviteUrl() {
      if (this.isLogin) {
        return this.$store.state.baseData.userInfo.inviteUrl;
      }
      return '';
    },
    titleText() {
      return this.$t('slyAgent.text3');
    },
    slyAgent() {
      return this.$store.state.personal.slyAgent;
    },
    agentUserSatus() {
      if (this.slyAgent) {
        return this.$store.state.personal.slyAgent.agentUserSatus;
      }
      return '';
    },
  },
  mounted() {
  },
  methods: {
    // 获取算力云经纪人数据
    getSylAgentFlag() {
      this.axios({
        url: 'agentPersonal',
        hostType: 'fe-hashrate-api',
      }).then((data) => {
        if (data.code.toString() === '0') {
          this.$store.dispatch('slyAgent', data.data);
          this.slyAGentPower = data.data.backgroundInviteUrl;
          this.subAgentUidSize = data.data.subAgentUidSize;
          this.agentCommission = data.data.agentCommission;
          this.agentUserSatus = data.data.agentUserSatus;
          this.roleList = data.data.roleList;
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      });
    },
    aplly() {
      if (this.agentUserSatus !== 0) return;
      this.dialogConfirmFlag = true;
      this.dialogFlag = true;
    },
    copyClick() {
      this.copy(this.inviteUrl);
    },
    copy(str) {
      this.$bus.$emit('tip', { text: this.$t('personal.prompt.copySucces'), type: 'success' });
      function save(e) {
        e.clipboardData.setData('text/plain', str);
        e.preventDefault(); // 阻止默认行为
      }
      document.addEventListener('copy', save);
      document.execCommand('copy'); // 使文档处于可编辑状态，否则无效
      document.removeEventListener('copy', save);
    },
    dialogClose() { // 关闭或取消时
      this.dialogConfirmDisabled = false;
      this.dialogConfirmFlag = false;
      this.dialogFlag = false;
    },
    // 发起经纪人申请
    dialogConfirm() {
      this.axios({
        url: 'applyAgent',
        hostType: 'fe-hashrate-api',
      }).then((data) => {
        this.dialogClose();
        if (data.code.toString() === '0') {
          this.$bus.$emit('tip', { text: data.msg, type: 'success' });
          this.getSylAgentFlag();
        } else if (data.code.toString() === '1' || data.code.toString() === '2') {
          this.$bus.$emit('tip', { text: data.msg, type: 'warn' });
        } else {
          this.$bus.$emit('tip', { text: data.msg, type: 'error' });
        }
      }).catch(() => {
        this.$bus.$emit('tip', { text: this.$t('slyAgent.text71'), type: 'error' });
      });
    },
    jump(link) {
      const { lan } = this.$store.state.baseData;
      const links = `${window.origin}/${lan}${link}`;
      window.location.href = links;
    },
  },
};
</script>
