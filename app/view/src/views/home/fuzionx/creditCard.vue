<template>
  <div class="fuz-section">
    <!-- left -->
    <div class="left-section">
      <img  src="@/assets/fuzionx/images/home/credit-card.png" alt="">
    </div>
    <!-- right -->
    <div class='right-section'>
      <div class="fuz-title fuz-gap">
        Introducing the first <i>Global Crypto Card</i>, available in 186 countries
      </div>
      <div class="fuz-content fuz-gap">
        Spend directly from your FuzionX Pay Card.
      </div>
      <fuz-button animation width="190" @click='toForm'>
        Join the Waitlist
      </fuz-button>
    </div>
  </div>

</template>
<script>

export default {
  components: {},
  methods: {
    toForm() {
      this.$router.push({ path: '/coming' });
      // window.showForm();
      // window.open('https://cdn.forms-content.sg-form.com/9750647a-0cd1-11ed-ab54-be3a0f9d4c7f', '_form');
    },
  },
};
</script>
<style lang="stylus" scoped>
  .fuz-section {
    position: relative;
    height: 520px;
  }
  .left-section {
    width: 420px;
    position: absolute;
    top: 20px;
  }
  .right-section {
    position: absolute;
    right:0;
    top: 180px;
    width: 616px;
  }
</style>
