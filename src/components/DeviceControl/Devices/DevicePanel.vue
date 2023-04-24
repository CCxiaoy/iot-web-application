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
import { ref, reactive, computed } from "vue"
import IconAddNewDevice from '../../icons/IconAddNewDevice.vue';
import SingleDevice from './SingleDevice.vue';
import AddDeviceTip from "../../TipComponents/AddDeviceTip.vue";
import { storeToRefs } from 'pinia'
import useInfosStore from "../../../stores";

const addDeviceTipFlag = ref(false);


// import center store
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

const devices = computed(() => store.getDevices);
</script>

<style scoped>
#devicePanel {
    height: 87vh;
}
</style>