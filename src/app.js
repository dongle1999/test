async function startServer() {
    // Database connection
    await require('../src/loaders/mongoose')

    // Express
    await require('../src/loaders/express')
}

startServer()