<template>
  <div
    class="xs:w-screen xs:h-screen xs:p-6 xs:rounded-tl-lg border-t border-l border-r border-gray-300 rounded-tr-lg
              sm:w-screen sm:h-screen sm:p-6 sm:rounded-tl-lg
              md:w-screen md:h-screen md:p-6 md:rounded-tl-lg
              lg:w-w-full lg:px-10 lg:rounded-none
              xl:w-2/3 xl:mx-auto xl:px-72 xl:rounded-none"
  >
    <div
      class="mt-2 cursor-pointer xs:text-xs"
      @click="closeDropDowns"
    >
      < <span>Back</span>
    </div>
    <div class="mt-6 text-center text-lg">Add or remove language</div>
    <div
      class="border-t border-gray-200
                xs:mt-4"
    />
    <div>
      <div
        v-for="(language, index) in availableLanguages"
        :key="index"
        class="flex mt-4 rounded-lg hover:bg-gray-200 xs:h-15 xs:p-4 cursor-pointer"
        @click="handleUpdateLanguageConfiguration(language.languageCode, !language.enabled)"
      >
        <div class="place-content-center xs:text-xs">
          {{ language.languageName }}
        </div>
        <div class="ml-auto">
          <div :class="language.enabled ? 'text-green-500' : 'text-red-500'">
            {{ language.enabled ? 'Enabled' : 'Disabled' }}
          </div>
        </div>
        <div class="place-content-center xs:ml-6 xs:text-[14px] text-zinc-500" />
      </div>
    </div>
  </div>
</template>


<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: 'AvailableLanguage',
  methods: {
    ...mapMutations(['closeDropDowns']),
    handleUpdateLanguageConfiguration(languageCode, enabled) {
      this.$store.dispatch('updateLanguageConfiguration', {languageCode, enabled});
    }
  },
  computed: {
    ...mapState(['currentOpenDropDown', 'availableLanguages'])
  }
}
</script>

