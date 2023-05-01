import { defineStore } from "pinia";
import { createDevice } from "../Tools/StoreOperations/createNewDeviceObj";
import { createScenario } from "../Tools/StoreOperations/createNewScenarioObj";
import { calculateScenario } from "../Tools/StoreOperations/calculateScenarioPage";
import { scenarioFilter } from "../Tools/StoreOperations/FilterOperations/scenarioFilter";
import { typeFilter } from "../Tools/StoreOperations/FilterOperations/typeFilter";
import {
  connectToMQTTServer,
  initialConnection,
  subscribeDevice,
  unsubscribeDevice,
} from "../Tools/MqttOperations/mqttIndex.js";
import {
  isLampTopic,
  isLampStatusTopic,
  isLampConnectionStatusTopic,
  isLampPowerStatusTopic,
  isLampDeviceName,
} from "../Tools/MqttOperations/lightMqttOperations";
import {
  isLightSensorConnectionStatusTopic,
  isLightSensorDeviceName,
  isLightSensorPowerStatusTopic,
  isLightSensorStatusTopic,
  isLightSensorTopic,
} from "../Tools/MqttOperations/brightnessMqtt";
import {
  isHumidSensorConnectionStatusTopic,
  isHumidSensorPowerStatusTopic,
  isHumidSensorStatusTopic,
  isHumidSensorTopic,
} from "../Tools/MqttOperations/humidMqtt";
import {
  isTemperatureSensorConnectionStatusTopic,
  isTemperatureSensorPowerStatusTopic,
  isTemperatureSensorStatusTopic,
  isTemperatureSensorTopic,
} from "../Tools/MqttOperations/temperatureMqtt";
import {
  isFanConnectionStatusTopic,
  isFanPowerStatusTopic,
  isFanStatusTopic,
  isFanTopic,
} from "../Tools/MqttOperations/fanMqtt";

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
        },
      ],
    };
  },
  getters: {
    getDevices: (state) => {
      return state.devices
        .filter((device) => {
          return scenarioFilter(
            state.scenarios[state.currentPage].title,
            device.scenario
          );
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
    },
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
      const newDevice = JSON.parse(
        JSON.stringify(
          createDevice(deviceScenario, deviceType, deviceName, macAddress)
        )
      );
      this.devices.push(newDevice);
      subscribeDevice(newDevice.macAddress, this.client, newDevice.type);
      this.handleNewDeviceCallback(newDevice.name);
    },
    // callback to handle New Device's coming Topic
    handleNewDeviceCallback(deviceName) {
      this.client.on("message", (topic, message) => {
        // process subscribe message
        let comingMessage = message.toString();
        // Lamp's Topic
        if (isLampTopic(topic) && isLampDeviceName(deviceName)) {
          console.log("upLamp", topic, comingMessage, deviceName);
          this.updateLampDeviceInfo(topic, comingMessage, deviceName);
        }
        // Light Sensor's Topic
        if (isLightSensorTopic(topic) && isLightSensorDeviceName(deviceName)) {
          console.log("upBtSensor", topic, comingMessage, deviceName);
          this.updateLightSensorDeviceInfo(topic, comingMessage, deviceName);
        }
        // Fan's Topic
        if (isFanTopic(topic)) {
          console.log("upFan", topic, comingMessage, deviceName);
          this.updateFanDeviceInfo(topic, comingMessage, deviceName);
        }
        // Humid Sensor's Topic
        if (isHumidSensorTopic(topic)) {
          console.log("upHmSensor", topic, comingMessage, deviceName);
          this.updateHumidSensorDeviceInfo(topic, comingMessage, deviceName);
        }
        // Temperature Sensor's Topic
        if (isTemperatureSensorTopic(topic)) {
          console.log("upTpSensor", topic, comingMessage, deviceName);
          this.updateTemperatureSensorDeviceInfo(
            topic,
            comingMessage,
            deviceName
            );
          }
        console.log(topic + "返回的数据：" + message.toString());
      });
    },
    // Delete Existed Device
    deleteOldDevice(deviceName) {
      let index,
        found = false;
      for (index = 0; index < this.devices.length; index++) {
        if (this.devices[index].name === deviceName) {
          found = true;
          unsubscribeDevice(
            this.devices[index].macAddress,
            this.client,
            this.devices[index].type
          );
          break;
        }
      }
      if (found) {
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
      this.currentPage = calculateScenario(
        -1,
        this.currentPage,
        this.scenarios.length
      );
    },
    // Switch to next scenario
    nextScenario() {
      this.currentPage = calculateScenario(
        1,
        this.currentPage,
        this.scenarios.length
      );
    },
    // Back to Home scenario
    backToHomeScenario() {
      let index;
      let homeScenarioID = "Home";
      for (index = 0; index < this.scenarios.length; index++) {
        if (this.scenarios[index].id === homeScenarioID) {
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
    // Light Sensor state update
    updateLightSensorState(message, deviceIndex) {
      this.devices[deviceIndex].state = message;
    },
    // Light Sensor connection state update
    updateLightSensorConnectionState(message, deviceIndex) {
      this.devices[deviceIndex].connectState = message;
    },
    // Light Sensor power state update
    updateLightSensorPowerState(message, deviceIndex) {
      this.devices[deviceIndex].uniqueState.value = message;
    },
    // Fan state update
    updateFanState(message, deviceIndex) {
      this.devices[deviceIndex].state = message;
    },
    // Fan connection state update
    updateFanConnectionState(message, deviceIndex) {
      this.devices[deviceIndex].connectState = message;
    },
    // Fan power state update
    updateFanPowerState(message, deviceIndex) {
      this.devices[deviceIndex].uniqueState.value = message;
    },
    // Humid Sensor state update
    updateHumidSensorState(message, deviceIndex) {
      this.devices[deviceIndex].state = message;
    },
    // Humid Sensor connection state update
    updateHumidSensorConnectionState(message, deviceIndex) {
      this.devices[deviceIndex].connectState = message;
    },
    // Humid Sensor power state update
    updateHumidSensorPowerState(message, deviceIndex) {
      this.devices[deviceIndex].uniqueState.value = message;
    },
    // Temperature Sensor state update
    updateTemperatureSensorState(message, deviceIndex) {
      this.devices[deviceIndex].state = message;
    },
    // Temperature Sensor connection state update
    updateTemperatureSensorConnectionState(message, deviceIndex) {
      this.devices[deviceIndex].connectState = message;
    },
    // Temperature Sensor power state update
    updateTemperatureSensorPowerState(message, deviceIndex) {
      this.devices[deviceIndex].uniqueState.value = message;
    },
    // Single Device Info manipulate
    // Lamp message entry function
    updateLampDeviceInfo(topic, message, deviceName) {
      let index;
      for (index = 0; index < this.devices.length; index++) {
        if (deviceName === this.devices[index].name) {
          break;
        }
      }
      if (isLampStatusTopic(topic)) {
        this.updateLampState(message, index);
      }
      if (isLampConnectionStatusTopic(topic)) {
        this.updateLampConnectionState(message, index);
      }
      if (isLampPowerStatusTopic(topic)) {
        this.updateLampPowerState(message, index);
      }
    },
    // Light Sensor entry function
    updateLightSensorDeviceInfo(topic, message, deviceName) {
      let index;
      for (index = 0; index < this.devices.length; index++) {
        if (deviceName === this.devices[index].name) {
          break;
        }
      }
      if (isLightSensorStatusTopic(topic)) {
        this.updateLightSensorState(message, index);
      }
      if (isLightSensorConnectionStatusTopic(topic)) {
        this.updateLightSensorConnectionState(message, index);
      }
      if (isLightSensorPowerStatusTopic(topic)) {
        this.updateLightSensorPowerState(message, index);
      }
    },
    // Fan message entry function
    updateFanDeviceInfo(topic, message, deviceName) {
      let index;
      for (index = 0; index < this.devices.length; index++) {
        if (deviceName === this.devices[index].name) {
          break;
        }
      }
      if (isFanStatusTopic(topic)) {
        this.updateFanState(message, index);
      }
      if (isFanConnectionStatusTopic(topic)) {
        this.updateFanConnectionState(message, index);
      }
      if (isFanPowerStatusTopic(topic)) {
        this.updateFanPowerState(message, index);
      }
    },
    // Humid Sensor entry function
    updateHumidSensorDeviceInfo(topic, message, deviceName) {
      let index;
      for (index = 0; index < this.devices.length; index++) {
        if (deviceName === this.devices[index].name) {
          break;
        }
      }
      if (isHumidSensorStatusTopic(topic)) {
        this.updateHumidSensorState(message, index);
      }
      if (isHumidSensorConnectionStatusTopic(topic)) {
        this.updateHumidSensorConnectionState(message, index);
      }
      if (isHumidSensorPowerStatusTopic(topic)) {
        this.updateHumidSensorPowerState(message, index);
      }
    },
    // Humid Sensor entry function
    updateTemperatureSensorDeviceInfo(topic, message, deviceName) {
      let index;
      for (index = 0; index < this.devices.length; index++) {
        if (deviceName === this.devices[index].name) {
          break;
        }
      }
      if (isTemperatureSensorStatusTopic(topic)) {
        this.updateTemperatureSensorState(message, index);
      }
      if (isTemperatureSensorConnectionStatusTopic(topic)) {
        this.updateTemperatureSensorConnectionState(message, index);
      }
      if (isTemperatureSensorPowerStatusTopic(topic)) {
        this.updateTemperatureSensorPowerState(message, index);
      }
    },
  },
  // data persist
  persist: true,
});

export default useInfosStore;
