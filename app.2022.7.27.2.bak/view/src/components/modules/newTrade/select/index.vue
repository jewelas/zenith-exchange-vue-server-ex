<template>
  <div
    class="newTrade-select"
    :style='stylees'
    v-click-outside.capture='onClickOutside'
    v-click-outside:mousedown.capture='onClickOutside'
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <!-- 展示容器 -->
    <div
      class='s-selectd a-5-bd'
      :class="[selectedBg, {'a-12-bd': isFocus, 'noSelect': !selected}]">
      <!-- 输入框 -->
      <span class='s-value b-1-cl'>{{ selected }}</span>
      <!-- 三角ICON -->
      <span class="icon-triangle" :class="{'select-visible': isFocus}">
        <svg class="icon icon-12" aria-hidden="true">
          <use xlink:href="#icon-v5_25"></use>
        </svg>
      </span>
    </div>
    <transition name='slideInDown'>
      <div
        v-show='isFocus'
        class='select-options-box a-5-bg b-1-cl'>
        <div
          v-show='options.length'
          class='select-option-list'
          :style='setBoxHeight'
        >
          <vue-scroll>
            <slot name="options">
              <!-- 单行类型 -->
              <ul v-if='type === "info"' class="a-5-bg">
                <li
                  class='select-option-item'
                  v-for='(item, index) in options'
                  :class='{ "a-4-bg": value === item.value || index === overInx }'
                  :key='index'
                  @mouseover='mouseOver(index)'
                  @mouseout='mouseOut(index)'
                  @click='onOptionClick(item)'
                >
                  {{ item.label }}
                </li>
              </ul>
              <!-- 双行类型 -->
              <ul v-if='type === "double"'>
                <li
                  class='select-option-item-double'
                  v-for='(item, index) in options'
                  :class='{ "a-4-bg": value === item.value || index === overInx }'
                  :key='index'
                  ref='selectLi'
                  @mouseover='mouseOver(index)'
                  @mouseout='mouseOut(index)'
                  @click='onOptionClick(item)'
                >
                  <div>{{ item.label }}</div>
                  <!-- <div class='label b-2-cl'>{{ item }}</div> -->
                </li>
              </ul>
            </slot>
          </vue-scroll>
        </div>
        <div class='not_option' v-show='!options.length'>
          <!-- 暂无数据 -->
          {{ $t('components.select.noData') }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import mixin from 'BlockChain-ui/PC/common-mixin/modules/newTrade/select/select';
import 'BlockChain-ui/PC/common-mixin/modules/newTrade/select/select.styl';

export default {
  name: 'newTrade-select',
  mixins: [mixin],
};
</script>
