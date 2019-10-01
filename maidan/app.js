const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app = express()
const port = process.env.PORT || 4444

const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Created by Pravinewa'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Created by Pravinewa'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title : 'Help Page',
        helpText : 'This is some helping text',
        name : 'Created by Pravinewa'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error : 'Loaction must provide to get weather report'
        })
    }

    geocode(req.query.search, (error, {longitude, latitude, location} = {}) => {
            if(error){
                return res.send({ error })      
            }

            forecast( latitude, longitude,(error, foreacstData) =>{
                if(error){
                    return res.send({ error })
                }
                res.send({
                    Data : foreacstData,
                    location,
                    address : req.query.search 

                })
            })
        })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title : 'Page Not Found',
        errorMessage : 'Help article not found',
        name : 'Created by Pravinewa'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: 'Page Not Found',
        errorMessage : '404!!',
        name : 'Created by Pravinewa'
    })
})

app.listen(port,()=>{
    console.log('Listening at port :'+port)
})