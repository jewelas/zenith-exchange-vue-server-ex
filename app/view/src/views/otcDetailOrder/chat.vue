<template>
  <section class="otcDeatilOrder-chat a-4-bg"
    :style="{height: `${chatHeight}px`, top: `${chatTop - 1}px`}"
    v-if="isReady" >
    <ul class="chat-title a-2-bd"
      v-if="status === '5' && commonData.isComplainUser.toString() === '1'">
      <li :class="tab === 'server' ? 'b-2-cl' : ''" @click="setTab('server')">
        <!-- 客服 -->
        {{ $t('otcDetailOrder.chatServer') }}
        <span class="a-12-bg" v-if="tab === 'server'"></span>
      </li>
      <li :class="tab === 'user' ? 'b-2-cl' : ''" @click="setTab('user')">
        <!-- 商家 -->
        {{ $t('otcDetailOrder.chatUser') }}
        <span class="a-12-bg" v-if="tab === 'user'"></span>
      </li>
    </ul>
    <div class="chat-content">
      <!-- 客服 -->
      <div class="chat-server" v-show="tab === 'server'">
        <div :style="{height: `${chatServerHeight}px`}"
          class="chat-server-message">
          <vue-scroll ref="serverMessage">
          <ul ref="serverList">
            <!-- 系统消息：您已成功提交申诉，请耐心等待。 -->
            <li class="chat-server-first">
              {{ $t('otcDetailOrder.chatServerMessage') }}
            </li>
            <li v-for="(item, index) in serverData"
              :key="index"
              :class="item.userType.toString() === '2' ? 'chat-right' : 'chat-left'"
              class="chat-item clearfix">
              <div class="chat-page"
                :class="item.userType.toString() === '2' ? 'chat-right a-12-bg' : 'chat-left'">
                <!-- {{item}} -->
                <div v-if="item.userType.toString() === '1'">
                  <svg class="icon icon-30" aria-hidden="true">
                    <use xlink:href="#icon-h_2"></use>
                  </svg>
                </div>
                <div v-else>
                  <img v-if="serverMy.imageUrl.length" :src="serverMy.imageUrl"/>
                  <span class="b-2-cl" v-else>{{ serverMy.otcNickName[0] }}</span>
                </div>
                <!-- {{item.userType.toString() === '2' ? 'chat-right' : 'chat-left'}} -->
              </div>
              <div class="chat-message">
                <!-- 文字 -->
                <div class="clearfix">
                  <div class="chat-message-text"
                    :class="item.userType.toString() === '2' ? 'a-12-bg b-8-cl' : 'a-2-bg b-1-cl'"
                    v-if="item.contentType.toString() === '1'">
                    {{ item.replayContent }}
                  </div>
                  <!-- 图片 -->
                  <div class="chat-message-img a-2-bg"
                    v-if="item.contentType.toString() === '2'">
                    <img :src="item.replayContent"/>
                  </div>
                </div>
                <div class="chat-message-time">{{ item.ctime|setTime }}</div>
              </div>
            </li>
          </ul>
          </vue-scroll>
        </div>
        <div class="chat-send a-2-bg">
          <input class="b-1-cl textInput"
            @keyup="serverInpKeyup" maxlength="300"
            :placeholder="$t('otcDetailOrder.chatServerInp')" v-model="serverInp"/>
          <div class="sendButton">
            <div class="sendButton-img">
              <span>
                <svg class="icon icon-30" aria-hidden="true">
                  <use xlink:href="#icon-h_3"></use>
                </svg></span>
              <input
                type="file"
                class="files"
                @change="fileChange"
                accept="image/gif, image/jpeg, image/jpg"
                name='file'
                ref="fileInp">
            </div>
            <c-button height="30px"
              class="buttonClass"
              :disabled="serverBtnDisabled"
              :loading="serverBtnLoading"
              name="serverButton"
              @click="serverBtnClick">{{ $t('otcDetailOrder.chatServerBut') }}</c-button>
          </div>
        </div>
      </div>
      <!-- 商家 -->
      <div class="chat-user" v-show="tab === 'user'">
        <div class="chat-user-title a-2-bg">
          <div class="a-12-bg user-page" @click="goUid(userMess.uid)">
            <img v-if="userMess.imageUrl.length" :src="userMess.imageUrl"/>
            <span class="b-8-cl" v-else>{{ userMess.otcNickName[0] }}</span>
          </div>
          <div class="user-mess">
            <div class="user-name b-2-cl">
              {{ userMess.otcNickName }}
              <span v-html="userVip" style="margin-left: 6px"></span>
            </div>
            <div class="user-status">
              {{ userMess.isOnline.toString() === '1'
                ? $t('otcDetailOrder.inline')
                : $t('otcDetailOrder.outline') }}
            </div>
          </div>
          <div class="user-text">
            <div class="user-name b-2-cl"> {{ userMess.completeOrders }} </div>
            <!-- 成交量 -->
            <div class="user-status"> {{ $t('otcDetailOrder.chatVolume') }} </div>
          </div>
        </div>
        <div class="chat-user-message"
          :style="{height: `${chatUserHeight}px`}">
          <vue-scroll ref="userMessage" :opt="userScrollOpt">
          <ul ref="userList">
            <!-- <li class="chat-server-first">系统消息：您已成功提交申诉，请耐心等待。</li> -->
            <li v-for="(item, index) in userData"
              :key="index"
              :class="item.userType.toString() === '2' ? 'chat-right' : 'chat-left'"
              class="chat-item clearfix">
              <div class="chat-page a-12-bg">
                <img v-if="item.obj.imageUrl.length" :src="item.obj.imageUrl"/>
                <span class="b-8-cl" v-else>{{ item.obj.otcNickName[0] }}</span>
              </div>
              <div class="chat-message">
                <!-- 文字 -->
                <div class="clearfix">
                  <div class="chat-message-text"
                    :class="item.userType.toString() === '2' ? 'a-12-bg b-8-cl' : 'a-2-bg b-1-cl'"
                    v-if="item.contentType.toString() === '1'">
                    {{ item.replayContent }}
                  </div>
                  <!-- 图片 -->
                  <div class="chat-message-img a-2-bg"
                    v-if="item.contentType.toString() === '2'">
                    <img :src="item.replayContent"/>
                  </div>
                </div>
                <div class="chat-message-time">{{ item.ctime|setTime }}</div>
              </div>
            </li>
          </ul>
          </vue-scroll>
        </div>
        <div class="chat-send a-2-bg">
          <input class="b-1-cl textInput"
            @keyup="userInpKeyup" maxlength="300"
            ref="userInput"
            :placeholder="$t('otcDetailOrder.chatUserInp')" v-model="userInp"/>
          <div class="sendButton">
            <c-button height="30px"
              class="buttonClass"
              name="userButton"
              :disabled="userBtnDisabled"
              :loading="userBtnLoading"
              @click="userBtnClick">
              {{ $t('otcDetailOrder.chatUserBut') }}
            </c-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/otcDetailOrder/chat/chat';
import 'BlockChain-ui/PC/common-mixin/otcDetailOrder/chat/chat.styl';

export default {
  mixins: [mixin],
};
</script>
