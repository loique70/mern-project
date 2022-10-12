const { logEvents } = require('./logger')

//La fonction suivante permet de capturer les erreur par defaut du serveur
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t ${req.method}\t ${req.url}\t ${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 //erreur du serveur

    res.status(status)

    res.json({ message: err.message })
}

module.exports = errorHandler