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
            AllScenarios[currentPage].title }}</div>
        <i
            class="w-16 h-8 mr-4 rounded-2xl border-2 border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconNextPage class="w-8 h-8"></IconNextPage>
        </i>
        <i
            class="w-8 h-8 border-2 rounded-full border-borderGray-medium bg-themeColor-lightest flex justify-center content-center">
            <IconNewScenario class="w-8 h-8"></IconNewScenario>
            <AddScenarioTip v-if="addScearioTipFlag" class="absolute z-20 top-14 right-12"></AddScenarioTip>
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

const currentPage = ref(0);

const AllScenarios = reactive([
    {
        id: "Home",
        title: "Home",
    },
    {
        id: "Living Room",
        title: "Living Room",
    }
]);

const addScearioTipFlag = ref(false);

const toggleAddScearioTipFlagFlag = () => {
    addScearioTipFlag.value = !addScearioTipFlag.value;
}
</script>

<style scoped></style>