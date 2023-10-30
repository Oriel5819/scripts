# JAVASCRIPT HIGCHART

## ALFRED

## pmr
```javascript
// THIS CODE IS FROM Alfred-Web/public/javascript/sites/info_energy.js
// SERIESING FUNCTION

function seriesing(values) {

		let pointStart;
		let toRender = [];

		const headers = Object.keys(values);
		const bodies = Object.values(values);

		for (let headerIndex in headers) {
			let name = headers[headerIndex]
			let values_ = Object.values(bodies[headerIndex]);
			let data = [];
			let dates = {};

			for (let { date, value } of values_) {
				const date_ = moment(date).unix() * 1000;

				if (typeof pointStart == "undefined") pointStart = date;

				if (!dates[date_]) data.push([date_, value]);
				dates[date_] = true;
			};
			data = _.sortBy(data, function (o) { return o[0] }); // ASCENDENT SORTING
			toRender.push({ name, data, color: name === 'ConsumedEnergy_Wh' ? '#ff8a80' : name === 'PowerConsumption_W' ? '#ffd180' : name === 'Voltage_V' ? '#80d8ff' : '#000000' });
			// toRender.push({
			// 	name, data, lineWidth: 0,
			// 	marker: {
			// 		enabled: true,
			// 		radius: 2
			// 	},
			// 	tooltip: {
			// 		valueDecimals: 2
			// 	},
			// 	states: {
			// 		hover: {
			// 			lineWidthPlus: 0
			// 		}
			// 	}
			// });
		}
		return toRender;
	}
	
	
// BEFORE
Highcharts.chart(id, {
	chart: {
		type: 'line',
		zoomType: 'x',
		panning: true,
		panKey: 'shift'
	},
	navigator: {
		enabled: true,
		xAxis: {
			labels: {
				enabled: false
			}
		}
	},
	scrollbar: {
		enabled: true
	},
	title: null,
	xAxis: {
		type: "datetime",
		dateTimeLabelFormats: {
			hour: "%e %b %H:%M"
		},
	},
	// rangeSelector: {
	// 	selected: 4
	// },
	// plotOptions: {
	// 	series: {
	// 		marker: {
	// 			enabled: false,
	// 			symbol: 'circle',
	// 			radius: 2,
	// 			states: {
	// 				hover: {
	// 					enabled: true
	// 				}
	// 			}
	// 		}
	// 	}
	// },
	series: seriesing(values);
});

// UPDATE

Highcharts.stockChart(id, {
	rangeSelector: {
		selected: 1
	},
	xAxis: {
		ordinal: false, // IREGULAR TIME INTERVAL
		type: 'datetime',
		dateTimeLabelFormats: {
			month: '%e. %b',
			year: '%b',
			minute: '%H:%M',
			hour: '%H:%M',
			day: '%e. %b',
		}
	},
	series: seriesing(values);
});
```
