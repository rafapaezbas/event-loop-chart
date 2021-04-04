const  { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs').promises;

const width = 800;
const height = 600;

const labels = ['p10', 'p25', 'p50', 'p95', 'p99'];
const maxNumOfTicks = 8;

const colors = [];
colors['p10'] = 'rgba(92,194,204,1)';
colors['p25'] = 'rgba(23,141,153,1)';
colors['p50'] = 'rgba(139,255,201,1)';
colors['p95'] = 'rgba(255,204,207,1)';
colors['p99'] = 'rgba(204, 92, 154, 1)';


exports.render = async (data,interval,path) => {
    const configuration = {
        type: 'line',
        data: {
            labels: generateLabels(data,interval),
            datasets: generateDatasets(data),
        },
    };
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
    const url = await chartJSNodeCanvas.renderToDataURL(configuration);
    const file = url.replace(/^data:image\/png;base64,/, "");
    await fs.writeFile(path, file, 'base64');
};

const generateDatasets = exports.generateDatasets = (data) => {
    return labels.map(label => {
        return {
            label : label,
            data: data[label],
            borderColor: colors[label],
            fill: false
        };
    });
};

const chartCallback = (ChartJS) => {
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    ChartJS.defaults.scale.gridLines.color = 'rgba(0,0,0,0.1)';
};

const generateLabels = (data,interval) => {
    var samples = data["p10"].length; // Any p would do
    var time = interval * samples;
    var labels = [];
    for(var i = 0; i < maxNumOfTicks && i < samples; i++){
        var ticks = samples > maxNumOfTicks ? maxNumOfTicks : samples;
        labels.push((time / ticks) * i);
    }
    return labels;
};
