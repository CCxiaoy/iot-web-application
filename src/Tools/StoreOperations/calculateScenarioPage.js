// calculate scenario page
const calculateScenario = (change, pageNum, l) => {
    return (pageNum + l + change) % l;
}

export {
    calculateScenario
}

