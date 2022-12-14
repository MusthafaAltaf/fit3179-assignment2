import top_15_co2_emittors_waffle_json from '../data/top_15_co2_emittors_waffle.json' assert {type: 'json'}

// JS 

// console.log(top_15_co2_emittors_waffle_json)
var data = top_15_co2_emittors_waffle_json


//Waffle chart settings 
var heatmapEmptyCellsColor = '#EEEEEE',
    heatmapCellsColor = '#fb6a4a',
    labelTextSettings =
        'width:120px;align:center; verticalAlign:middle;font-weight:bold;color:#212121;';

function WaffleChart(data, div) {
    var sum = JSC.sum(data, 'CO2_Emission_waffle');
    data.forEach(function (item, i) {
        // var percent = (item.CO2_emission_waffle_perc * 100) / sum;
        var percent = item.CO2_emission_waffle_perc
        JSC.chart(div + (i + 1), {
            debug: false,
            type: 'heatmap solid',
            title: {
                label: { text: item.Country, height: 34 }
            },
            toolbar_visible: false,
            defaultAxis: { visible: false },
            annotations: [
                {
                    position: 'center',
                    label: {
                        text:
                            '<span style="font-size:18px">' +
                            JSC.formatNumber(item.CO2_Emission_waffle, 'n0') +
                            '</span><br>(' +
                            JSC.formatNumber(percent, 'n2') +
                            '%)',
                        style_fontWeight: 'bold',
                        align: 'center'
                    }
                }
            ],
            defaultSeries_mouseTracking_enabled: false,
            defaultPoint: {
                outline_color: 'white',
                focusGlow: false
            },
            legend_visible: false,
            series: [
                { points: generatePoints(percent) }
            ]
        });
    });
}
WaffleChart(data, 'chart');

function generatePoints(value) {
    var heatmapData = Array(50)
        .fill(-1)
        .fill(1, 0, Math.round(value));
    heatmapData = heatmapData.reduce(function (
        rows,
        key,
        index
    ) {
        return (
            (index % 10 === 0
                ? rows.push([key])
                : rows[rows.length - 1].push(key)) && rows
        );
    },
        []);
    var points = [];
    heatmapData.forEach(function (item1, i) {
        item1.forEach(function (item2, j) {
            points.push({
                x: j,
                y: i,
                z: item2,
                color:
                    item2 === 1
                        ? heatmapCellsColor
                        : heatmapEmptyCellsColor
            });
        });
    });
    return points;
} 