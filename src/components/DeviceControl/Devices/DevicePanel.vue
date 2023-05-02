<template>
    <div id="devicePanel" class="bg-themeColor-dark mx-12 rounded-3xl overflow-auto">
        <div class="pt-10 pb-4 px-12 flex flex-row-reverse">
            <!-- Button about adding a new Device -->
            <i class="w-16 h-8 ml-4 rounded-2xl bg-themeColor-lightest flex justify-center content-center relative">
                <IconAddNewDevice @click="openAddDeviceTip" class="w-8 h-8"></IconAddNewDevice>
                <AddDeviceTip  v-if="addDeviceTipFlag" @closeAddDeviceTip="closeAddDeviceTip" class="absolute right-1 top-10 z-20"></AddDeviceTip>
            </i>
            <!-- Button about creating an automate task -->
            <i class="w-16 h-8 ml-4 rounded-2xl bg-themeColor-lightest flex justify-center content-center relative">
                <IconAddAutomateTask @click="openAddAutomationTaskTip" class="w-8 h-8"></IconAddAutomateTask>
                <AddAutomationTaskTip v-if="addAutomationTaskTipFlag" :devicesInfo="devices" @timerExecution="timerExecution" @closeAddAutomationTaskTip="closeAddAutomationTaskTip"  class="absolute right-1 top-10 z-20"></AddAutomationTaskTip>
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
import IconAddAutomateTask from "../../icons/IconAddAutomateTask.vue";
import SingleDevice from './SingleDevice.vue';
import AddDeviceTip from "../../TipComponents/AddDeviceTip.vue";
import AddAutomationTaskTip from "../../TipComponents/AddAutomationTaskTip.vue"
import { storeToRefs } from 'pinia'
import useInfosStore from "../../../stores";

// import center store
const store = useInfosStore();

// import method of openDarkCover
const openDarkCover = store.openDarkCover;

// computed the device information in reactive form
const devices = computed(() => store.getDevices);

// Flag control the show of AddDevice Tip
const addDeviceTipFlag = ref(false);

// open AddDevice Tip
const openAddDeviceTip = () => {
    openDarkCover();
    addDeviceTipFlag.value = true;
}

// pass to AddDeviceTip as a response to cancel operation
const closeAddDeviceTip = () => {
    addDeviceTipFlag.value = false;
}

// Flag control the show of AutomationTask Tip
const addAutomationTaskTipFlag = ref(false);

// open AddAutomationTask Tip
const openAddAutomationTaskTip = () => {
    openDarkCover();
    addAutomationTaskTipFlag.value = true;
}

// pass to AddAutomationTaskTip as a response to cancel operation
const closeAddAutomationTaskTip = () => {
    addAutomationTaskTipFlag.value = false;
}

// pass a encapsulate setTimeout to AddAutomationTaskTip
const timerExecution = (func, time) => {
    setTimeout(func, time);
}

</script>

<style scoped>
#devicePanel {
    height: 87vh;
}
</style>