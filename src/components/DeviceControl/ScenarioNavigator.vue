<template>
    <div class="flex px-12 pt-3 pb-4">
        <i
            class="w-8 h-8 border-2 rounded-full border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconBackToHome @click="backToHomeScenario"></IconBackToHome>
        </i>
        <i
            class="w-16 h-8 ml-4 rounded-2xl border-2 border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconPreviousPage @click="previousScenario" class="w-8 h-8"></IconPreviousPage>
        </i>
        <div class="text-scenariotitle italic font-bold flex-grow flex justify-center content-center">{{
            scenarios[currentPage].title }}</div>
        <i
            class="w-16 h-8 mr-4 rounded-2xl border-2 border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconNextPage @click="nextScenario" class="w-8 h-8"></IconNextPage>
        </i>
        <i
            class="w-8 h-8 border-2 rounded-full border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconNewScenario @click="openAddScenarioTip()"></IconNewScenario>
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

// import center store
const store = useInfosStore();

const { scenarios, currentPage } = storeToRefs(store);

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

// previous scenario
const previousScenario = () => {
    store.previousScenario();
}
// next scenario
const nextScenario = () => {
    store.nextScenario();
}
// back to Home scenario
const backToHomeScenario = () => {
    store.backToHomeScenario();
}
</script>

<style scoped></style>