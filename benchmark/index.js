const fs = require('fs');
const Inspector = require('inspector-api');
const Benchmark = require('benchmark');
const Convert = require('../dist/app')
const suite = new Benchmark.Suite;
const inspector = new Inspector()

inspector.profiler.enable()
inspector.heap.enable()

suite.add('ConvertBenchmark', function() {
  Convert.default(
    {
      a: { b: 1 },
      b: { c: { d: { e: { f: { g: { h: { i: { j: { k: 1 } } } } } } } } },
    },
    { path: ["b", "c", "d", "e", "f", "g", "h", "i", "j", "k"], unit: 0.7 }
  );
  
}, {
  'onStart': async () => {
    await inspector.profiler.start()
    await inspector.heap.startSampling()
  },
  'onComplete': async () => {
    const cpuProfiler = await inspector.profiler.stop()
    fs.writeFile('cpuProfiler.json', JSON.stringify(cpuProfiler), (err) => {
      if (err) return console.log(err);
      console.info('cpuProfiler file created');
    })
    const memorySampling = await inspector.heap.stopSampling()
    fs.writeFile('memorySampling.json', JSON.stringify(memorySampling), (err) => {
      if (err) return console.log(err);
      console.info('memorySampling file created');
    })
  }
})
.run();