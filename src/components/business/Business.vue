<template>
  <div><Translator /></div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import AboutProject from "@/components/business/aboutproject/AboutProject.vue";
import {mapState} from "vuex";

export default {
  name: 'Business',
  components: {
    AboutProject,
    LanguageConfiguration: defineAsyncComponent (() => import("@/components/business/languageconfiguration/LanguageConfiguration.vue")),
    Translator : defineAsyncComponent (() => import("@/components/business/translator/Translator.vue"))
  },
  computed: {
    ...mapState(['currentOpenDropDown'])
  }
}
</script>

