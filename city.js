// const s = 3.0;
const seed = 555555;
const step = 7.0;
const rotAngle = .01;
const dens = 0.1;

let canLoop = true;

let lines;

function setup() {
  createCanvas(800,800);
  lines = [];
  lines.push(new Line(createVector(width/2, height/2), createVector(width/2, height/2 - step)));
  randomSeed(seed);
}

function draw() {
  // noLoop();
  background(255);
  stroke(0); 
  noFill();
  
  for(let i = 0; i < lines.length; i++){
    let line = lines[i];

    // console.log(line);
    line.grow(step, rotAngle, lines);

    const nLine = line.branch(rotAngle, dens, lines);
    if (nLine) {lines.push(nLine);}

    line.terminate();
    line.draw();
  }
  // console.log(lines);
}

function keyPressed(){
  if (key == ' '){
    if (canLoop){
      console.log("PAUSED");
      canLoop = false;
      noLoop();
      return;
    }
    console.log("RESUMED");
    canLoop = true;
    loop();
    return;
  }
}