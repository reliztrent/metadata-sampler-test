$(document).ready( function () {
    d3.json('data/loc_fields_usedin.json', function (data) {
        var fields = {
            x: [],
            y: [],
            text: [],
            type: 'bar',
            marker: {color: 'rgba(0, 102, 255, .6)'},
            hovertemplate:  'Fields count: %{y}' +
                            '<br>Num. collections: %{text} (%{x}%)' +
                            '<extra></extra>',
        }; 
        data.forEach(function(val) {  
            fields.x.push(val['used_in_percent']);
            fields.y.push(val['count']);
            fields.text.push(val['used_in']);
        });
        var layout = {
            title: {
                text: 'Number of JSON search Record results Metadata Fields, by proportional frequency',
                xanchor: 'right',
            },
            xaxis: { 
                title:'Field frequency (in % of collection samples)',
                hoverformat: '.2f',
                zeroline: false,
            },
            yaxis: { title:'Number of fields', zeroline: false, },
            hovermode: 'closest',
            hoverlabel: {
                bordercolor: 'white',
                bgcolor: 'rgba(0, 102, 255, 1)',
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
        Plotly.newPlot('bar1', [fields], layout, config);
    });
});