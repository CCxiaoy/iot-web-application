import mqtt from "mqtt/dist/mqtt.js";
import { subscribeAllLightState, unsubscribeAllLightState, openLight, closeLight } from "./lightMqttOperations";
import { closeLightSensor, openLightSensor, subscribeAllLightSensorState, unsubscribeAllLightSensorState } from "./brightnessMqtt";
import { closeHumidSensor, openHumidSensor, subscribeAllHumidSensorState, unsubscribeAllHumidSensorState } from "./humidMqtt";
import { closeTemperatureSensor, openTemperatureSensor, subscribeAllTemperatureSensorState, unsubscribeAllTemperatureSensorState } from "./temperatureMqtt";

const mqttServerUrl = 'ws://test.ranye-iot.net';

const options = {
    // MQTT 服务器的用户名
    // username: 'user',
    // 密码
    // password: '123456',
    keepalive: 10,
    // 端口
    port: 8080,
    // port: 8083, 
    // port: 8083,
    // 客户端id
    clientId: 'mqtt_' + Math.random()
}


// connect method
const connectToMQTTServer = () => {
    let client = mqtt.connect(mqttServerUrl, options);
    return client;
}

// initial method
const initialConnection = (client) => {
    // 连接事件
    client.on('connect', e => {
        console.log('连接成功', e);
    })

    // 重连事件
    client.on('reconnect', (error) => {
        console.log('正在重连：' + error)
    })

    // 错误事件
    client.on('error', (error) => {
        console.log('连接失败：' + error)
    })
}

// subscribe method
const subscribeDevice = (macAddrees, client, type) => {
    switch (type) {
        case "Lamp":
            subscribeAllLightState(macAddrees, client);
            break;

        case "BrightnessSensor":
            subscribeAllLightSensorState(macAddrees, client);
            break;

        case "Fan":
            
            break;

        case "HumidSensor":
            subscribeAllHumidSensorState(macAddrees, client);
            break;

        case "TemperatureSensor":
            subscribeAllTemperatureSensorState(macAddrees, client);
            break;
    
        default:
            break;
    }
}

// un-subscribe method
const unsubscribeDevice = (macAddrees, client, type) => {
    switch (type) {
        case "Lamp":
            unsubscribeAllLightState(macAddrees, client);
            break;

        case "BrightnessSensor":
            unsubscribeAllLightSensorState(macAddrees, client);
            break;

        case "Fan":
            
            break;

        case "HumidSensor":
            unsubscribeAllHumidSensorState(macAddrees, client);
            break;

        case "TemperatureSensor":
            unsubscribeAllTemperatureSensorState(macAddrees, client);
            break;
    
        default:
            break;
    }
}

// open device method
// return true => then open device | false => then close device
const isOpenOrClose = (deviceState) => {
    if(deviceState === 'On') {
        return false;
    } 
    else {
        return true; 
    }
}

// switch Device State (on / off)
const switchDeviceState = (macAddrees, client, type, state) => {
    switch (type) {
        case "Lamp":
            if(isOpenOrClose(state)) {
                openLight(macAddrees, client);
            } else {
                closeLight(macAddrees, client);
            }
            break;

        case "BrightnessSensor":
            if(isOpenOrClose(state)) {
                openLightSensor(macAddrees, client);
            } else {
                closeLightSensor(macAddrees, client);
            }
            break;

        case "Fan":
            
            break;

        case "HumidSensor":
            if(isOpenOrClose(state)) {
                openHumidSensor(macAddrees, client);
            } else {
                closeHumidSensor(macAddrees, client);
            }
            break;

        case "TemperatureSensor":
            if(isOpenOrClose(state)) {
                openTemperatureSensor(macAddrees, client);
            } else {
                closeTemperatureSensor(macAddrees, client);
            }
            break;
    
        default:
            break;
    }
}


export {
    connectToMQTTServer,
    initialConnection,
    subscribeDevice,
    unsubscribeDevice,
    switchDeviceState,
}

//连接
// 139.224.56.89 cloud server open ip address
// let client = mqtt.connect('ws://139.224.56.89', options);
// let client = mqtt.connect(mqttServerUrl, options);


// client.on('connect', e => {
//     console.log('连接成功', e);
//     client.subscribe("autoLight-status-5C:CF:7F:18:B6:7C", {qos: 0});
// })

// // 重连事件
// client.on('reconnect', (error) => {
//     console.log('正在重连：' + error)
// })

// // 错误事件
// client.on('error', (error) => {
//     console.log('连接失败：' + error)
// })

// // let lightStateInfo = ref("off");

// const modifyLightStateInfo = (str) => {
//     lightStateInfo.value = str;
// }

// //收到消息的事件
// // client.on('message', (topic, message) => {
// //     console.log(topic + '返回的数据：' + message.toString())
// // });
// client.on('message', (topic, message) => {
//     // console.log(topic + '返回的数据：' + message.toString());
//     if(topic === "autoLight-status-5C:CF:7F:18:B6:7C") {
//         console.log(message.toString());
//         // modifyLightStateInfo(message.toString());
//     } else {
//         console.log("what a pity")
//     }
// });


// let lightContent = reactive({
//     tag: 'Open Light',
//     state: 1,
// });

// const changeLightState = () => {
//     switchLight();
//     if (lightContent.tag === "Open Light") {
//         lightContent.tag = 'Close Light';
//         lightContent.state = 0;
//     } else {
//         lightContent.tag = 'Open Light';
//         lightContent.state = 1;
//     }
// }
// const switchLight = async () => {
//     // console.log(await Post({
//     //     url: 'led',
//     //     data: {
//     //         status: lightContent.state,
//     //     }
//     // }));
//     // client.publish("topic/led", JSON.stringify({ status: lightContent.state }), { qos: 2, retain: true });
//     client.publish("autoLight-5C:CF:7F:18:B6:7C", lightContent.state + "", { qos: 0, retain: false });
// }