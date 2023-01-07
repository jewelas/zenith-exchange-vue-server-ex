<template>
  <div class='watchbox-box'>
    <div class="watchbox"
      :class="['size-' + size, 'theme-' + theme]" ref="root"
      :style="getStyle()">
      <div class="watchbox-icon" v-if="$slots.icon">
        <slot name="icon" />
      </div>
      <div class="watchbox-title fuz-title">{{title}}</div>
      <div class="watchbox-content fuz-content" v-if='content'>{{content}}</div>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      normal: '',
    },
    theme: {
      type: String,
      normal: 'normal',
    },
  },
  data() {
    return {
      angleY: 0,
      angleX: 0,
    };
  },
  mounted() {
    document.body.addEventListener('mousemove', this.mouseMove);
  },
  beforeDestroy() {
    document.body.removeEventListener('mousemove', this.mouseMove);
  },
  methods: {
    getStyle() {
      return {
        transform: `rotateX(${this.angleX}deg) rotateY(${this.angleY}deg)`,
      };
    },
    mouseMove(evt) {
      const {
        x, y, width: w, height: h,
      } = this.$refs.root.getBoundingClientRect();

      const switcher = true;

      const centerX = (x + w) / 2;
      const centerY = (y + h) / 2;
      const { screenX, screenY } = evt;

      const deltaY = -(screenY - centerY);
      const deltaX = screenX - centerX;

      let alfaX = 0.05 * deltaY;
      // eslint-disable-next-line
      alfaX = (alfaX < -60) ? -60 : (alfaX > 60) ? 60 : alfaX;

      const alfaY = 0.05 * deltaX;
      let alfaYMiddleItem = alfaY + (switcher ? -30 : 30);
      // eslint-disable-next-line
      alfaYMiddleItem = (alfaYMiddleItem < -60) ? -60 : (alfaYMiddleItem > 60) ? 60 : alfaYMiddleItem;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.angleY = alfaYMiddleItem;
        this.angleX = alfaX;
      }, 100);
    },
  },
};
</script>
<style lang="stylus" scoped>
.watchbox-box {
  perspective: 900px;
  perspective-origin: center;
}
.watchbox {
  background: #FFFFFF;
  opacity: 0.9;
  box-shadow: 6px 5px 20px rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 92px;
  padding: 18px 16px;
  box-sizing: border-box;
  gap: 20px;
  width: 286px;
  justify-content: center;
  transition: 0.3s;
}

.watchbox-icon {
  position: absolute;
  top: -53px;
  left: -53px;
  width: 106px;
  height: 106px;
}

.watchbox-icon img {
  width: 100%;
}

.watchbox-title {
  color: #4056D8;
}

.watchbox-content {
  color: #4056D8;
  flex: 1 1 auto;
  width: 138px;
}

.size-small {
  .watchbox-title {
    font-size:20px;
    white-space: nowrap;
    color:#131313;
  }
}
.theme-black {
  background: rgba(205,205,205,.2);
    box-shadow: 6px 5px 20px rgba(255, 255, 255, 0);
}
</style>
