const hbs = require('hbs');
const path = require('path');
const express = require('express');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath  = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup the directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bhenjyl Maypa'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bhenjyl Maypa'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Bhenjyl Maypa'
    })
});

app.get('/help/*', (req,res) => {
    res.render('help-404', {
        title: 'Help Article not Found',
        name: 'Bhenjyl Maypa'
    })
});

app.get('/weather', (req, res) => {
    // res.send('This is the weather app.');
    if (!req.query.location) {
        return res.send({
            error: '400',
            message: 'Please provide a location.'
        });
    }

    geocode.geocode(req.query.location, (error, {long, lat, place} = {}) => {
        if (error) {
            return res.send(error);
        } else {
            forecast.forecast(long, lat, (ferror, {temp, main, description: desc, perc} = {}) => {
                if (ferror) {
                    return  res.send(ferror);
                } else {
                    return res.send({
                        location: place,
                        main, 
                        forecast: `There will be ${desc} today and currently ${temp} degrees. There is ${perc}% chance of rain.`,
                        address: req.query.location
                    });
                }
            })
        }
    });

    // res.send({
    //     address: req.query.location
    // });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Bhenjyl Maypa'
    })
});

app.listen(port, () => {
    console.log(`The server is up running on port ${port}.`);
})