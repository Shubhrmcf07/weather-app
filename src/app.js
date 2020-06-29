const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDir = path.join(__dirname, '../Public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



app.use(express.static(publicDir))

app.set('view engine', 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res)=>{
	res.render('index', {
		title: "Weather",
		location: "India",
		weather: "Rainy",
		name: "Shubham"
	})
})

app.get('/products',(req,res)=>{
	if(!req.query.search)
	{
		return res.send({
			error: "You must display a search result"
		})
	}
	console.log(req.query.search)
	res.send({
		products : []
	})
})

app.get('/weather', (req, res)=>{

	if(!req.query.address)
	{
		return res.send({
			error: "You must provide a valid address"
		})
	}

	geocode(req.query.address, (error, data={})=>
{
    if(error)
    {
        return res.send({error: "Unable to process request"})
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if(error)
        {
            return res.send({error: "Unable to process request"})
        }
  res.send({
  	address : req.query.address,
  	location: data.location,
  	forecast: forecastData
  })
    })
 })
})




app.get('*', (req, res)=>{
	res.render('404',{
		errorMessage: "Error 404: Page not found",
		name: "Shubham",
		title: "Error Page"
	})
})
app.listen(8080, ()=>{
	console.log("Server up and running")
})