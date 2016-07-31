
// major scale
// var freqs = [
//   130.8127826502993,
//   146.8323839587038,
//   164.81377845643496,
//   174.61411571650194,
//   195.99771799087463,
//   220,
//   246.94165062806206,
//   261.6255653005986
// ];

// var synth = T("OscGen", {wave:"saw", mul:0.25}).play();

console.log('Loading player')

var pattern = new sc.Pshuf(sc.series(12), Infinity);
var scale   = new sc.Scale.major();
var chords  = [
  [0, 1, 4], [0, 1, 5], [0, 1, 6],
  [0, 2, 6], [0, 2, 5], [0, 2, 4],
  [0, 3, 6], [0, 3, 5], [0, 3, 4]
];

var msec = timbre.timevalue("BPM120 L16");
var osc  = T("saw");
var env  = T("env", {table:[0.2, [1, msec * 48], [0.2, msec * 16]]});
var gen  = T("OscGen", {osc:osc, env:env, mul:0.5});

var pan   = T("pan", gen);
var synth = pan;

synth = T("+saw", {freq:(msec * 2)+"ms", add:0.5, mul:0.85}, synth);
synth = T("lpf" , {cutoff:800, Q:12}, synth);
synth = T("reverb", {room:0.95, damp:0.1, mix:0.75}, synth);

T("interval", {interval:msec * 64}, function() {
  var root = pattern.next();
  chords.choose().forEach(function(i) {
    gen.noteOn(scale.wrapAt(root + i) +60, 80);
  });
  pan.pos.value = Math.random() * 2 - 1;
}).set({buddies:synth}).start();

export default {
  // play note in the major scale
  playNote: function (note) {
    var freq = sc.Scale.major().degreeToFreq(note, (60).midicps(), 1);
    T("pluck", {freq:freq}).bang().play()

    // var l = T("lag", {time:500}, T("pluck", {freq:freq2, mul:0.5}))
    // t.bang().play()
    // l.bang().play()
  }
}

