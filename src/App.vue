<template>
  <div class="flex min-w-full relative">
    <SideNavigatorView class="min-h-screen w-1/4"></SideNavigatorView>
    <RouterView class="flex-3 w-3/4"></RouterView>
    <DarkCover v-if="darkCoverFlag" class="absolute z-10"></DarkCover>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SideNavigatorView from './views/SideNavigatorView.vue';
import DarkCover from './components/TipComponents/DarkCover.vue';
// import test from './Tools/index.js'

const darkCoverFlag = ref(false);

const toggleDarkCoverFlag = () => {
  darkCoverFlag.value = !darkCoverFlag.value;
}
</script>

<style scoped></style>
