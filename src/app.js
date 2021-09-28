const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsDir)


app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ashraf Khan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: 'Ashraf Khan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ashraf Khan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You haven't provided anything to search"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        }) 
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'help',
        name: 'Ashraf Khan',
        error: "This help page do not exist"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404! Page',
        name: 'Ashraf Khan',
        error: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is running on port: ' + port)
})