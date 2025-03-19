<template>
  <div v-if="currentOpenDropDown === 'languageConfig'">
    <AvailableLanguage />
  </div>
  <div v-if="!currentOpenDropDown">
    <LanguageConfiguration />
  </div>
  <div
    v-if="!currentOpenDropDown && !allLanguagesDisabled"
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
        @input="sendTextToServer"
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
  <div v-else-if="!currentOpenDropDown || (currentOpenDropDown !== 'translateFrom' && currentOpenDropDown !== 'translateTo' && currentOpenDropDown !== 'languageConfig')" class="flex justify-center items-center mt-32 space-x-6 text-xl">
    At least two languages need to be enabled
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
import * as signalR from '@microsoft/signalr';
import availableLanguage from "@/components/business/availablelanguages/AvailableLanguage.vue";

export default {
  name: 'Translator',
  components: {
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
        this.$store.commit('setTextInput', value);
      }
    }
  },
  methods: {
    ...mapMutations(['handleCurrentDropDown', 'reverseLanguages']),
    sendTextToServer() {
      if (this.connection && this.textInput) {
        this.connection.invoke("ReceiveTextForTranslation", 1, this.textInput, 'en', 'fr') // Замените на реальные языки
            .catch(err => {
              console.error("Error sending text to server", err);
            });
      }
    }
  },
  mounted() {
    this.$store.dispatch('getAvailableLanguages');
    this.connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5268/translationHub") // URL хаба SignalR
        .build();

    this.connection.start()
        .then(() => {
          console.log("SignalR connection established");
        })
        .catch(err => {
          console.error("SignalR connection error", err);
        });

    // Слушаем результат перевода
    this.connection.on("ReceiveTranslatedText", (translatedText) => {
      this.$store.commit('setTextResult', translatedText); // Обновляем textResult в Vuex
    });
  }
};
</script>
