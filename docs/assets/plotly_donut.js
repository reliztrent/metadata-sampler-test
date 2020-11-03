$(document).ready( function () {
    d3.json('data/loc_fields_types.json', function (data) {
        var fields = {
            values: [],
            labels: [],
            name: 'Data types',
            text: [],
            type: 'pie',
            hole: .4,
            opacity: .8,
        }; 
        data.forEach(function(val) {  
            fields.values.push(val['count']);
            fields.labels.push(val['type']);
        });
        var layout = {
            title: {
                text: 'Data types',
                xanchor: 'right',
            },
            xaxis: { 
                title:'Field frequency (in % of collection samples)',
                hoverformat: '.2f',
                zeroline: false,
            },
            yaxis: { title:'Number of fields', zeroline: false, },
            showlegend: false,
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
        Plotly.newPlot('donut1', [fields], layout, config);
    });
});