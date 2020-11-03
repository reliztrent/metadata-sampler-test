$(document).ready( function () {
    d3.json('data/loc_fields.json', function (data) {
        fields = [] 
        data.forEach(function(val, i) {
            fields[i] = {
                x: [],
                y: [],
                type: 'scatter',
                mode: 'markers',
                name: '',
                text: [],
                marker: {
                    size: [],
                    color: 'rgba(255, 116, 0, 0.4)',
                    line: {
                        color: 'white',
                        width: 1,
                    }
                },
                hovertemplate: '<b>%{text}</b>' +
                            '<br><br>Freq.: %{x}%' +
                            '<br>Max size: %{y}' +
                            '<extra></extra>',
            };   
            var percent = Math.floor(val['used_in_percent']);
            fields[i].name=val['field']+ ' (' + percent + '%)';
            fields[i].x.push(val['used_in_percent']);
            fields[i].y.push(val['max_values_in_sample']);
            fields[i].text.push(val['field']);
            fields[i].marker.size.push(10+val['max_values_in_sample']);
        });
        var layout = {
            title: {
                text: 'JSON search Record results Metadata Fields, by frequency and size',
                xanchor: 'right',
            },
            xaxis: { 
                title:'Field frequency (in % of collection samples)',
                hoverformat: '.2f',
                zeroline: false,
            },
            yaxis: { title:'Max field size', zeroline: false, },
            legend: {
                font: { size: 10 },
                title: { text: "Show/Hide Fields"}
            },
            hovermode: 'closest',
            hoverlabel: {
                bordercolor: 'white',
                bgcolor: 'rgba(255, 116, 0, 1)',
            }
        };
        var config = {
            responsive: true,
            modeBarButtonsToRemove: [
            'toImage','select2d','lasso2d',
            'toggleSpikelines','toggleHover',
            'hoverClosestGl2d'
            ]
        };
        Plotly.newPlot('bubble1', fields, layout, config);
    });
});