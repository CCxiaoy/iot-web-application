import { defineStore } from 'pinia'

const useInfosStore = defineStore("store", {
    // data store
    state: () => {
        return {
            darkCoverFlag: false,
            devices: [
                {
                    name: "Bulb-One",
                    ConnectState: "Online",
                    uniqueState: {
                        name: "Light",
                        value: "100",
                        scale: "%"
                    },
                    state: "On",
                    moreText: "Delete",
                    scenario: "Home",
                    type: "Lamp",
                    macAddress: "",
                },
                {
                    name: "Fan-One",
                    ConnectState: "Offline",
                    uniqueState: {
                        name: "Speed",
                        value: "100",
                        scale: "%"
                    },
                    state: "Off",
                    moreText: "Delete",
                    scenario: "Home",
                    type: "Fan",
                    macAddress: "",
                },
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
        changeDarkCoverFlag(newVal) {
            this.darkCoverFlag = newVal;
        },
        closeDarkCover() {
            this.changeDarkCoverFlag(false);
        },
        openDarkCover () {
            this.changeDarkCoverFlag(true);
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