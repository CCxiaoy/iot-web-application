const createLampDevice = (
  deviceScenario,
  deviceType,
  deviceName,
  macAddress
) => {
  const newDevice = {
    name: deviceName,
    ConnectState: "Online",
    // ConnectState: "Offline",
    uniqueState: {
      name: "Light",
      value: "100",
      scale: "%",
    },
    state: "On",
    // state: "Off",
    moreText: "Delete",
    scenario: deviceScenario,
    type: deviceType, // Lamp
    macAddress: macAddress,
  };
  return newDevice;
};

const createFanDevice = (
  deviceScenario,
  deviceType,
  deviceName,
  macAddress
) => {
  const newDevice = {
    name: deviceName,
    ConnectState: "Online",
    // ConnectState: "Offline",
    uniqueState: {
      name: "Speed",
      value: "100",
      scale: "%",
    },
    state: "On",
    // state: "Off",
    moreText: "Delete",
    scenario: deviceScenario,
    type: deviceType, // Lamp
    macAddress: macAddress,
  };
  return newDevice;
};

const createBrightnessSensor = (
  deviceScenario,
  deviceType,
  deviceName,
  macAddress
) => {
  const newDevice = {
    name: deviceName,
    ConnectState: "Online",
    // ConnectState: "Offline",
    uniqueState: {
      name: "Brightness",
      value: "80",
      scale: "%",
    },
    state: "On",
    // state: "Off",
    moreText: "Delete",
    scenario: deviceScenario,
    type: deviceType, // Lamp
    macAddress: macAddress,
  };
  return newDevice;
};

const createHumidSensor = (
  deviceScenario,
  deviceType,
  deviceName,
  macAddress
) => {
  const newDevice = {
    name: deviceName,
    ConnectState: "Online",
    // ConnectState: "Offline",
    uniqueState: {
      name: "Humidity",
      value: "80",
      scale: "%",
    },
    state: "On",
    // state: "Off",
    moreText: "Delete",
    scenario: deviceScenario,
    type: deviceType, // Lamp
    macAddress: macAddress,
  };
  return newDevice;
};

const createTemperatureDevice = (
  deviceScenario,
  deviceType,
  deviceName,
  macAddress
) => {
  const newDevice = {
    name: deviceName,
    ConnectState: "Online",
    // ConnectState: "Offline",
    uniqueState: {
      name: "Celsius",
      value: "27",
      scale: "℃",
    },
    state: "On",
    // state: "Off",
    moreText: "Delete",
    scenario: deviceScenario,
    type: deviceType, // Lamp
    macAddress: macAddress,
  };
  return newDevice;
};

const createDevice = (deviceScenario, deviceType, deviceName, macAddress) => {
  let newDevice;
  switch (deviceType) {
    case "Lamp":
      newDevice = createLampDevice(
        deviceScenario,
        deviceType,
        deviceName,
        macAddress
      );
      break;

    case "Fan":
      newDevice = createFanDevice(
        deviceScenario,
        deviceType,
        deviceName,
        macAddress
      );
      break;

    case "BrightnessSensor":
      newDevice = createBrightnessSensor(
        deviceScenario,
        deviceType,
        deviceName,
        macAddress
      );
      break;

    case "HumidSensor":
      newDevice = createHumidSensor(
        deviceScenario,
        deviceType,
        deviceName,
        macAddress
      );
      break;

    case "TemperatureSensor":
      newDevice = createTemperatureDevice(
        deviceScenario,
        deviceType,
        deviceName,
        macAddress
      );
      break;

    default:
      newDevice = {};
      break;
  }
  return newDevice;
};

// {
//     id: "All",
//     title: "All",
//     url: "/",
// },
// {
//     id: "Lamp",
//     title: "Lamp",
//     url: "/lamp",
// },
// {
//     id: "Fan",
//     title: "Fan",
//     url: "/fan",
// },
// {
//     id: "Sensor",
//     title: "Sensor",
//     url: "/sensor",
// }

// {
//     name: "Bulb-One",
//     ConnectState: "Online",
//     uniqueState: {
//         name: "Light",
//         value: "100",
//         scale: "%"
//     },
//     state: "On",
//     moreText: "Delete",
//     scenario: "Home",
//     type: "Lamp",
//     macAddress: "",
// },
// {
//     name: "Fan-One",
//     ConnectState: "Offline",
//     uniqueState: {
//         name: "Speed",
//         value: "100",
//         scale: "%"
//     },
//     state: "Off",
//     moreText: "Delete",
//     scenario: "Home",
//     type: "Fan",
//     macAddress: "",
// },
// {
//     name: "LightSensor-One",
//     ConnectState: "Online",
//     uniqueState: {
//         name: "Brightness",
//         value: "80",
//         scale: "%",
//     },
//     state: "On",
//     moreText: "Delete",
//     scenario: "Home",
//     type: "Sensor",
//     macAddress: "",
// },
// {
//     name: "HumidSensor-One",
//     ConnectState: "Online",
//     uniqueState: {
//         name: "Humidity",
//         value: "80",
//         scale: "%"
//     },
//     state: "On",
//     moreText: "Delete",
//     scenario: "Home",
//     type: "Sensor",
//     macAddress: "",
// },
// {
//     name: "TempSensor-One",
//     ConnectState: "Online",
//     uniqueState: {
//         name: "Celsius",
//         value: "27",
//         scale: "℃"
//     },
//     state: "On",
//     moreText: "Delete",
//     scenario: "Home",
//     type: "Sensor",
//     macAddress: "",
// }

export { createDevice };
