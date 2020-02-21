const path = require('path'); // Core NODE module, require without install it!
const express = require('express'); const hsb = require('hbs');

const geoCode = require('./ultil/geocode'); const foreCast = require('./ultil/forecast');
const app = express();

// Define path for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars (hbs) engine & view location
// pass (key, value) to .set; key must be 'view engine'
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hsb.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));
// RENDER ROUTING
const name = 'Quyet Nguyen';
app.get('', (req, res) => res.render('index', { title: 'Weather App', name }));
app.get('/about', (req, res) => res.render('about', { title: 'About Weather App', name }));
app.get('/help', (req, res) => res.render('help', { title: 'Help', helpText: 'This is some helpful text', name }));
// API ROUTING
// LEARN HOW TO WORK WITH QUERY STIRNG
app.get('/products', (req, res) => {
    // console.log(req.query);
    // console.log(req.query.search);
    if (!req.query.search) return res.send({ errorMessage: 'You must provide a valid search term' });
    // console.log(req.query.search);    
    res.send({ result: req.query.search });
});
// Challenge
app.get('/weather', (req, res) => {
    // console.log(req.query);    
    if (!req.query.place) return res.status(404)
        .send({ errorMessage: 'You must provide a valid place name' });
    // console.log(req.query.place);
    geoCode(req.query.place, (error, { lattitude, longtitude, location } ={}) => {
        if (error) return res.send({'Error': error});    
        foreCast(lattitude, longtitude, (error, data) => {
            if (error) return res.send({'Error': error});
            res.send({ data, location, placeName: req.query.place });
        });    }); })
// ROUTEs WITH WILD CARD CHARACTER
app.get('/help/*', (req, res) => res.render('404', {
    name,
    title: 'HELP PAGE ERROR', errorMessage: 'HELP ARTICLE NOT FOUND'
}));
app.get('*', (req, res) => res.render('404', {
    name,
    title: '404 PAGE', errorMessage: 'PAGE NOT FOUND'
}));

const PORT = 3000;
app.listen(PORT, () => { console.log('Server is up on port 3000'); });


// ALL THE ROUTE FOR REQUEST A STATIC FILE WILL BE HANDLE BY EXPRESS.STATIC METHOD
// For HTML file serving, the index.html file will be served by default for the root URL
// or we can request index.html to be served by clearly type it in our URL: localhost:PORT/index.html
// For request server to serve another static file, we need to clearly type the file name in URL

    // ROUTING
    // All the route request to serve static file will be handled by express.static
    // The root route defined below will nolonger response back with hard coded html
    // as we expected, as its route taken by express.static
// app.get('', (req, res) => { res.send('<h1>Hello Express</h1>'); });