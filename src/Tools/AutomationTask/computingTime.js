// scale ms
const computingMilliSecondReceived = (timeStr) => {
    const date = new Date();
    const receivedHours = Number(timeStr.slice(0, 2));
    const receivedMinutes = Number(timeStr.slice(3, 5));
    date.setHours(receivedHours);
    date.setMinutes(receivedMinutes);
    date.setSeconds(0);
    console.log(timeStr, receivedHours, receivedMinutes, date, date.getTime());
    return date.getTime();
}

// scale ms
const computingMilliSecondNow = (timeStr) => {
    const date = new Date();
    return date.getTime();
}

// scale ms
const computingTimeDiff = (timeStr) => {
    const currentMill = computingMilliSecondNow();
    const receivedMill = computingMilliSecondReceived(timeStr);
    return receivedMill - currentMill;
}

export {
    computingTimeDiff,
}