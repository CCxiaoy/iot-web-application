<template>
    <div class="w-64 h-24 bg-themeColor-lightest rounded-2xl py-2 border-2 border-borderGray-medium">
        <div class="pl-3 flex">
            <label for="scenarioInput" class="text-tipScenarioTitle italic font-bold">{{ tipInfo }}</label>
            <input id="scenarioInput" v-model="scenarioValue" :placeholder="scenarioPlaceholder"
                class="w-32 ml-2 text-tipScenarioTitle" />
        </div>
        <div class="flex justify-end mt-4">
            <div
                class="bg-authiraryColor-blueMedium rounded-2xl text-tipDeleteTitle btnInfoW h-7 flex justify-center content-center mr-2">
                {{ confirmInfo }}
            </div>
            <div
                @click="closeSelfWindow"
                class="bg-authiraryColor-redMedium rounded-2xl text-tipDeleteTitle btnInfoW h-7 flex justify-center content-center mr-2">
                {{ cancelInfo }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import useInfosStore from '../../stores';

const emits = defineEmits(['closeAddScenarioTip']);

// import center store
const store = useInfosStore();

// import method of openDarkCover
const closeDarkCover = store.closeDarkCover;

// method to close this Tip window self / abort operation
const closeSelfWindow = () => {
    emits('closeAddScenarioTip');
    closeDarkCover();
}

const scenarioValue = ref("");
const scenarioPlaceholder = ref("Type here!");
const tipInfo = ref("Scenario : ");
const confirmInfo = ref("ADD");
const cancelInfo = ref("CANCEL");
</script>

<style scoped>
.btnInfoW {
    width: 4.5rem;
}</style>