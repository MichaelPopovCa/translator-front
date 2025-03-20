<template>
  <div v-if="currentOpenDropDown === 'aboutProject'"><AboutProject/></div>
  <div v-if="currentOpenDropDown === 'languageConfig'">
    <AvailableLanguage />
  </div>
  <div v-if="!currentOpenDropDown || currentOpenDropDown === 'translator'">
    <LanguageConfiguration />
  </div>
  <div
    v-if="!currentOpenDropDown && !allLanguagesDisabled || currentOpenDropDown === 'translator' && !allLanguagesDisabled"
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
        @input="sendTextToServerDebounced"
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
        :maxlength="50"
      />
    </div>
  </div>
  <div v-else-if="!currentOpenDropDown || (currentOpenDropDown !== 'translateFrom' && currentOpenDropDown !== 'translateTo' && currentOpenDropDown !== 'languageConfig' && currentOpenDropDown !== 'aboutProject')" class="flex justify-center items-center mt-32 space-x-6 text-xl">
    At least two languages need to be enabled
  </div>
  <div v-if="currentOpenDropDown === 'translateFrom' || currentOpenDropDown === 'translateTo'">
    <LanguageSelect />
  </div>
  <div v-if="currentOpenDropDown !== 'aboutProject'"
      @click="handleCurrentDropDown('aboutProject')" class="mt-20 xs:w-screen xs:h-auto xs:p-6 xs:rounded-tl-lg rounded-tr-lg
          sm:w-screen sm:h-auto sm:p-6 sm:rounded-tl-lg
          md:w-screen md:h-auto md:p-6 md:rounded-tl-lg
          lg:w-full lg:px-10 lg:rounded-none
          xl:w-2/3 xl:mx-auto xl:px-72 xl:rounded-none"
  >
    <button
        class="w-1/2 mx-auto bg-gray-200 px-3 py-2 rounded-md focus:outline-none text-center flex justify-center items-center hover:bg-gray-300"
    >
      <span>About project</span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState} from "vuex";
import LanguageSelect from '@/components/business/languageselect/LanguageSelect.vue';
import LanguageConfiguration from "@/components/business/languageconfiguration/LanguageConfiguration.vue";
import AvailableLanguage from "@/components/business/availablelanguages/AvailableLanguage.vue";
import * as signalR from '@microsoft/signalr';
import AboutProject from "@/components/business/aboutproject/AboutProject.vue";

export default {
  name: 'Translator',
  components: {
    AboutProject,
    AvailableLanguage,
    LanguageConfiguration,
    LanguageSelect
  },
  computed: {
    ...mapState(['enabledLanguages','availableLanguages', 'translateFromIdx', 'translateToIdx', 'currentOpenDropDown', 'allLanguagesDisabled']),
    ...mapGetters(['textResult']),
    textInput: {
      get() {
        return this.$store.state.textInput;
      },
      set(value) {
        this.$store.commit('setTextInput', sanitizeInput(value));
      }
    }
  },
  methods: {
    ...mapMutations(['handleCurrentDropDown', 'reverseLanguages']),
    sendTextToServerDebounced: debounce(function () {
      if (this.connection && this.textInput) {
        this.connection.invoke("ReceiveTextForTranslation", {
          TranslatorType: 1, // Замените на реальный тип переводчика
          SourceLanguage: this.availableLanguages[this.translateFromIdx].languageCode,
          SourceText: this.textInput,
          TargetLanguage: this.availableLanguages[this.translateToIdx].languageCode
        })
            .catch(err => {
              console.error("Error sending text to server", err);
            });
      }
    }, 1000),
  },
  mounted() {
    this.connection = new signalR.HubConnectionBuilder()
        .withUrl("/translationHub")
        .build();

    this.connection.start()
        .then(() => {
          console.log("SignalR connection established");
        })
        .catch(err => {
          console.error("SignalR connection error", err);
        });

    this.connection.on("ReceiveTranslatedText", (translatedText) => {
      this.$store.commit('setTextResult', translatedText);
    });
  }
};
function sanitizeInput(input) {
  return input.replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/<.*?javascript:.*?>/gi, '')
      .replace(/on\w+=".*?"/gi, '');
}
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
</script>
