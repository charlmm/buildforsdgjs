var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
var estimator = require('./src/estimator.js').covid19ImpactEstimator
var xml = require('xml')
var dotenv = require('dotenv')

dotenv.config()

var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser())

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan(':method  :url  :status  :response-time ms', { stream: accessLogStream}))


app.get('/api/v1/on-covid-19/:returnType', (req, res) => {
	var returnType = req.params.returnType
	var data = {}

	var region = {}
	region.name = req.body.name
	region.avgAge = req.body.avgAge
	region.avgDailyIncomeInUSD = req.body.avgDailyIncomeInUSD
	region.avgDailyIncomePopulation = req.body.avgDailyIncomePopulation

	data.region = region
	data.periodType = req.body.periodType
	data.timeToElapse = req.body.timeToElapse
	data.reportedCases = req.body.reportedCases
	data.population = req.body.population
	data.totalHospitalBeds = req.body.totalHospitalBeds

	if (returnType == 'json') {

		res.json(estimator(data))
	} else if (returnType == 'xml') {
		res.type('ContentType','application/xml')
		res.send(xml(estimator(data)))
	}
})

app.get('/api/v1/on-covid-19', (req,res) => {
	var returnType = req.params.returnType
	var data = {}
	
	var region = {}
	region.name = req.body.name
	region.avgAge = req.body.avgAge
	region.avgDailyIncomeInUSD = req.body.avgDailyIncomeInUSD
	region.avgDailyIncomePopulation = req.body.avgDailyIncomePopulation

	data.region = region
	data.periodType = req.body.periodType
	data.timeToElapse = req.body.timeToElapse
	data.reportedCases = req.body.reportedCases
	data.population = req.body.population
	data.totalHospitalBeds = req.body.totalHospitalBeds

	res.json(estimator(data))
})

app.listen(port, () => console.log("listening on port 3000"))