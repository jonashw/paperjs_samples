function Circular(arr, startIntex){
    this.arr = arr;
    this.currentIndex = startIntex || 0;
  }
  
  Circular.prototype.next = function(){
    var i = this.currentIndex, arr = this.arr;
    this.currentIndex = i < arr.length-1 ? i+1 : 0;
    return this.current();
  }
  
  Circular.prototype.prev = function(){
    var i = this.currentIndex, arr = this.arr;
    this.currentIndex = i > 0 ? i-1 : arr.length-1;
    return this.current();
  }
  
  Circular.prototype.current = function(){
    return this.arr[this.currentIndex];
  }
  
  function cartesianProduct(arr) {
      return arr.reduce(function(a,b){
          return a.map(function(x){
              return b.map(function(y){
                  return x.concat([y]);
              })
          }).reduce(function(a,b){ return a.concat(b) },[])
      }, [[]])
  }
  
  var osc;
  var started = false;
  var major = [2,2,1,2,2,2,1];
  var minor = [2,1,2,2,1,2,2];
  function f(n,f0) { return (!!f0 ? f0 : 440) * Math.pow(1.05946,n); }
  
  function scaleTones(intervals,f0){
      return intervals.reduce(function(state,nextInterval){ 
          var i = state.lastInterval + nextInterval; 
          state.intervals.push(i); 
          state.lastInterval = i; 
          return state; 
      }, {lastInterval: 0, intervals: [0]})
      .intervals
      .map(function(i){ return f(i,f0); });
  }

window.startText = 
  new PointText({
    position: new Point(100,75),
    content: 'Click to start audio'
  })

var statusText = 
  new PointText({
    position: new Point(100,90),
    content: ''
  })

var toneInterval;
function onMouseDown(e){
  if(!started){

    var audioContext = new window.AudioContext();
    var masterGainNode = audioContext.createGain();
    masterGainNode.connect(audioContext.destination);
    osc = audioContext.createOscillator();
    window.osc = osc;
    osc.type = 'sine';
    osc.connect(masterGainNode);
    osc.start();
    applyCurrentTone();
    toneInterval = setInterval(function(){
      tones.next();
      applyCurrentTone();
    },500);
    started = true;
  } else {
    osc.stop();
    clearInterval(toneInterval);
    statusText.content = '';
    started = false;
  }

  startText.visible = !started;
}

  var majorMinorTones = function(f0){ return scaleTones(major,f0).concat(scaleTones(minor,f0)); };
  var tones = new Circular(cartesianProduct([
    majorMinorTones(110).concat(majorMinorTones(440)),
    ['sine','triangle','square','sawtooth']
  
  ]).map(function(arr){
      return {
          frequency: arr[0],
          type: arr[1]
      };
  }));
  
  function applyCurrentTone(){
      osc.frequency.value = tones.current().frequency;
      osc.type = tones.current().type;
      statusText.content = osc.frequency.value.toFixed(2) + ' Hz (' + osc.type + ')'
  }
  