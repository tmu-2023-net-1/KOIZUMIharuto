let rotationRateX = 0;
let rotationRateY = 0;
let rotationRateZ = 0;
let rotationButton;
let layer = 1;
var worldX = new Array(layer);
var worldY = new Array(layer);
let touchIsDown = false;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);

  rotationButton = createButton("Rotation Permission");
  rotationButton.position(width / 2 - rotationButton.width / 2, 10);
  rotationButton.mousePressed(requestMotionPermission);
  for(let i = 0; i < layer; i ++) {
    worldX[i] = width / 2;
    worldY[i] = height / 2;
  }

  canvas.touchStarted(function() {
    touchIsDown = true;
  }
  );
  canvas.touchEnded(function() {
    touchIsDown = false;
  }
  );
}

function draw() {
  background(220);

  fill(0);
  textSize(20);
  stroke(0);
  strokeWeight(1);
  text("RotationRateX : " + (worldX[0] - width / 2).toFixed(2), width / 2, height / 2 - 10);
  text("RotationRateZ : " + (worldY[0] - height / 2).toFixed(2), width / 2, height / 2 + 10);

  if (touchIsDown) {
    for(let i = 0; i < layer; i ++) {
      worldX[i] += 0;
      worldY[i] += 0;
    }
  }else{
    for(let i = 0; i < layer; i ++) {
      worldX[i] += rotationRateX / (10 - 2 * i);
      worldY[i] += rotationRateZ / (10 - 2 * i);
    }
  }
  
  

  //格子状に線を引く
  for(let j = 0; j < 2; j ++) {
    for(let n = layer - 1; n >= 0; n--) {
      let interval = 40 - 10 * n;
      stroke(50 * n);
      fill(50 * n);
      strokeWeight(2 - n / 2);
      for (let xi = 0; xi < 2 * width; xi += interval) {
        line(
          worldX[n] + xi * (2*j-1), worldY[n] - 2 * height,
          worldX[n] + xi * (2*j-1), worldY[n] + 2 * height
        );
      }
      for (let yi = 0; yi < 2 * height; yi += interval) {
        line(
          worldX[n] - 2 * width, worldY[n] + yi * (2*j-1),
          worldX[n] + 2 * width, worldY[n] + yi * (2*j-1)
        );
      }
      ellipse(worldX[n], worldY[n], 20);
    }
  }

}

function handleMotion(event) {
  rotationRateX = event.rotationRate.beta; // X軸回転速度
  rotationRateY = event.rotationRate.gamma; // Y軸回転速度
  rotationRateZ = event.rotationRate.alpha; // Z軸回転速度
}

function requestMotionPermission() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === 'granted') {
          window.addEventListener('devicemotion', handleMotion);
        } else {
          console.log('Permission denied');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.log('Device Motion not supported');
  }

  // ボタンを非表示にする
  rotationButton.hide();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
