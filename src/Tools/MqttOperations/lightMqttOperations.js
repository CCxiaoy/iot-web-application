import { subscribeOptions, publishOptions } from "./Config/mqttConfig";

const lightPrefix = {
  isAutoLight: "autoLight-",
  status: "autoLight-status-",
  connectionStatus: "autoLight-connection-status-",
  power: "autoLight-power-status-",
  switch: "autoLight-",
};

const lightState = {
  open: "1",
  close: "0",
};

// method to change light state
const changeLightState = async (macAddrees, client, lightState) => {
  const mqttTopic = lightPrefix.switch + macAddrees;
  client.publish(mqttTopic, lightState, publishOptions);
};

// method to open light
const openLight = (macAddrees, client) => {
  changeLightState(macAddrees, client, lightState.open);
};

// method to close light
const closeLight = (macAddrees, client) => {
  changeLightState(macAddrees, client, lightState.close);
};

// method to subscribe light state
const subscribeLightState = (macAddrees, client) => {
  const mqttTopic = lightPrefix.status + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light connection state
const subscribeLightConnectionState = (macAddrees, client) => {
  const mqttTopic = lightPrefix.connectionStatus + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light power state
const subscribeLightPowerState = (macAddrees, client) => {
  const mqttTopic = lightPrefix.power + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe all light topic
const subscribeAllLightState = (macAddrees, client) => {
  subscribeLightState(macAddrees, client);
  subscribeLightConnectionState(macAddrees, client);
  subscribeLightPowerState(macAddrees, client);
};

// method to subscribe light state
const unsubscribeLightState = (macAddrees, client) => {
  const mqttTopic = lightPrefix.status + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light connection state
const unsubscribeLightConnectionState = (macAddrees, client) => {
  const mqttTopic = lightPrefix.connectionStatus + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe light power state
const unsubscribeLightPowerState = (macAddrees, client) => {
  const mqttTopic = lightPrefix.power + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

const unsubscribeAllLightState = (macAddrees, client) => {
  unsubscribeLightState(macAddrees, client);
  unsubscribeLightConnectionState(macAddrees, client);
  unsubscribeLightPowerState(macAddrees, client);
};

// method to determine if message received is a Lamp Topic
const isLampTopic = (topic) => {
  console.log(topic, topic.slice(0, lightPrefix.isAutoLight.length));
  if (topic.slice(0, lightPrefix.isAutoLight.length) === lightPrefix.isAutoLight) {
    return true;
  }
  return false;
};

// method to determine if message received is a Lamp "autoLight-status-"" Topic 
const isLampStatusTopic = (topic) => {
  console.log(topic, topic.slice(0, lightPrefix.status.length));
  if (topic.slice(0, lightPrefix.status.length) === lightPrefix.status) {
    return true;
  }
  return false;
};

// method to determine if message received is a Lamp "autoLight-connection-status-"" Topic 
const isLampConnectionStatusTopic = (topic) => {
  console.log(topic, topic.slice(0, lightPrefix.connectionStatus.length));
  if (topic.slice(0, lightPrefix.connectionStatus.length) === lightPrefix.connectionStatus) {
    return true;
  }
  return false;
};

// power  power: "autoLight-power-status-",
const isLampPowerStatusTopic = (topic) => {
  console.log(topic, topic.slice(0, lightPrefix.power.length));
  if (topic.slice(0,  lightPrefix.power.length) === lightPrefix.power) {
    return true;
  }
  return false;
};

// method to update light state
// const updateLightState = (subTopic, macAddrees) => {
//   const mqttTopic = lightPrefix.switch + macAddrees;
//   if (mqttTopic === subTopic) {
//   }
// };

export {
  openLight,
  closeLight,
  subscribeAllLightState,
  subscribeLightState,
  subscribeLightConnectionState,
  subscribeLightPowerState,
  unsubscribeLightState,
  unsubscribeLightConnectionState,
  unsubscribeLightPowerState,
  unsubscribeAllLightState,
  isLampTopic,
  isLampStatusTopic,
  isLampConnectionStatusTopic,
  isLampPowerStatusTopic,
};
