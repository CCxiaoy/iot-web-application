const lightPrefix = {
  status: "autoLight-status-",
  switch: "autoLight-",
};

const lightState = {
  open: "1",
  close: "0",
};

const publishOptions = {
  qos: 1,
  retain: false,
};

const subscribeOptions = {
  qos: 1,
};

const changeLightState = async (macAddrees, client, lightState) => {
  const mqttTopic = lightPrefix.switch + macAddrees;
  client.publish(mqttTopic, lightState, publishOptions);
};

const openLight = (macAddrees, client) => {
  changeLightState(macAddrees, client, lightState.open);
};

const clostLight = (macAddrees, client) => {
  changeLightState(macAddrees, client, lightState.close);
};

const subscribeLightState = (macAddrees, client) => {
  const mqttTopic = lightPrefix.status + macAddrees;
  client.subscribe(mqttTopic, subscribeOptions);
};

const updateLightState = (subTopic, macAddrees) => {
  const mqttTopic = lightPrefix.status + macAddrees;
  if (mqttTopic === subTopic) {
  }
};

export { openLight, clostLight, subscribeLightState, updateLightState};
