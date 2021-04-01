const  { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs').promises;

const width = 800;
const height = 600;

const labels = ['p10', 'p25', 'p50', 'p95', 'p99'];

const colors = [];
colors['p10'] = 'rgba(0,0,255,1)';
colors['p25'] = 'rgba(255,0,255,1)';
colors['p50'] = 'rgba(255,0,0,1)';
colors['p95'] = 'rgba(0,255,0,1)';
colors['p99'] = 'rgba(255,255,0,1)';


exports.render = async (data,path) => {
    const configuration = {
        type: 'line',
        data: {
            labels: labels,
            datasets: generateDatasets(data),
        }
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
