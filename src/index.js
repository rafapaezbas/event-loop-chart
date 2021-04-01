const { monitorEventLoopDelay } = require('perf_hooks');
const h = monitorEventLoopDelay({ resolution: 20 });
const render = require('./render');
const EventLoopChart = () => { };

const terminateSignals = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'];

var data = [];
data['p10'] = [];
data['p25'] = [];
data['p50'] = [];
data['p95'] = [];
data['p99'] = [];

h.enable();

EventLoopChart.init = (frequency,path, onexit) => {
    initTimer(frenquency);
    if(onexit){
        enableFinalRender(path);
    }
};

EventLoopChart.snapshot = () => {
    render.render(data,path);
};

const initTimer = (frenquency) => {
    setTimeout(() => {
        data['p10'].push(h.percentile(10));
        data['p25'].push(h.percentile(25));
        data['p50'].push(h.percentile(50));
        data['p95'].push(h.percentile(95));
        data['p99'].push(h.percentile(99));
    },frequency);
};

const enableFinalRender = (path) => {
    terminateSignals.forEach((eventType) => {
        process.on(eventType,() => {
            render.render(data,path);
        });
    });
};

module.exports = EventLoopChart;
