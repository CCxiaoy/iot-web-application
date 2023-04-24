const typeFilter = (expectedType, deviceType) => {
    if(expectedType === "All") {
        return true;
    }
    if(expectedType === "Sensor" && (deviceType === "BrightnessSensor" || deviceType === "HumidSensor" || deviceType === "TemperatureSensor")) {
        return true;
    }
    return expectedType === deviceType ? true : false;
}

export {
    typeFilter
}