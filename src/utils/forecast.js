const request = require('request')



const forecast = (latitude, longitude, callback)=>{
	const url = 'https://api.darksky.net/forecast/5f880e9f4243965f7fbb766df6664138/'+latitude+','+longitude+'?units=si'

	request({url: url, json: true}, (error,response)=>{
		if(error)
		{
			callback('Unable to connect', undefined)
		}
		else if(response.body.error)
		{
			callback('Invalid location', undefined)
		}

		else
		{
			callback(undefined, response.body.daily.data[0].summary + " The current temperature is " +response.body.currently.temperature + " in "+response.body.timezone+". There is " + response.body.currently.precipProbability + "% chance of rain.")
		}
	})

}

module.exports = forecast