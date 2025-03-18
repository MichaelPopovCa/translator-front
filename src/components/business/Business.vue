<template>
  <div><Translator/></div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import LanguageConfiguration from "@/components/business/languageconfiguration/LanguageConfiguration.vue";

export default {
  name: 'Business',
  components: {
    LanguageConfiguration: defineAsyncComponent (() => import("@/components/business/languageconfiguration/LanguageConfiguration.vue")),
    Translator : defineAsyncComponent (() => import("@/components/business/translator/Translator.vue"))
  }
}
</script>

