<template>
    <div id="devicePanel" class="bg-themeColor-dark mx-12 rounded-3xl overflow-auto">
        <div class="pt-10 pb-4 px-12 flex flex-row-reverse">
            <i class="w-16 h-8 ml-4 rounded-2xl bg-themeColor-lightest flex justify-center content-center relative">
                <IconAddNewDevice @click="openAddDeviceTip" class="w-8 h-8"></IconAddNewDevice>
                <AddDeviceTip  v-if="addDeviceTipFlag" @closeAddDeviceTip="closeAddDeviceTip" class="absolute right-1 top-10 z-20"></AddDeviceTip>
            </i>
        </div>
        <div class="flex flex-wrap px-7">
            <SingleDevice class="mx-6 mt-12" v-for="device in devices" :key="device.name" :deviceInfo="device" ></SingleDevice>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import IconAddNewDevice from '../../icons/IconAddNewDevice.vue';
import SingleDevice from './SingleDevice.vue';
import AddDeviceTip from "../../TipComponents/AddDeviceTip.vue";
import { storeToRefs } from 'pinia'
import useInfosStore from "../../../stores";

const addDeviceTipFlag = ref(false);

const store = useInfosStore();

// import method of openDarkCover
const openDarkCover = store.openDarkCover;

const openAddDeviceTip = () => {
    openDarkCover();
    addDeviceTipFlag.value = true;
}

// pass to AddDeviceTip as a response to cancel operation
const closeAddDeviceTip = () => {
    addDeviceTipFlag.value = false;
}

const { devices } = storeToRefs(store);

// const devicesInfo = reactive([
//     {
//         name: "Bulb-One",
//         ConnectState: "Online",
//         uniqueState: {
//             name: "Light",
//             value: "100",
//             scale: "%"
//         },
//         state: "On",
//         moreText: "Delete",
//         scenario: "Home",
//         type: "Lamp",
//         macAddress: "",
//     },
//     {
//         name: "Fan-One",
//         ConnectState: "Offline",
//         uniqueState: {
//             name: "Speed",
//             value: "100",
//             scale: "%"
//         },
//         state: "Off",
//         moreText: "Delete",
//         scenario: "Home",
//         type: "Fan",
//         macAddress: "",
//     },
//     {
//         name: "LightSensor-One",
//         ConnectState: "Online",
//         uniqueState: {
//             name: "Brightness",
//             value: "80",
//             scale: "%",
//         },
//         state: "On",
//         moreText: "Delete",
//         scenario: "Home",
//         type: "Sensor",
//         macAddress: "",
//     },
//     {
//         name: "HumidSensor-One",
//         ConnectState: "Online",
//         uniqueState: {
//             name: "Humidity",
//             value: "80",
//             scale: "%"
//         },
//         state: "On",
//         moreText: "Delete",
//         scenario: "Home",
//         type: "Sensor",
//         macAddress: "",
//     },
//     {
//         name: "TempSensor-One",
//         ConnectState: "Online",
//         uniqueState: {
//             name: "Celsius",
//             value: "27",
//             scale: "℃"
//         },
//         state: "On",
//         moreText: "Delete",
//         scenario: "Home",
//         type: "Sensor",
//         macAddress: "",
//     }
// ])
</script>

<style scoped>
#devicePanel {
    height: 87vh;
}
</style>