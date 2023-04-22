<template>
    <div class="flex px-12 py-3">
        <i class="w-8 h-8 border-2 rounded-full border-borderGray-medium bg-themeColor-lightest flex justify-center content-center"><IconBackToHome></IconBackToHome></i>
        <i class="w-16 h-8 ml-4 rounded-2xl border-2 border-borderGray-medium bg-themeColor-lightest flex justify-center content-center"><IconPreviousPage class="w-8 h-8"></IconPreviousPage></i>
        <div class="text-scenariotitle italic font-bold flex-grow flex justify-center content-center">{{ AllScenarios[currentPage].Title }}</div>
        <i class="w-16 h-8 mr-4 rounded-2xl border-2 border-borderGray-medium bg-themeColor-lightest flex justify-center content-center"><IconNextPage class="w-8 h-8"></IconNextPage></i>
        <i class="w-8 h-8 border-2 rounded-full border-borderGray-medium bg-themeColor-lightest flex justify-center content-center"><IconNewScenario class="w-8 h-8"></IconNewScenario></i>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import IconBackToHome from "../icons/IconBackToHome.vue";
import IconPreviousPage from "../icons/IconPreviousPage.vue";
import IconNextPage from "../icons/IconNextPage.vue";
import IconNewScenario from "../icons/IconNewScenario.vue";

const currentPage = ref(0);

const AllScenarios = reactive([
    {
        id: "Home",
        Title: "Home",
    },
    {
        id: "Living Room",
        Title: "Living Room",
    }
]);
</script>

<style scoped></style>