<template>
  <div id="app">
    <div><Business/></div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: 'App',
  components: {
    Business: defineAsyncComponent (() => import("@/components/business/Business.vue")),
  },
  mounted() {
    this.$store.dispatch('getAvailableLanguages');
  }
}
</script>

