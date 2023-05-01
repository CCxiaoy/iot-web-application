<template>
    <div class="addDeviceTipW addDeviceTipH bg-themeColor-lightest rounded-2xl py-6 border-2 border-borderGray-medium">
        <div class="pl-4 flex">
            <label for="scenarioSelection" class="text-tipAddDeviceTitle italic font-bold">{{ tipInfoScenario }}</label>
            <select v-model="scenarioValue" class="ml-2">
                <option v-for="scenario in scenarios" :value="scenario.title" :key="scenario.id">
                    {{ scenario.title }}
                </option>
            </select>
        </div>
        <div class="pl-3 flex mt-6">
            <label for="typeSelection" class="text-tipAddDeviceTitle italic font-bold">{{ tipInfoType }}</label>
            <select v-model="categoryValue" class="ml-2">
                <option v-for="category in categories" :value="category.title" :key="category.id">
                    {{ category.title }}
                </option>
            </select>
        </div>
        <div class="pl-3 flex mt-6">
            <label for="nameInput" class="text-tipAddDeviceTitle italic font-bold">{{ tipInfoDeviceName }}</label>
            <input id="nameInput" type="" v-model="deviceNameValue" :placeholder="deviceNamePlaceholder"
                class="w-44 ml-2 text-tipAddDeviceTitle" />
        </div>
        <div class="pl-3 flex mt-6">
            <label for="macInput" class="text-tipAddDeviceTitle italic font-bold">{{ tipInfoMac }}</label>
            <input id="macInput" type="" v-model="macAddressValue" :placeholder="macAddressPlaceholder" maxlength="17"
                class="w-44 ml-2 text-tipAddDeviceTitle" />
        </div>
        <div class="flex justify-end mt-10 mb-6">
            <div
                @click="addNewDevice"
                class="bg-authiraryColor-blueMedium rounded-2xl text-tipDeleteTitle btnInfoW h-7 flex justify-center content-center mr-2">
                {{ confirmInfo }}
            </div>
            <div @click="closeSelfWindow"
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


const closeDarkCover = store.closeDarkCover;

const emits = defineEmits(['closeAddDeviceTip'])
// method to close this Tip window self / abort operation
const closeSelfWindow = () => {
    emits('closeAddDeviceTip');
    closeDarkCover();
}

const tipInfoScenario = ref("Scenario : ");
const scenarioValue = ref("Home");
const { scenarios, categories } = storeToRefs(store);

const tipInfoType = ref("Type : ");
const categoryValue = ref("Lamp");

const tipInfoDeviceName = ref("Device Name : ");
const deviceNamePlaceholder = ref("Type device name");
const deviceNameValue = ref("");

const tipInfoMac = ref("Mac Address : ");
const macAddressPlaceholder = ref("6 Hexadecimal E0:22...");
const macAddressValue = ref("");

const confirmInfo = ref("ADD");
const cancelInfo = ref("CANCEL");

const addNewDevice = () => {
    store.addNewDevice(scenarioValue.value, categoryValue.value, deviceNameValue.value, macAddressValue.value);
    closeSelfWindow();
}
</script>

<style scoped>
.addDeviceTipW {
    width: 20rem;
}

.addDeviceTipH {
    height: 18rem;
}

.btnInfoW {
    width: 4.5rem;
}
</style>