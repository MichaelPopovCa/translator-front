<template>
  <div v-if="!currentOpenDropDown" class="flex justify-center items-center mt-52 space-x-6">
    <div class="w-full max-w-lg flex flex-col items-start">
      <button @click="handleCurrentDropDown('translateFrom')" class="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none text-left flex justify-between items-center hover:bg-gray-200">
        <span v-if="supportedLanguages">{{ supportedLanguages[translateFromIdx].languageName }}</span>
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
    <button @click="reverseLanguages" class="flex flex-col justify-center items-center space-y-1 p-2 rounded-md focus:outline-none hover:bg-gray-200">
      <span class="text-2xl text-gray-600">&#8592;</span>
      <span class="text-2xl text-gray-600">&#8594;</span>
    </button>
    <div class="w-full max-w-lg flex flex-col items-end">
      <button @click="handleCurrentDropDown('translateTo')" class="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none text-left flex justify-between items-center hover:bg-gray-200">
        <span v-if="supportedLanguages">{{ supportedLanguages[translateToIdx].languageName }}</span>
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
  <div v-else>
    <LanguageSelect/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import LanguageSelect from '@/components/business/languageselect/LanguageSelect.vue';


export default {
  name: 'Translator',
  components: {
    LanguageSelect
  },
  computed: {
    ...mapState(['textInput', 'supportedLanguages', 'translateFromIdx', 'translateToIdx', 'currentOpenDropDown']),
    ...mapGetters(['textResult']),
  },
  methods: {
    ...mapMutations(['handleCurrentDropDown', 'reverseLanguages']),
    ...mapActions(['getSupportedLanguages'])
  },
  mounted() {
    this.$store.dispatch('getSupportedLanguages');
  }
};
</script>
