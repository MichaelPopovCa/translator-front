<template>
  <div class="xs:w-screen xs:h-screen xs:p-6 xs:rounded-tl-lg border-t border-l border-r border-gray-300 rounded-tr-lg
              sm:w-screen sm:h-screen sm:p-6 sm:rounded-tl-lg
              md:w-screen md:h-screen md:p-6 md:rounded-tl-lg
              lg:w-w-full lg:px-10 lg:rounded-none
              xl:w-2/3 xl:mx-auto xl:px-72 xl:rounded-none">
    <div @click="closeDropDowns" class="mt-2 cursor-pointer xs:text-xs">
      < <span>Back</span>
    </div>
    <input v-model="searchSupportedLanguage" class="w-full bg-gray-100 focus:outline-none rounded-lg hover:bg-gray-200
                  xs:mt-6 xs:h-15 xs:p-4" :placeholder="handleCurrentSupportedLanguageChange"/>
    <div class="border-t border-gray-200
                xs:mt-4">
    </div>
    <div>
      <div @click="handleCurrentSupportedLanguageIndex(index)" class="flex mt-4 rounded-lg hover:bg-gray-200 xs:h-15 xs:p-4 cursor-pointer" v-for="(language, index) in displayedSupportedLanguages" :key="index">
        <div class="place-content-center
                    xs:text-xs ">
          {{ language.languageName }}
        </div>
        <div class="place-content-center
                    xs:ml-6 xs:text-[14px] text-zinc-500">
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: 'LanguageSelect',
  methods: {
    ...mapMutations(['closeDropDowns', 'setTranslateFromIdx', 'setTranslateToIdx']),
    handleCurrentSupportedLanguageIndex(index) {
      if (this.currentOpenDropDown === 'translateFrom') {
        this.setTranslateFromIdx(index);
      } else {
        this.setTranslateToIdx(index);
      }
      this.closeDropDowns()
    }
  },
  computed: {
    ...mapState(['currentOpenDropDown', 'supportedLanguages', 'filteredSupportedLanguages']),
    handleCurrentSupportedLanguageChange() {
      return this.currentOpenDropDown === 'translateFrom' ? 'Translate from' : 'Translate to';
    },
    searchSupportedLanguage: {
      get() {
        return this.$store.state.searchSupportedLanguage;
      },
      set(value) {
        this.$store.commit('setSearchSupportedLanguage', value);
        this.$store.commit('setFilteredSupportedLanguages', value);
      }
    },
    displayedSupportedLanguages() {
      return this.searchSupportedLanguage ? this.filteredSupportedLanguages : this.supportedLanguages;
    }
  }
}
</script>

