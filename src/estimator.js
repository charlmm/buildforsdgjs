var impact = {}
var severeImpact = {}

exports.covid19ImpactEstimator = (data) => {
	currentlyInfected = data.reportedCases * 10
	impact.currentlyInfected = currentlyInfected
	severeImpact.currentlyInfected = data.reportedCases * 50

	impact.infectionsByRequestedTime = impact.currentlyInfected * 2**Math.trunc(data.timeToElapse/3)
	severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2**Math.trunc(data.timeToElapse/3)

	impact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15
	severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15

	totalHospitalBeds = data['totalHospitalBeds'] * 0.35

	impact.hospitalBedsByRequestedTime = totalHospitalBeds - impact.severeCasesByRequestedTime
	severeImpact.hospitalBedsByRequestedTime = totalHospitalBeds - severeImpact.severeCasesByRequestedTime

	impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05
	severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05

	impact.casesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02
	severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02

	dollarsInFlight = severeImpact.infectionsByRequestedTime * 0.65 * 1.5 * 30

	var output = {}
	output.data = data
	output.impact = impact
	output.severeImpact = severeImpact

	return output
};

