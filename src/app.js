const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

app.set('view engine', 'hbs');
app.set('views', __dirname + "/../templates/views");
hbs.registerPartials(__dirname + "/../templates/partials")
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Naman'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Naman'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is Page to Help You',
        name: 'Naman'
    });
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
        forecast(req.query.address, (err, data) => {
            if (err) {
                res.send({error: 'No Location Found'})
            }
            else {
                res.send({
                    forecast: data.current.weather_descriptions[0],
                    location: data.location.name
                });
            }
        })
    }
    else {
        res.send({ error: 'Please provide address' })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Naman',
        error: 'Page Not Found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Naman',
        error: 'Page Not Found',
    })
})

app.listen(port, () =>
    console.log(`listening on port ${port}!`))