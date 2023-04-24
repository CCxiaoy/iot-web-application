const createScenario = (title) => {
    let newScenario = {};
    newScenario.id = title;
    newScenario.title = title;
    return newScenario;
}

export {
    createScenario
}