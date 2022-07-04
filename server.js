const express = require('express')
const Conteiner = require('./container')
const app = express()

const server = app.listen(8080,() => {
    console.log('Server running on port 8080')
})

let conteiner = new Conteiner('productos.txt')

const test = async() => {
    console.log(await conteiner.getAllElements())
    console.log('Elements Added')

    const firstObj = {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    }
    console.log(await conteiner.save(firstObj));

    const secondObj = {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 2
    }
    console.log(await conteiner.save(secondObj))

    const thirdObj = {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
    }
    console.log(await conteiner.save(thirdObj));
}

test();

app.get('/productos', async(req, res) => {  
    res.send(await conteiner.getAllElements())
}
)

app.get('/productoRandom', async(req, res) => {
    res.send(await conteiner.getRandomElement())
}
)
