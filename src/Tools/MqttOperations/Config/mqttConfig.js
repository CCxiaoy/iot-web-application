// personal cloud server mqtt services
const mqttServerUrl = 'ws://139.224.56.89';

// ranye public server
// const mqttServerUrl = 'ws://test.ranye-iot.net';

const publishOptions = {
  qos: 1,
  retain: false,
};

const subscribeOptions = {
  qos: 1,
};

export {
    publishOptions,
    subscribeOptions,
    mqttServerUrl,
}