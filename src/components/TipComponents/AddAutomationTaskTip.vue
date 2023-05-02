<template>
    <div
        class="addAutomateTaskTipW addAutomateTaskDeviceTipH bg-themeColor-lightest rounded-2xl py-5 border-2 border-borderGray-medium">
        <div class="pl-5 text-tipAddAutomateTaskTitle italic font-bold">
            {{ tipTitle }}
        </div>
        <div class="mt-3 pl-5 flex">
            <label for="deviceSelection" class="text-tipAddAutomateTaskTitle italic font-bold">{{ tipInfoSelectDevice
            }}</label>
            <select v-model="selectedDeviceNameValue" id="deviceSelection" class="ml-2 w-24">
                <option v-for="device in devicesInfo" :value="device.name" :key="device.name">
                    {{ device.name }}
                </option>
            </select>
        </div>
        <div class="mt-2 pl-5 flex">
            <label for="waySelection" class="text-tipAddAutomateTaskTitle italic font-bold">{{ tipInfoSelectWay }}</label>
            <select v-model="selectedWayValue" id="waySelection" class="ml-2 w-24">
                <option v-for="way in wayList" :value="way.value" :key="way.name">
                    {{ way.name }}
                </option>
            </select>
        </div>
        <div class="mt-2 pl-5 flex">
            <label for="operationSelection" class="text-tipAddAutomateTaskTitle italic font-bold">{{ tipInfoOperationWay
            }}</label>
            <select v-model="selectedOperationValue" id="operationSelection" class="ml-2 w-24">
                <option v-for="operation in operationList" :value="operation.value" :key="operation.name">
                    {{ operation.name }}
                </option>
            </select>
        </div>
        <div class="mt-2 pl-5 flex">
            <label for="operatorSelection" class="text-tipAddAutomateTaskTitle italic font-bold">{{ tipInfoSelectOperator
            }}</label>
            <select v-model="selectedOperatorValue" id="operatorSelection" class="ml-2 w-24">
                <option v-for="operator in operatorList" :value="operator.value" :key="operator.name">
                    {{ operator.name }}
                </option>
            </select>
        </div>
        <div class="mt-2 pl-5 flex">
            <label for="equationInput" class="text-tipAddAutomateTaskTitle italic font-bold">{{ tipInfoEquation }}</label>
            <span class="ml-2">{{ selectedOperatorValue }}</span>
            <input id="equationInput" type="time" v-model="inputEquationValue" maxlength="17"
                class="w-24 ml-2 text-tipAddDeviceTitle" />
        </div>
        <div class="flex justify-end mt-2 mb-6">
            <div @click="addNewAutomationTask"
                class="bg-authiraryColor-blueMedium rounded-2xl text-tipAddAutomateTaskTitle btnInfoW h-7 flex justify-center content-center mr-2">
                {{ confirmInfo }}
            </div>
            <div @click="closeSelfWindow"
                class="bg-authiraryColor-redMedium rounded-2xl text-tipAddAutomateTaskTitle btnInfoW h-7 flex justify-center content-center mr-4">
                {{ cancelInfo }}
            </div>
        </div>
    </div>
</template>

<script setup>
import useInfosStore from '../../stores';
import { ref } from 'vue'
import { wayList, operationList, operatorList } from '../../Tools/AutomationTask/comparingConfig'
import { computingTimeDiff } from '../../Tools/AutomationTask/computingTime'
import { switchDeviceState } from '../../Tools/MqttOperations/mqttIndex';

const store = useInfosStore();

const that = defineProps({
    devicesInfo: Array
})
// All devices info
const devicesInfo = that.devicesInfo;

const closeDarkCover = store.closeDarkCover;

const emits = defineEmits(['closeAddAutomationTaskTip', 'timerExecution'])
// method to close this Tip window self / abort operation
const closeSelfWindow = () => {
    emits('closeAddAutomationTaskTip');
    closeDarkCover();
}
// method to execute task after this window is closed
const timerExecution = (func, time) => {
    emits('timerExecution', func, time);
}

const tipTitle = ref("Please you fill information to automate operation?");

const tipInfoSelectDevice = ref("Device : ");
const selectedDeviceNameValue = ref("");

const tipInfoSelectWay = ref("Way : ");
const selectedWayValue = ref(wayList[0].value);

const tipInfoOperationWay = ref("operation : ");
const selectedOperationValue = ref(operationList[0].value);

const tipInfoSelectOperator = ref("Operator : ");
const selectedOperatorValue = ref(operatorList[0].value);

const tipInfoEquation = ref("Equation : ");
const inputEquationValue = ref("");

const confirmInfo = ref("ADD");
const cancelInfo = ref("CANCEL");

const deviceIndex = ref(0);

// calculate the corresponding index for specific device (by comparing device name)
const computeDeviceIndex = () => {
    for (deviceIndex.value = 0; deviceIndex.value < devicesInfo.length; deviceIndex.value++) {
        if (selectedDeviceNameValue.value === devicesInfo[deviceIndex.value].name) {
            break;
        }
    }
}

const client = store.client;

const addTimeAutomationTask = () => {
    const timeDiff = computingTimeDiff(inputEquationValue.value);
    if (selectedOperationValue.value === operationList[0].value) {
        timerExecution(() => {
            switchDeviceState(devicesInfo[deviceIndex.value].macAddress, client, devicesInfo[deviceIndex.value].type, operationList[1].value)
        }, timeDiff);
    }
    else if (selectedOperationValue.value === operationList[1].value) {
        timerExecution(() => {
            switchDeviceState(devicesInfo[deviceIndex.value].macAddress, client, devicesInfo[deviceIndex.value].type, operationList[0].value)
        }, timeDiff);
    }
}

const addNewAutomationTask = () => {
    computeDeviceIndex();
    if (selectedWayValue.value === wayList[0].name) {
        addTimeAutomationTask();
    }
    closeSelfWindow();
}
</script>

<style scoped>
.addAutomateTaskTipW {
    width: 18rem;
}

.addAutomateTaskDeviceTipH {
    height: 18rem;
}

.btnInfoW {
    width: 4.5rem;
}
</style>