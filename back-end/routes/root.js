const express = require('express')
const router = express.Router()
const path = require('path')

//Ici cette route permet d'aller cherche la page html a afficher a l'utilisateur apres appel du serveur
 router.get('^/$|/index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
 })

 module.exports = router