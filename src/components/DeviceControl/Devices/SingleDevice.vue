<template>
    <div class="deviceContainer bg-themeColor-lightest rounded-3xl">
        <div class="pt-4 pl-4">
            <p class="text-deviceTitle font-bold italic">{{ deviceInfo.name }}</p>
        </div>
        <div class="pl-8 text-deviceTitle">
            <p class="pt-4 flex">
                <span class="italic">State : </span>
                <span class="ml-2">{{ deviceInfo.ConnectState }}</span>
                <i>
                    <IconConnected v-if="deviceInfo.state === 'On'" class="w-6 h-6"></IconConnected>
                    <IconDisconnected v-else class="w-6 h-6"></IconDisconnected>
                </i>
            </p>
            <p class="pt-4">
                <span class="italic">{{ deviceInfo.uniqueState.name }} : </span>
                <span>{{ deviceInfo.uniqueState.value }} </span>
                <span>{{ deviceInfo.uniqueState.scale }}</span>
            </p>
        </div>
        <div class="flex justify-between px-4 py-5 relative">
            <div class="deviceBtn rounded-2xl text-deviceTitle flex justify-center content-center"
                :class="{ deviceOn: deviceInfo.state === 'On', deviceOff: deviceInfo.state !== 'On' }">{{
                    deviceInfo.state }}</div>
            <div @click="openDeleteDeviceTip"
                class="deviceBtn rounded-2xl bg-themeColor-darkest text-themeColor-lightest text-deviceTitle flex justify-center content-center">
                {{ deviceInfo.moreText }}
            </div>
            <DeleteDeviceTip :deviceName="deviceInfo.name" @closeDeleteDeviceTip="closeDeleteDeviceTip" v-if="deleteDeviceTipFlag" class="absolute bottom-5 right-2 z-20"></DeleteDeviceTip>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import IconConnected from "../../icons/IconConnected.vue";
import IconDisconnected from "../../icons/IconDisconnected.vue";
import DeleteDeviceTip from "../../TipComponents/DeleteDeviceTip.vue";
import useInfosStore from "../../../stores";
import { subscribeDevice } from "../../../Tools/MqttOperations/mqttIndex";

const store = useInfosStore();

const that = defineProps({
    deviceInfo: Object
})
const deviceInfo = that.deviceInfo;

const client = store.client;
// macAddrees, client, type
client.on('connect', () => {
    subscribeDevice(deviceInfo.macAddress , client, deviceInfo.type);

    console.log("SEE!", 1, deviceInfo.macAddress , client, deviceInfo.type);
    client.on('message', (topic, message) => {
        console.log(topic + '返回的数据：' + message.toString())
    });
});

// import method of openDarkCover
const openDarkCover = store.openDarkCover;

const deleteDeviceTipFlag = ref(false);

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
.deviceContainer {
    width: 12.25rem;
    height: 12.25rem;
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