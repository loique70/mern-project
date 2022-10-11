const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

 //On indique a express js que pour toute fichier statique(css, image) il doit suivre ce chemin
app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))

//Cette route va permettre de tous les pages et routes inexitente que l'on va essayer de joindre.
app.all('*', (req,res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')){
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
