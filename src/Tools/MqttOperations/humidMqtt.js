import { subscribeOptions, publishOptions } from "./Config/mqttConfig";

const humidSensorPrefix = {
  isHumidSensor: "humidSensor-",
  status: "humidSensor-status-",
  connectionStatus: "humidSensor-connection-status-",
  power: "humidSensor-power-status-",
  switch: "humidSensor-",
};

const humidSensorState = {
  open: "1",
  close: "0",
};

// method to change light state
const changeHumidSensorState = async (macAddrees, client, humidSensorState) => {
  const mqttTopic = humidSensorPrefix.switch + macAddrees;
  console.log("SEE!", mqttTopic, macAddrees, client, humidSensorState);
  client.publish(mqttTopic, humidSensorState, publishOptions);
};

// method to open light
const openHumidSensor = (macAddrees, client) => {
  changeHumidSensorState(macAddrees, client, humidSensorState.open);
};

// method to close light
const closeHumidSensor = (macAddrees, client) => {
  changeHumidSensorState(macAddrees, client, humidSensorState.close);
};

// method to subscribe light state
const subscribeHumidSensorState = (macAddrees, client) => {
  const mqttTopic = humidSensorPrefix.status + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light connection state
const subscribeHumidSensorConnectionState = (macAddrees, client) => {
  const mqttTopic = humidSensorPrefix.connectionStatus + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light power state
const subscribeHumidSensorPowerState = (macAddrees, client) => {
  const mqttTopic = humidSensorPrefix.power + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe all light topic
const subscribeAllHumidSensorState = (macAddrees, client) => {
  subscribeHumidSensorState(macAddrees, client);
  subscribeHumidSensorConnectionState(macAddrees, client);
  subscribeHumidSensorPowerState(macAddrees, client);
};

// method to subscribe light state
const unsubscribeHumidSensorState = (macAddrees, client) => {
  const mqttTopic = humidSensorPrefix.status + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light connection state
const unsubscribeHumidSensorConnectionState = (macAddrees, client) => {
  const mqttTopic = humidSensorPrefix.connectionStatus + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light power state
const unsubscribeHumidSensorPowerState = (macAddrees, client) => {
  const mqttTopic = humidSensorPrefix.power + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

const unsubscribeAllHumidSensorState = (macAddrees, client) => {
  unsubscribeHumidSensorState(macAddrees, client);
  unsubscribeHumidSensorConnectionState(macAddrees, client);
  unsubscribeHumidSensorPowerState(macAddrees, client);
};

// method to determine if message received is a Light Sensor state Topic
const isHumidSensorTopic = (topic) => {
  console.log(topic, topic.slice(0, humidSensorPrefix.isHumidSensor.length));
  if (
    topic.slice(0, humidSensorPrefix.isHumidSensor.length) ===
    humidSensorPrefix.isHumidSensor
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor "autoLight-status-"" Topic
const isHumidSensorStatusTopic = (topic) => {
  console.log(topic, topic.slice(0, humidSensorPrefix.status.length));
  if (
    topic.slice(0, humidSensorPrefix.status.length) === humidSensorPrefix.status
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor connection "autoLight-connection-status-" Topic
const isHumidSensorConnectionStatusTopic = (topic) => {
  console.log(topic, topic.slice(0, humidSensorPrefix.connectionStatus.length));
  if (
    topic.slice(0, humidSensorPrefix.connectionStatus.length) ===
    humidSensorPrefix.connectionStatus
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor power: "autoLight-power-status-" Topic,
const isHumidSensorPowerStatusTopic = (topic) => {
  console.log(topic, topic.slice(0, humidSensorPrefix.power.length));
  if (
    topic.slice(0, humidSensorPrefix.power.length) === humidSensorPrefix.power
  ) {
    return true;
  }
  return false;
};

// method to update light state
// const updateHumidSensorState = (subTopic, macAddrees) => {
//   const mqttTopic = humidSensorPrefix.switch + macAddrees;
//   if (mqttTopic === subTopic) {
//   }
// };

export {
  openHumidSensor,
  closeHumidSensor,
  subscribeAllHumidSensorState,
  subscribeHumidSensorState,
  subscribeHumidSensorConnectionState,
  subscribeHumidSensorPowerState,
  unsubscribeHumidSensorState,
  unsubscribeHumidSensorConnectionState,
  unsubscribeHumidSensorPowerState,
  unsubscribeAllHumidSensorState,
  isHumidSensorTopic,
  isHumidSensorStatusTopic,
  isHumidSensorConnectionStatusTopic,
  isHumidSensorPowerStatusTopic,
};
