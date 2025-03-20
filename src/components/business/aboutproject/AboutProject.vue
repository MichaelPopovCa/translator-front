<template>
  <div class="mt-4 xs:w-full xs:px-10
              sm:w-full sm:px-10
              md:w-full md:px-10
              lg:w-w-full lg:px-10
              xl:w-2/3  xl:mx-auto xl:px-72">
    <div @click="handleCurrentDropDown('translator')" class="cursor-pointer bg-gray-200 px-3 py-2 rounded-md focus:outline-none text-center flex justify-center items-center hover:bg-gray-300">Go to the translator</div>
    <div class="mt-5 flex justify-center gap-x-28">
      <div>About project</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div class="flex-grow border-t border-gray-200 xs:mt-6"></div>
    </div>
    <div class="mt-5 flex justify-self-start gap-x-2">
      <div>Author:</div>
      <div>Mikhail Popov</div>
    </div>
    <div class="mt-5 flex justify-self-start gap-x-2">
      <div>Contact:</div>
      <div class="cursor-pointer">
        <a href="https://www.linkedin.com/in/mikhail-popov-643765200/" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="mt-5 gap-x-2">
      <div class="flex-grow border-t border-gray-200 xs:mt-6"></div>
    </div>
    <div class="mt-5 gap-x-2">
      <div>Purpose of the project:</div>
      <div class="mt-2">Demonstration project</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div>Business logic:</div>
      <div class="mt-2">Online translator with a configuration panel for enabling/disabling languages</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div class="flex-grow border-t border-gray-200 xs:mt-6"></div>
    </div>
    <div class="mt-5 flex justify-center gap-x-2">
      <div>Technologies applied</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div>Server:</div>
      <div class="mt-2">Ubuntu 24.10</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div>CI/CD:</div>
      <div class="mt-2">Full automation of CI/CD separately for front-end and separately for backend</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div>Cyber security:</div>
      <div class="mt-2">Secret management, TLS, iptables, fail2ban, SSH with public key and two-factor authentication (2FA)</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div>Frontend:</div>
      <div class="mt-2">Vue 3, Vite</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div>Design:</div>
      <div class="mt-2">CSS media queries to achieve a responsive design on any device, including mobile phones.</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div>Web server:</div>
      <div class="mt-2">Nginx</div>
    </div>
    <div class="mt-5 gap-x-2">
      <div>Backend:</div>
      <div class="mt-2">.NET9</div>
    </div>
    <div class="mt-5 flex justify-self-start gap-x-2">
      <div>GitHub BackEnd:</div>
      <div class="cursor-pointer">
        <a href="https://github.com/MichaelPopovCa/translator-ba" target="_blank" rel="noopener noreferrer">
          <img src="@/images/github-mark.png" alt="LinkedIn" class="w-6 h-6" /> <!-- Укажите путь к вашему PNG -->
        </a>
      </div>
    </div>
    <div class="mt-5 flex justify-self-start gap-x-2">
      <div>GitHub FrontEnd:</div>
      <div class="cursor-pointer">
        <a href="https://github.com/MichaelPopovCa/translator-front" target="_blank" rel="noopener noreferrer">
          <img src="@/images/github-mark.png" alt="LinkedIn" class="w-6 h-6" /> <!-- Укажите путь к вашему PNG -->
        </a>
      </div>
    </div>
    <div class="mt-5 mb-5 gap-x-2">
      <div class="flex-grow border-t border-gray-200 xs:mt-6"></div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: 'AboutProject',
  methods: {
    ...mapMutations(['handleCurrentDropDown'])
  }
}

</script>
