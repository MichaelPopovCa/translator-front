<template>
  <div><Translator/></div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: 'Business',
  components: {
    Translator : defineAsyncComponent (() => import("@/components/business/translator/Translator.vue")),

  }
}
</script>

