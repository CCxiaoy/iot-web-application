import { defineStore } from 'pinia'
import { createDevice } from '../Tools/StoreOperations/createNewDeviceObj';

const useInfosStore = defineStore("store", {
    // data store
    state: () => {
        return {
            darkCoverFlag: false,
            devices: [
            ],
            scenarios: [],
            categories: [],
        }
    },
    getters: {
        // getDarkCoverFlag() {

        // }
    },
    actions: {
        // Dark Cover Realted
        changeDarkCoverFlag(newVal) {
            this.darkCoverFlag = newVal;
        },
        closeDarkCover() {
            this.changeDarkCoverFlag(false);
        },
        openDarkCover() {
            this.changeDarkCoverFlag(true);
        },
        // Add New Device
        addNewDevice(deviceScenario, deviceType, deviceName, macAddress) {
            const newDevice = JSON.parse(JSON.stringify(createDevice(deviceScenario, deviceType, deviceName, macAddress)));
            this.devices.push(newDevice)
        }
    },
    // data persist
    persist: true,
})

export default useInfosStore


// import useDevicesStore from "./devices";
// import useCategoriesStore from "./categories";

// export default function useStore() {
//     return {
//         devicesInfo: useDevicesStore(),
//         categoriesInfo: useCategoriesStore(),
//     }
// }