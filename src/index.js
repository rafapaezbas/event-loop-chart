const { monitorEventLoopDelay } = require('perf_hooks');
const h = monitorEventLoopDelay({ resolution: 20 });
const render = require('./render');

const EventLoopChart = () => { };

var data = [];
data['p10'] = [];
data['p25'] = [];
data['p50'] = [];
data['p95'] = [];
data['p99'] = [];


EventLoopChart.init = (interval,path) => {
    h.enable();
    initTimer(interval,path);
};

EventLoopChart.snapshot = (path) => {
    render.render(data,interval,path);
};

const initTimer = (interval,path) => {
    setInterval(() => {
        data['p10'].push(h.percentile(10));
        data['p25'].push(h.percentile(25));
        data['p50'].push(h.percentile(50));
        data['p95'].push(h.percentile(95));
        data['p99'].push(h.percentile(99));
        render.render(data,interval,path);
    },interval);
};

module.exports = EventLoopChart;
