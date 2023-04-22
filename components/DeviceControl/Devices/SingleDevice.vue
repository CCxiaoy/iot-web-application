<template>
    <div class="deviceContainer bg-themeColor-lightest rounded-3xl">
        <div class="pt-4 pl-4">
            <p class="text-deviceTitle font-bold italic">{{ deviceInfo.name }}</p>
        </div>
        <div class="pl-8 text-deviceTitle">
            <p class="pt-4">
                <span>State : </span>
                <span>{{ deviceInfo.ConnectState }}</span>
            </p>
            <p class="pt-4">
                <span>{{ deviceInfo.uniqueState.name }} : </span>
                <span>{{ deviceInfo.uniqueState.value }} </span>
                <span>{{ deviceInfo.uniqueState.scale }}</span>
                <i></i>
            </p>
        </div>
        <div class="flex justify-between px-4 py-5">
            <div class="deviceBtn rounded-2xl text-deviceTitle flex justify-center content-center"
                :class="{ deviceOn: deviceInfo.state === 'On', deviceOff: deviceInfo.state !== 'On' }">{{
                    deviceInfo.state }}</div>
            <div
                class="deviceBtn rounded-2xl bg-themeColor-darkest text-themeColor-lightest text-deviceTitle flex justify-center content-center">
                {{ deviceInfo.moreText }}</div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue"

const deviceInfo = reactive({
    name: "Bulb-One",
    ConnectState: "Online",
    uniqueState: {
        name: "Light",
        value: "100",
        scale: "%"
    },
    state: "On",
    moreText: "Config",
})
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