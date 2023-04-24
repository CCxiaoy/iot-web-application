<template>
    <div class="w-56 h-24 bg-themeColor-lightest rounded-2xl py-1 border-2 border-borderGray-medium">
        <div class="text-tipDeleteTitle pl-3 italic font-bold">
            {{ tipInfo }}
        </div>
        <div class="flex justify-end">
            <div
                @click="deleteOldDevice(deviceName)"
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

const that = defineProps({
    deviceName: String
})

const deviceName = that.deviceName;

const store = useInfosStore();

// get reference of closeDarkCover from center store
const closeDarkCover = store.closeDarkCover;

const emits = defineEmits(['closeDeleteDeviceTip']);
// method to close this Tip window self / abort operation
const closeSelfWindow = () => {
    closeDarkCover();
    emits('closeDeleteDeviceTip');
}

// get reference of deleteOldDevice
const deleteOldDevice = (deviceName) => {
    store.deleteOldDevice(deviceName);
    closeSelfWindow();
}


const tipInfo = ref("Do you confirm to delete this device");
const confirmInfo = ref("Confirm");
const cancelInfo = ref("CANCEL");
</script>

<style scoped>
.btnInfoW {
    width: 4.5rem;
}
</style>