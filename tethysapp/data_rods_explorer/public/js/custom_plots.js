function two_axis_plot(series, y_axis_1, y_axis_2) {
	series = series.replace(/\&#39;/g, "'")
	series = series.replace(/datetime.datetime/g, "Date.UTC")
	var datarods_ts = eval(series);

	arrayLength = datarods_ts[0]['data'].length;
	for (var i = 0; i < arrayLength; i++) {
		var time1 = new Date(datarods_ts[0]['data'][i][0]);
		var time2 = new Date(datarods_ts[1]['data'][i][0]);
		datarods_ts[0]['data'][i][0] = time1.setMonth(time1.getMonth() - 1);
	    datarods_ts[1]['data'][i][0] = time2.setMonth(time2.getMonth() - 1);
	    }

    $('#plot2container').highcharts({
        chart: {
            type: 'line',
        },
        title: {
            text: '',
            style: {
            	display: 'none'
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
        },
        yAxis: [{
            lineWidth: 1,
            title: {
                text: datarods_ts[0].code
            }
        }, {
            lineWidth: 1,
            opposite: true,
            title: {
                text: datarods_ts[1].code
            }
        }],
        
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        legend: {
        	enabled: true,
        },
        series: [{
            name: datarods_ts[0].name,
            data: datarods_ts[0].data,
            yAxis: 0
        }, {
            name: datarods_ts[1].name,
            data: datarods_ts[1].data,
            yAxis: 1
        }]
    });
};
