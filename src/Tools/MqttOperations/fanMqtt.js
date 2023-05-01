import { subscribeOptions, publishOptions } from "./Config/mqttConfig";

const fanPrefix = {
  isAutoFan: "autoFan-",
  status: "autoFan-status-",
  connectionStatus: "autoFan-connection-status-",
  power: "autoFan-power-status-",
  switch: "autoFan-",
};

const fanState = {
  open: "1",
  close: "0",
};

// method to change fan state
const changeFanState = async (macAddrees, client, fanState) => {
  const mqttTopic = fanPrefix.switch + macAddrees;
  client.publish(mqttTopic, fanState, publishOptions);
};

// method to open fan
const openFan = (macAddrees, client) => {
  changeFanState(macAddrees, client, fanState.open);
};

// method to close fan
const closeFan = (macAddrees, client) => {
  changeFanState(macAddrees, client, fanState.close);
};

// method to subscribe fan state
const subscribeFanState = (macAddrees, client) => {
  const mqttTopic = fanPrefix.status + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe fan connection state
const subscribeFanConnectionState = (macAddrees, client) => {
  const mqttTopic = fanPrefix.connectionStatus + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe fan power state
const subscribeFanPowerState = (macAddrees, client) => {
  const mqttTopic = fanPrefix.power + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

// method to subscribe all fan topic
const subscribeAllFanState = (macAddrees, client) => {
  subscribeFanState(macAddrees, client);
  subscribeFanConnectionState(macAddrees, client);
  subscribeFanPowerState(macAddrees, client);
};

// method to subscribe fan state
const unsubscribeFanState = (macAddrees, client) => {
  const mqttTopic = fanPrefix.status + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe fan connection state
const unsubscribeFanConnectionState = (macAddrees, client) => {
  const mqttTopic = fanPrefix.connectionStatus + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

// method to subscribe fan power state
const unsubscribeFanPowerState = (macAddrees, client) => {
  const mqttTopic = fanPrefix.power + macAddrees;
  client.unsubscribe(mqttTopic, subscribeOptions);
};

const unsubscribeAllFanState = (macAddrees, client) => {
  unsubscribeFanState(macAddrees, client);
  unsubscribeFanConnectionState(macAddrees, client);
  unsubscribeFanPowerState(macAddrees, client);
};

// method to determine if message received is a Fan Topic
const isFanTopic = (topic) => {
  // console.log(topic, topic.slice(0, fanPrefix.isAutoFan.length));
  if (topic.slice(0, fanPrefix.isAutoFan.length) === fanPrefix.isAutoFan) {
    return true;
  }
  return false;
};

// method to determine if message received is a Fan "autoFan-status-"" Topic 
const isFanStatusTopic = (topic) => {
  // console.log(topic, topic.slice(0, fanPrefix.status.length));
  if (topic.slice(0, fanPrefix.status.length) === fanPrefix.status) {
    return true;
  }
  return false;
};

// method to determine if message received is a Fan "autoFan-connection-status-"" Topic 
const isFanConnectionStatusTopic = (topic) => {
  // console.log(topic, topic.slice(0, fanPrefix.connectionStatus.length));
  if (topic.slice(0, fanPrefix.connectionStatus.length) === fanPrefix.connectionStatus) {
    return true;
  }
  return false;
};

// power  power: "autoFan-power-status-",
const isFanPowerStatusTopic = (topic) => {
  // console.log(topic, topic.slice(0, fanPrefix.power.length));
  if (topic.slice(0,  fanPrefix.power.length) === fanPrefix.power) {
    return true;
  }
  return false;
};

// method to update fan state
// const updateFanState = (subTopic, macAddrees) => {
//   const mqttTopic = fanPrefix.switch + macAddrees;
//   if (mqttTopic === subTopic) {
//   }
// };

export {
  openFan,
  closeFan,
  subscribeAllFanState,
  subscribeFanState,
  subscribeFanConnectionState,
  subscribeFanPowerState,
  unsubscribeFanState,
  unsubscribeFanConnectionState,
  unsubscribeFanPowerState,
  unsubscribeAllFanState,
  isFanTopic,
  isFanStatusTopic,
  isFanConnectionStatusTopic,
  isFanPowerStatusTopic,
};