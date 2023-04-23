<template>
    <div class="addDeviceTipW h-64 bg-themeColor-lightest rounded-2xl py-6 border-2 border-borderGray-medium">
        <div class="pl-4 flex">
            <label for="scenarioSelection" class="text-tipAddDeviceTitle italic font-bold">{{ tipInfoScenario }}</label>
            <select v-model="scenarioValue" class="ml-2" >
                <option v-for="scenario in AllScenarios" :value="scenario.title" :key="scenario.id">
                    {{ scenario.title }}
                </option>
            </select>
        </div>
        <div class="pl-3 flex mt-8">
            <label for="typeSelection" class="text-tipAddDeviceTitle italic font-bold">{{ tipInfoType }}</label>
            <select v-model="categoryValue" class="ml-2" >
                <option v-for="Category in allCategories" :value="Category.title" :key="Category.id">
                    {{ Category.title }}=
                </option>
            </select>
        </div>
        <div class="pl-3 flex mt-8">
            <label for="macInput" class="text-tipAddDeviceTitle italic font-bold">{{ tipInfoMac }}</label>
            <input id="macInput" type="" v-model="macAddressValue" :placeholder="macAddressPlaceholder" maxlength="17"
                class="w-44 ml-2 text-tipAddDeviceTitle" /> 
        </div>
        <div class="flex justify-end mt-10 mb-6">
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
import { storeToRefs } from 'pinia'
import useInfosStore from '../../stores';

const store = useInfosStore();
const { devices } = storeToRefs(store);
console.log(devices.value[0]);

const closeDarkCover = store.closeDarkCover;

const emits = defineEmits(['closeAddDeviceTip'])
// method to close this Tip window self / abort operation
const closeSelfWindow = () => {
    closeDarkCover();
    emits('closeAddDeviceTip');
}

const tipInfoScenario = ref("Scenario : ");
const scenarioValue = ref("Home");
const AllScenarios = reactive([
    {
        id: "Home",
        title: "Home",
    },
    {
        id: "Living Room",
        title: "Living Room",
    },
]);

const tipInfoType = ref("Type : ");
const categoryValue = ref("Lamp");
const allCategories = reactive([
    {
        id: "All",
        title: "All",
        url: "/",
    },
    {
        id: "Lamp",
        title: "Lamp",
        url: "/lamp",
    },
    {
        id: "Fan",
        title: "Fan",
        url: "/fan",
    },
    {
        id: "Sensor",
        title: "Sensor",
        url: "/sensor",
    }
])

const tipInfoMac = ref("Mac Address : ");
const macAddressPlaceholder = ref("6 Hexadecimal E0:22...");
const macAddressValue = ref("");

const confirmInfo = ref("ADD");
const cancelInfo = ref("CANCEL");
</script>

<style scoped>
.addDeviceTipW {
    width: 20rem;
}
.btnInfoW {
    width: 4.5rem;
}
</style>