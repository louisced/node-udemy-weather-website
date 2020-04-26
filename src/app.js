const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Cedric LOUIS'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Cedric LOUIS'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Cedric LOUIS'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode (req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
        } else {
            forecast({latitude, longitude}, (error, data) => {
                if (error){
                    return res.send({ error })
                } else {
                    res.send({
                        forecast: data,
                        location,
                        address: req.query.address,
                    })
                }
            })
        }
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a serche term'
        })
    }

    // console.log(req.query.search)
    res.send({
        products: req.query.search
    })
    
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage:'Help Article not found',
        name: 'Cedric LOUIS'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        errorMessage:'Page not found',
        name: 'Cedric LOUIS'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})