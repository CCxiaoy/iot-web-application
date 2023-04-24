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
import { storeToRefs } from 'pinia'
import SideNavigatorView from './views/SideNavigatorView.vue';
import DarkCover from './components/TipComponents/DarkCover.vue';
import useInfosStore from './stores';

const store = useInfosStore();

const { darkCoverFlag } = storeToRefs(store);

// reflesh mqtt connection automatically
const renewMqttConnection = store.renewMqttConnection;
renewMqttConnection();

// close darkcover automatically after refleshing or closing windows acidently
const closeDarkCover = store.closeDarkCover;
window.addEventListener('beforeunload', closeDarkCover);
</script>

<style scoped></style>
