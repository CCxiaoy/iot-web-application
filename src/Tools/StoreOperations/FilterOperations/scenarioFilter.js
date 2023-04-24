const scenarioFilter = (expectedScenario, deviceScenario) => {
    if(expectedScenario === "Home") {
        return true;
    }
    return expectedScenario === deviceScenario ? true : false;
}

export {
    scenarioFilter
}