<template>
  <div v-if="currentOpenDropDown === 'languageConfig'">
    <AvailableLanguage />
  </div>
  <div v-if="!currentOpenDropDown">
    <LanguageConfiguration />
  </div>
  <div
    v-if="!currentOpenDropDown"
    class="flex justify-center items-center mt-32 space-x-6"
  >
    <div class="w-full max-w-lg flex flex-col items-start">
      <button
        class="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none text-left flex justify-between items-center hover:bg-gray-200"
        @click="handleCurrentDropDown('translateFrom')"
      >
        <span v-if="availableLanguages">{{ availableLanguages[translateFromIdx].languageName }}</span>
        <span v-else>Loading...</span>
        <font-awesome-icon :icon="['fas', 'caret-down']" />
      </button>
      <textarea
        v-model="textInput"
        rows="10"
        class="w-full p-3 border-transparent rounded-md bg-white focus:outline-none resize-none"
        placeholder="Enter text to translate"
      />
    </div>
    <button
      class="flex flex-col justify-center items-center space-y-1 p-2 rounded-md focus:outline-none hover:bg-gray-200"
      @click="reverseLanguages"
    >
      <span class="text-2xl text-gray-600">&#8592;</span>
      <span class="text-2xl text-gray-600">&#8594;</span>
    </button>
    <div class="w-full max-w-lg flex flex-col items-end">
      <button
        class="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none text-left flex justify-between items-center hover:bg-gray-200"
        @click="handleCurrentDropDown('translateTo')"
      >
        <span v-if="availableLanguages">{{ availableLanguages[translateToIdx].languageName }}</span>
        <span v-else>Loading...</span>
        <font-awesome-icon :icon="['fas', 'caret-down']" />
      </button>
      <textarea
        :value="textResult"
        rows="10"
        class="w-full p-3 border-transparent rounded-md bg-gray-100 focus:outline-none resize-none"
        readonly
        placeholder="Translated text"
      />
    </div>
  </div>
  <div v-if="currentOpenDropDown === 'translateFrom' || currentOpenDropDown === 'translateTo'">
    <LanguageSelect />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState} from "vuex";
import LanguageSelect from '@/components/business/languageselect/LanguageSelect.vue';
import LanguageConfiguration from "@/components/business/languageconfiguration/LanguageConfiguration.vue";
import AvailableLanguage from "@/components/business/availablelanguages/AvailableLanguage.vue";


export default {
  name: 'Translator',
  components: {
    AvailableLanguage,
    LanguageConfiguration,
    LanguageSelect
  },
  computed: {
    ...mapState(['textInput', 'availableLanguages', 'translateFromIdx', 'translateToIdx', 'currentOpenDropDown']),
    ...mapGetters(['textResult']),
  },
  methods: {
    ...mapMutations(['handleCurrentDropDown', 'reverseLanguages'])
  },
  mounted() {
    this.$store.dispatch('getAvailableLanguages');
  }
};
</script>
