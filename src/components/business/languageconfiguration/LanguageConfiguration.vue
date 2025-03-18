<template>
  <div class="mt-10 xs:w-screen xs:h-auto xs:p-6 xs:rounded-tl-lg rounded-tr-lg
              sm:w-screen sm:h-auto sm:p-6 sm:rounded-tl-lg
              md:w-screen md:h-auto md:p-6 md:rounded-tl-lg
              lg:w-full lg:px-10 lg:rounded-none
              xl:w-2/3 xl:mx-auto xl:px-72 xl:rounded-none">
    <button @click="handleCurrentDropDown('languageConfig')" class="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none text-left flex justify-between items-center hover:bg-gray-200">
      <span>Language configuration</span>
      <font-awesome-icon :icon="['fas', 'caret-down']" />
    </button>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: 'LanguageConfiguration',
  methods: {
    ...mapMutations(['handleCurrentDropDown']),
  }
};

</script>
