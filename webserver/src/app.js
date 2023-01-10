const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app=express()
const publicdir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicdir))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Tarun'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'uchiha clan',
        name:'uchiha itachi'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help me',
        name:'Tarun'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            err:'Please provide a valid location!'
        })
    }
    geocode(req.query.address,(err,{latitude,longitude,location}={})=>{
     if(err){
        return res.send({err})
     }
        forecast(latitude,longitude,(err,forecastData)=>{
            if(err){
                return res.send({err})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.rating)
res.send({
    products:[]
})
})
app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Tarun',
    err:'Help article not found'
  })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Krish',
        err:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})