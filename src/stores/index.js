import { defineStore } from 'pinia'
import { createDevice } from '../Tools/StoreOperations/createNewDeviceObj';
import { createScenario } from '../Tools/StoreOperations/createNewScenarioObj';
import { calculateScenario } from '../Tools/StoreOperations/calculateScenarioPage';
import { scenarioFilter } from '../Tools/StoreOperations/FilterOperations/scenarioFilter';
import { typeFilter } from '../Tools/StoreOperations/FilterOperations/typeFilter';
import { connectToMQTTServer, initialConnection, subscribeDevice, unsubscribeDevice} from '../Tools/MqttOperations/mqttIndex.js';
import { isLampTopic, isLampStatusTopic, isLampConnectionStatusTopic, isLampPowerStatusTopic } from '../Tools/MqttOperations/lightMqttOperations';

const useInfosStore = defineStore("store", {
    // data store
    state: () => {
        return {
            darkCoverFlag: false,
            client: {},
            currentSideNav: "All",
            currentPage: 0,
            devices: [
                // {
                //     name: "Bulb-One",
                //     connectState: "Online",
                //     uniqueState: {
                //         name: "Light",
                //         value: "100",
                //         scale: "%"
                //     },
                //     state: "On",
                //     moreText: "Config",
                //     scenario: "Home",
                //     type: "Lamp",
                //     macAddress: "",
                // },
            ],
            scenarios: [
                {
                    id: "Home",
                    title: "Home",
                },
                {
                    id: "Living Room",
                    title: "Living Room",
                },
            ],
            categories: [
                {
                    id: "Lamp",
                    title: "Lamp",
                    url: "/lamp",
                },
                {
                    id: "Fan",
                    title: "Fan",
                    url: "/fan",
                },
                {
                    id: "BrightnessSensor",
                    title: "BrightnessSensor",
                    url: "/BrightnessSensor",
                },
                {
                    id: "HumidSensor",
                    title: "HumidSensor",
                    url: "/HumidSensor",
                },
                {
                    id: "TemperatureSensor",
                    title: "TemperatureSensor",
                    url: "/TemperatureSensor",
                },
            ],
            SideNavigatorCategories: [
                {
                    id: "All",
                    title: "All",
                    url: "/",
                },
                {
                    id: "Lamp",
                    title: "Lamp",
                    url: "/lamp",
                },
                {
                    id: "Fan",
                    title: "Fan",
                    url: "/fan",
                },
                {
                    id: "Sensor",
                    title: "Sensor",
                    url: "/sensor",
                }                
            ]
        }
    },
    getters: {
        getDevices: (state) => {
            return state
                    .devices
                    .filter((device) => {
                            return scenarioFilter(state.scenarios[state.currentPage].title, device.scenario);
                    })
                    .filter((device) => {
                            return typeFilter(state.currentSideNav, device.type);
                    });
                    // let scenarioFiltered = state.devices.filter((device) => {
                    //     return scenarioFilter(state.scenarios[state.currentPage].title, device.scenario);
                    // })
                    // let typeFilter = state.devices.filter((device) => {
                    //     return typeFilter(state.scenarios[state.currentPage].title, device.scenario);
                    // })
        }
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
            this.devices.push(newDevice);
            subscribeDevice(newDevice.macAddress, this.client, newDevice.type);
            this.handleNewDeviceCallback(newDevice.name);
        },
        // callback to handle New Device's coming Topic
        handleNewDeviceCallback(deviceName) {
            this.client.on('message', (topic, message) => {
                // process subscribe message
                let comingMessage = message.toString();
                // Lamp's Topic
                if(isLampTopic(topic)) {
                    this.updateLampDeviceInfo(topic, comingMessage, deviceName);
                }
                // Fan's Topic
                // if() {
        
                // }
                // if() {
                    
                // }
                // if() {
                    
                // }
                // if() {
                    
                // }
                console.log(topic + '返回的数据：' + message.toString())
            });
        },
        // Delete Existed Device
        deleteOldDevice(deviceName) {
            let index, found = false;
            for(index = 0; index < this.devices.length; index++) {
                if(this.devices[index].name === deviceName) {
                    found = true;
                    unsubscribeDevice(this.devices[index].macAddress, this.client, this.devices[index].type);
                    break;
                }
            }
            if(found) {
                this.devices.splice(index, 1);
            }
        },
        // Add New Scenario
        addNewScenario(title) {
            const newScenario = JSON.parse(JSON.stringify(createScenario(title)));
            this.scenarios.push(newScenario);
        },
        // Switch to previous scenario
        previousScenario() {
            this.currentPage = calculateScenario(-1, this.currentPage, this.scenarios.length);
        },
        // Switch to next scenario
        nextScenario() {
            this.currentPage = calculateScenario(1, this.currentPage, this.scenarios.length);
        },
        // Back to Home scenario
        backToHomeScenario() {
            let index;
            let homeScenarioID = "Home";
            for(index = 0; index < this.scenarios.length; index++) {
                if(this.scenarios[index].id === homeScenarioID) {
                    break;
                }
            }
            this.currentPage = index;
        },
        // Change currentSideNav
        sideNavChange(newNav) {
            this.currentSideNav = newNav;
        },
        // renew mqtt connection
        renewMqttConnection() {
            this.client = connectToMQTTServer();
            initialConnection(this.client);
        },
        // Lamp state update
        updateLampState(message, deviceIndex) {
            this.devices[deviceIndex].state = message;
        },
        // Lamp connection state update
        updateLampConnectionState(message, deviceIndex) {
            this.devices[deviceIndex].connectState = message;
        },
        // Lamp power state update
        updateLampPowerState(message, deviceIndex) {
            this.devices[deviceIndex].uniqueState.value = message;
        },
        // Single Device Info manipulate
        // Lamp message entry function
        updateLampDeviceInfo(topic, message, deviceName) {
            let index;
            for(index = 0; index < this.devices.length; index++) {
                if(deviceName === this.devices[index].name) {
                    break;
                }
            }
            if(isLampStatusTopic(topic)) {
                this.updateLampState(message, index);
            }
            if(isLampConnectionStatusTopic(topic)) {
                this.updateLampConnectionState(message, index);
            }
            if(isLampPowerStatusTopic(topic)) {
                this.updateLampPowerState(message, index);
            }
        },
        // Fan message entry function
    },
    // data persist
    persist: true,
})

export default useInfosStore