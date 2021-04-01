 var assert = require('assert');
const render = require('../src/render');

const test = (description, expected, result) => {
    assert(expected === result(), description);
};

test("generated dataset should have 5 percentiles", 5, () => {
    const data = [];
    data['p10'] = [1];
    data['p25'] = [1];
    data['p50'] = [1];
    data['p95'] = [1];
    data['p99'] = [1];
    return render.generateDatasets(data).length;
});

test("generated dataset labels are correct", "p10,p25,p50,p95,p99", () => {
    const data = [];
    data['p10'] = [1];
    data['p25'] = [1];
    data['p50'] = [1];
    data['p95'] = [1];
    data['p99'] = [1];
    return render.generateDatasets(data).map(e => e.label).join(",");
});
