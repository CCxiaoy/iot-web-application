<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideNavigatorView from './views/SideNavigatorView.vue';
</script>

<template>
  <div class="flex min-w-full">
    <SideNavigatorView class="min-h-screen w-1/4"></SideNavigatorView>
    <RouterView class="flex-3 w-3/4"></RouterView>
  </div>
</template>

<style scoped>

</style>
