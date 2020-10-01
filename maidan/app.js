const path = require('path')
const express = require('express')
const http = require('http')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app = express()
//add http server to redirect
const server = http.createServer(app)
const port = process.env.PORT || 4444

const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req,res,next)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Created by Pravinewa'
    })
})

app.get('/about', (req,res,next)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Created by Pravinewa'
    })
})

app.get('/help', (req,res,next)=>{
    res.render('help',{
        title : 'Help Page',
        helpText : 'Coming Soon....',
        name : 'Created by Pravinewa'
    })
    next()
})

app.get('/weather', (req, res,next) =>{
    if(!req.query.search){
        return res.send({
            error : 'Loaction must provide to get weather report'
        })
    }

    geocode(req.query.search, (error, {longitude, latitude, location} = {}) => {
            if(error){
                return res.send({ error })      
            }

            forecast( latitude, longitude,(error, {forcastData}) =>{
                if(error){
                    return res.send({ error })
                }
                res.send({
                    forcastData,
                    location,
                    address : req.query.search 

                })
            })
        })
})

app.get('/myweather',(req, res,next)=>{
    forecast( req.query.latitude, req.query.longitude,(error, {forcastData, address}) =>{
        if(error){
            return res.send({ error })
        }
        res.send({
            forcastData,
            location,
            address
        })
    })
})

//to compare weather of current location and given query location
app.get('/compareweather',(req,res,next)=>{
    if(error){
                return res.send({ error })      
            }

    forecast( req.query.latitude, req.query.longitude,req.query.search, (error, {longitude, latitude, location, forcastData, address}) =>{
        if(error){
            return res.send({ error })
        }
        res.send({
            forcastData,
            location,
            address
        })
    })
}
    

app.get('/help/*',(req,res,next)=>{
    res.render('error',{
        title : 'Page Not Found',
        errorMessage : 'Help article not found',
        name : 'Created by Pravinewa'
    })
})

app.get('*',(req,res,next)=>{
    res.render('error',{
        title: 'Page Not Found',
        errorMessage : '404!!',
        name : 'Created by Pravinewa'
    })
})

server.listen(port,()=>{
    console.log('Listening at port :'+port)
})
