import { subscribeOptions, publishOptions } from "./Config/mqttConfig";
// TemperatureSensor
// temperatureSensor
const temperatureSensorPrefix = {
  isTemperatureSensor: "tempSensor-",
  status: "tempSensor-status-",
  connectionStatus: "tempSensor-connection-status-",
  power: "tempSensor-power-status-",
  switch: "tempSensor-",
  name: "Temp",
};

const temperatureSensorState = {
  open: "1",
  close: "0",
};

// method to change light state
const changeTemperatureSensorState = async (
  macAddrees,
  client,
  temperatureSensorState
) => {
  const mqttTopic = temperatureSensorPrefix.switch + macAddrees;
  client.publish(mqttTopic, temperatureSensorState, publishOptions);
};

// method to open light
const openTemperatureSensor = (macAddrees, client) => {
  changeTemperatureSensorState(macAddrees, client, temperatureSensorState.open);
};

// method to close light
const closeTemperatureSensor = (macAddrees, client) => {
  changeTemperatureSensorState(
    macAddrees,
    client,
    temperatureSensorState.close
  );
};

// method to subscribe light state
const subscribeTemperatureSensorState = (macAddrees, client) => {
  const mqttTopic = temperatureSensorPrefix.status + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light connection state
const subscribeTemperatureSensorConnectionState = (macAddrees, client) => {
  const mqttTopic = temperatureSensorPrefix.connectionStatus + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light power state
const subscribeTemperatureSensorPowerState = (macAddrees, client) => {
  const mqttTopic = temperatureSensorPrefix.power + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe all light topic
const subscribeAllTemperatureSensorState = (macAddrees, client) => {
  subscribeTemperatureSensorState(macAddrees, client);
  subscribeTemperatureSensorConnectionState(macAddrees, client);
  subscribeTemperatureSensorPowerState(macAddrees, client);
};

// method to subscribe light state
const unsubscribeTemperatureSensorState = (macAddrees, client) => {
  const mqttTopic = temperatureSensorPrefix.status + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light connection state
const unsubscribeTemperatureSensorConnectionState = (macAddrees, client) => {
  const mqttTopic = temperatureSensorPrefix.connectionStatus + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light power state
const unsubscribeTemperatureSensorPowerState = (macAddrees, client) => {
  const mqttTopic = temperatureSensorPrefix.power + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

const unsubscribeAllTemperatureSensorState = (macAddrees, client) => {
  unsubscribeTemperatureSensorState(macAddrees, client);
  unsubscribeTemperatureSensorConnectionState(macAddrees, client);
  unsubscribeTemperatureSensorPowerState(macAddrees, client);
};

// method to determine if deviceName received is a Fan device' name
const isTemperatureSensorDeviceName = (deviceName) => {
  if (
    deviceName.length >= temperatureSensorPrefix.name.length &&
    deviceName.slice(0, temperatureSensorPrefix.name.length) ===
    temperatureSensorPrefix.name
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor state Topic
const isTemperatureSensorTopic = (topic) => {
  if (
    topic.slice(0, temperatureSensorPrefix.isTemperatureSensor.length) ===
    temperatureSensorPrefix.isTemperatureSensor
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor "autoLight-status-"" Topic
const isTemperatureSensorStatusTopic = (topic) => {
  if (
    topic.slice(0, temperatureSensorPrefix.status.length) ===
    temperatureSensorPrefix.status
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor connection "autoLight-connection-status-" Topic
const isTemperatureSensorConnectionStatusTopic = (topic) => {
  if (
    topic.slice(0, temperatureSensorPrefix.connectionStatus.length) ===
    temperatureSensorPrefix.connectionStatus
  ) {
    return true;
  }
  return false;
};

// method to determine if message received is a Light Sensor power: "autoLight-power-status-" Topic,
const isTemperatureSensorPowerStatusTopic = (topic) => {
  if (
    topic.slice(0, temperatureSensorPrefix.power.length) ===
    temperatureSensorPrefix.power
  ) {
    return true;
  }
  return false;
};

// method to update light state
// const updateTemperatureSensorState = (subTopic, macAddrees) => {
//   const mqttTopic = temperatureSensorPrefix.switch + macAddrees;
//   if (mqttTopic === subTopic) {
//   }
// };

export {
  openTemperatureSensor,
  closeTemperatureSensor,
  subscribeAllTemperatureSensorState,
  subscribeTemperatureSensorState,
  subscribeTemperatureSensorConnectionState,
  subscribeTemperatureSensorPowerState,
  unsubscribeTemperatureSensorState,
  unsubscribeTemperatureSensorConnectionState,
  unsubscribeTemperatureSensorPowerState,
  unsubscribeAllTemperatureSensorState,
  isTemperatureSensorDeviceName,
  isTemperatureSensorTopic,
  isTemperatureSensorStatusTopic,
  isTemperatureSensorConnectionStatusTopic,
  isTemperatureSensorPowerStatusTopic,
};
