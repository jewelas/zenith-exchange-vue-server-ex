<template>
  <section>
    <div class="pcAppDownload"><pcAppDownload/></div>
    <div class="h5AppDownload"><h5AppDownload/></div>
  </section>
</template>

<script>
import pcAppDownload from './appDownload.vue';
import h5AppDownload from './h5AppDownload.vue';

export default {
  components: {
    pcAppDownload,
    h5AppDownload,
  },
};
</script>

<style lang="stylus" scoped>
.pcAppDownload {
  display: block;
}
.h5AppDownload {
  display: none;
}
@media (max-width: 960px){
  .pcAppDownload {
    display: none;
  }
  .h5AppDownload {
    display: block;
  }
}
</style>
