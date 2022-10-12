const allowedOrigins = require('./allowedOrigins')

//Cet objet permet de verifier si une url est autoriser ou pas a acceder l'API
const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('not allowed by CORS'))
        }
    },

    credentials: true,

    optionsSuccessStatus: 200
}

module.exports = corsOptions