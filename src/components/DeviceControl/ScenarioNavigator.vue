<template>
    <div class="flex px-12 pt-3 pb-4">
        <i
            class="w-8 h-8 border-2 rounded-full border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconBackToHome></IconBackToHome>
        </i>
        <i
            class="w-16 h-8 ml-4 rounded-2xl border-2 border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconPreviousPage class="w-8 h-8"></IconPreviousPage>
        </i>
        <div class="text-scenariotitle italic font-bold flex-grow flex justify-center content-center">{{
            scenarios[currentPage].title }}</div>
        <i
            class="w-16 h-8 mr-4 rounded-2xl border-2 border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconNextPage class="w-8 h-8"></IconNextPage>
        </i>
        <i
            class="w-8 h-8 border-2 rounded-full border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconNewScenario @click="openAddScenarioTip()" class="w-8 h-8"></IconNewScenario>
            <AddScenarioTip @closeAddScenarioTip="closeAddScenarioTip" v-if="addScenarioTipFlag"
                class="absolute z-20 top-14 right-12"></AddScenarioTip>
        </i>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import IconBackToHome from "../icons/IconBackToHome.vue";
import IconPreviousPage from "../icons/IconPreviousPage.vue";
import IconNextPage from "../icons/IconNextPage.vue";
import IconNewScenario from "../icons/IconNewScenario.vue";
import AddScenarioTip from "../TipComponents/AddScenarioTip.vue";
import useInfosStore from "../../stores";
import { storeToRefs } from 'pinia'

const currentPage = ref(0);

// import center store
const store = useInfosStore();

const addScenarioTipFlag = ref(false);

// import method of openDarkCover
const openDarkCover = store.openDarkCover;

// method to open AddSce
const openAddScenarioTip = () => {
    openDarkCover();
    addScenarioTipFlag.value = true;
}

const closeAddScenarioTip = () => {
    addScenarioTipFlag.value = false;
}

const { scenarios } = storeToRefs(store);

// 以下这块需要改造成 使用 center store
// const AllScenarios = reactive([
//     {
//         id: "Home",
//         title: "Home",
//     },
//     {
//         id: "Living Room",
//         title: "Living Room",
//     }
// ]);
</script>

<style scoped></style>