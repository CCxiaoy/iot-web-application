// personal cloud server mqtt services
const mqttServerUrl = 'ws://139.224.56.89';

// ranye public server
// const mqttServerUrl = 'ws://test.ranye-iot.net';

// connect options
// personal cloud service options
const options = {
  // MQTT 服务器的用户名
  username: 'user',
  // 密码
  password: '123456',
  keepalive: 10,
  // 端口
  port: 8083, 
  // 客户端id
  clientId: 'mqtt_' + Math.random()
}

// ranye public mqtt services options
// const options = {
//     keepalive: 10,
//     // 端口
//     port: 8080,
//     // 客户端id
//     clientId: 'mqtt_' + Math.random()
// }


const publishOptions = {
  qos: 1,
  retain: false,
};

const subscribeOptions = {
  qos: 1,
};

export {
    mqttServerUrl,
    options,
    publishOptions,
    subscribeOptions,
}