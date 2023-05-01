import { subscribeOptions, publishOptions } from "./Config/mqttConfig";

const lightSensorPrefix = {
  isLightSensor: "lightSensor-",
  status: "lightSensor-status-",
  connectionStatus: "lightSensor-connection-status-",
  power: "lightSensor-power-status-",
  switch: "lightSensor-",
  name: "Bright",
};

const lightSensorState = {
  open: "1",
  close: "0",
};

// method to change light state
const changeLightSensorState = async (macAddrees, client, lightSensorState) => {
  const mqttTopic = lightSensorPrefix.switch + macAddrees;
  // console.log("SEE!", mqttTopic, macAddrees, client, lightSensorState);
  client.publish(mqttTopic, lightSensorState, publishOptions);
};

// method to open light
const openLightSensor = (macAddrees, client) => {
  changeLightSensorState(macAddrees, client, lightSensorState.open);
};

// method to close light
const closeLightSensor = (macAddrees, client) => {
  changeLightSensorState(macAddrees, client, lightSensorState.close);
};

// method to subscribe light state
const subscribeLightSensorState = (macAddrees, client) => {
  const mqttTopic = lightSensorPrefix.status + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light connection state
const subscribeLightSensorConnectionState = (macAddrees, client) => {
  const mqttTopic = lightSensorPrefix.connectionStatus + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light power state
const subscribeLightSensorPowerState = (macAddrees, client) => {
  const mqttTopic = lightSensorPrefix.power + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe all light topic
const subscribeAllLightSensorState = (macAddrees, client) => {
  subscribeLightSensorState(macAddrees, client);
  subscribeLightSensorConnectionState(macAddrees, client);
  subscribeLightSensorPowerState(macAddrees, client);
};

// method to subscribe light state
const unsubscribeLightSensorState = (macAddrees, client) => {
  const mqttTopic = lightSensorPrefix.status + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light connection state
const unsubscribeLightSensorConnectionState = (macAddrees, client) => {
  const mqttTopic = lightSensorPrefix.connectionStatus + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light power state
const unsubscribeLightSensorPowerState = (macAddrees, client) => {
  const mqttTopic = lightSensorPrefix.power + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

const unsubscribeAllLightSensorState = (macAddrees, client) => {
  unsubscribeLightSensorState(macAddrees, client);
  unsubscribeLightSensorConnectionState(macAddrees, client);
  unsubscribeLightSensorPowerState(macAddrees, client);
};

// method to determine if deviceName received is a Light Sensor device' name
const isLightSensorDeviceName = (deviceName) => {
  if (
    deviceName.length >= lightSensorPrefix.name.length &&
    deviceName.slice(0, lightSensorPrefix.name.length) ===
      lightSensorPrefix.name
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor state Topic
const isLightSensorTopic = (topic) => {
  // console.log(topic, topic.slice(0, lightSensorPrefix.isLightSensor.length));
  if (
    topic.slice(0, lightSensorPrefix.isLightSensor.length) ===
    lightSensorPrefix.isLightSensor
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor "autoLight-status-"" Topic
const isLightSensorStatusTopic = (topic) => {
  // console.log(topic, topic.slice(0, lightSensorPrefix.status.length));
  if (
    topic.slice(0, lightSensorPrefix.status.length) === lightSensorPrefix.status
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor connection "autoLight-connection-status-" Topic
const isLightSensorConnectionStatusTopic = (topic) => {
  // console.log(topic, topic.slice(0, lightSensorPrefix.connectionStatus.length));
  if (
    topic.slice(0, lightSensorPrefix.connectionStatus.length) ===
    lightSensorPrefix.connectionStatus
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor power: "autoLight-power-status-" Topic,
const isLightSensorPowerStatusTopic = (topic) => {
  // console.log(topic, topic.slice(0, lightSensorPrefix.power.length));
  if (
    topic.slice(0, lightSensorPrefix.power.length) === lightSensorPrefix.power
  ) {
    return true;
  }
  return false;
};

// method to update light state
// const updatelightSensorState = (subTopic, macAddrees) => {
//   const mqttTopic = lightSensorPrefix.switch + macAddrees;
//   if (mqttTopic === subTopic) {
//   }
// };

export {
  openLightSensor,
  closeLightSensor,
  subscribeAllLightSensorState,
  subscribeLightSensorState,
  subscribeLightSensorConnectionState,
  subscribeLightSensorPowerState,
  unsubscribeLightSensorState,
  unsubscribeLightSensorConnectionState,
  unsubscribeLightSensorPowerState,
  unsubscribeAllLightSensorState,
  isLightSensorDeviceName,
  isLightSensorTopic,
  isLightSensorStatusTopic,
  isLightSensorConnectionStatusTopic,
  isLightSensorPowerStatusTopic,
};
