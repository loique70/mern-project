/*Pour importer et formater la date, uuid pour generer automatiment
 les identifiants ces deux point ont ete installer avec commande npm i date-fns uuid*/

const { format } = require('date-fns')
const {v4: uuid} = require('uuid')

//fs = file system, c'est une fonction importer directement sur node js
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

/*La fonction suivant permet d'enregistrer les evenements du serveur et sauvegarder dans le dossier logs.
 Elle verifie d'abord si ce dossier existe deja dans le system sinon elle cree.*/
const logEvents = async (message, logFileName) => {
    const dateTime= `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch(err){
        console.log(err)
    }
}

const logger = (req,res, next) => {
    logEvents(`${req.method}\t${req.url}\${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = {logEvents, logger}