class Line {
  constructor(x, y){
    this.points = [x, y];
    this.terminated = false;
  }

  grow(step, rotAngle, lines){
    if (this.terminated) return;
    const size = this.points.length - 1;
    const lastPoint = this.points[size];
    const blastPoint = this.points[size-1];
    let angle = p5.Vector.sub(lastPoint, blastPoint).heading();
    angle += randomGaussian() * rotAngle;
    const newPoint = p5.Vector.add(lastPoint,p5.Vector.fromAngle(angle).mult(step));
    for (let i = 0; i < lines.length; i++){
      const otherLine = lines[i];
      if (otherLine != this && otherLine.points.length != 2){
        for (let k = 0; k < otherLine.points.length; k++){
          if(this.isNear(newPoint, otherLine.points[k], step)){
            this.terminated = true;
          }
        }
      }
    }
    this.points.push(newPoint);
  }

  branch(rotAngle, dens, lines){
    for(let i = this.points.length - 1; i > 0; i--){
      if(random(1) < dens){
        const lastPoint = this.points[i];
        const blastPoint = this.points[i - 1];
        let angle = p5.Vector.sub(lastPoint, blastPoint).heading();
        if(random(1) > 0.5) {angle += HALF_PI;}
        else {angle += (HALF_PI + PI);}
        angle += randomGaussian() * rotAngle;
        const newPoint = p5.Vector.add(lastPoint, p5.Vector.fromAngle(angle).mult(step));
        for (let j = 0; j < lines.length; j++){
          const otherLine = lines[j];
          if(otherLine != this){
            for (let k = 0; k < otherLine.points.length; k++){
              if(this.isNear(newPoint, otherLine.points[k], step)){
                return null;
              }
            }
          }
        }
        return new Line(lastPoint, newPoint);
      }
    }
    return null;
  }

  terminate(){
    const lastPoint = this.points[this.points.length - 1];
    if (lastPoint.x < 0 ||
        lastPoint.x > width ||
        lastPoint.y < 0 ||
        lastPoint.y > height) {
      this.terminated = true;
    }
  }

  isNear(point, otherPoint, thresh){
    const magnitude = p5.Vector.sub(otherPoint, point).magSq();
    return magnitude > thresh * thresh ? false : true;
  }

  draw(){
    noFill();
    beginShape();
    for (const point of this.points){
      vertex(point.x, point.y);
    }
    endShape();
  }
}