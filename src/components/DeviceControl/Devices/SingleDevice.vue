<template>
    <div class="deviceContainer w-40 h-40 bg-themeColor-lightest rounded-3xl">
        <div class="tablet:pt-4 tablet:pl-4 pt-2 pl-2">
            <p class="text-deviceTitle font-bold italic">{{ deviceInfo.name }}</p>
        </div>
        <div class="tablet:pl-8 pl-4 text-deviceTitle">
            <p class="tablet:pt-4 pt-2 flex">
                <span class="italic">State : </span>
                <span class="tablet:ml-2 ml-1">{{ deviceInfo.connectState }}</span>
                <i>
                    <IconConnected v-if="deviceInfo.connectState === 'Online'" class="w-6 h-6"></IconConnected>
                    <IconDisconnected v-else class="w-6 h-6"></IconDisconnected>
                </i>
            </p>
            <p class="tablet:pt-4 pt-2">
                <span class="italic">{{ deviceInfo.uniqueState.name }} : </span>
                <span>{{ deviceInfo.uniqueState.value }} </span>
                <span>{{ deviceInfo.uniqueState.scale }}</span>
            </p>
        </div>
        <div class="flex justify-between tablet:px-4 tablet:py-5 px-2 py-2 relative">
            <div @click="switchDevice()"
                class="deviceBtn rounded-2xl text-deviceTitle flex justify-center content-center font-bold"
                :class="{ deviceOn: deviceInfo.state === 'On', deviceOff: deviceInfo.state !== 'On' }">{{
                    deviceInfo.state }}</div>
            <div @click="openDeleteDeviceTip"
                class="deviceBtn rounded-2xl bg-themeColor-darkest text-themeColor-lightest text-deviceTitle flex justify-center content-center font-bold">
                {{ deviceInfo.moreText }}
            </div>
            <DeleteDeviceTip :deviceName="deviceInfo.name" @closeDeleteDeviceTip="closeDeleteDeviceTip"
                v-if="deleteDeviceTipFlag" class="absolute bottom-5 right-2 z-20"></DeleteDeviceTip>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import IconConnected from "../../icons/IconConnected.vue";
import IconDisconnected from "../../icons/IconDisconnected.vue";
import DeleteDeviceTip from "../../TipComponents/DeleteDeviceTip.vue";
import useInfosStore from "../../../stores";
import { subscribeDevice, switchDeviceState } from "../../../Tools/MqttOperations/mqttIndex";

const store = useInfosStore();

const that = defineProps({
    deviceInfo: Object
})
// Single device info
const deviceInfo = that.deviceInfo;

const client = store.client;
// const updateLampDeviceInfo = store.updateLampDeviceInfo;
const handleNewDeviceCallback = store.handleNewDeviceCallback;
// macAddrees, client, type
client.on('connect', () => {
    // 订阅相关信息
    subscribeDevice(deviceInfo.macAddress, client, deviceInfo.type);
    handleNewDeviceCallback(deviceInfo.name);
});

// switch to control 
// when btn shows on, click it means to close it, then it changes to off
// when btn shows off, click it means to close it, then it changes to on
const switchDevice = () => {
    switchDeviceState(deviceInfo.macAddress, client, deviceInfo.type, deviceInfo.state);
}

// import method of openDarkCover
const openDarkCover = store.openDarkCover;

// variable controls the showing of delteDviceTip
const deleteDeviceTipFlag = ref(false);

// show delteDviceTip
const openDeleteDeviceTip = () => {
    openDarkCover();
    deleteDeviceTipFlag.value = true;
}

// pass to DeleteDeviceTip as a response to cancel operation
const closeDeleteDeviceTip = () => {
    deleteDeviceTipFlag.value = false;
}

</script>

<style scoped>
@media screen and (min-width:880px){
    .deviceContainer {
        width: 12.25rem;
        height: 12.25rem;
    }
}

.deviceBtn {
    width: 5rem;
    height: 2rem;
}

.deviceOn {
    background-color: #3CDC94;
}

.deviceOff {
    background-color: #FE5857;
}
</style>