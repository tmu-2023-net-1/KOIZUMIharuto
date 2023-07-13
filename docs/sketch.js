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
  background(255);

  fill(0);
  textSize(20);
  // stroke(0);
  // strokeWeight(1);
  // text("RotationRateX : " + (worldX[0] - width / 2).toFixed(2), width / 2, height / 2 - 10);
  // text("RotationRateZ : " + (worldY[0] - height / 2).toFixed(2), width / 2, height / 2 + 10);

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
  // for(let j = 0; j < 2; j ++) {
  //   for(let n = layer - 1; n >= 0; n--) {
  //     let interval = 40 - 10 * n;
  //     stroke(50 * n);
  //     fill(50 * n);
  //     strokeWeight(2 - n / 2);
  //     for (let xi = 0; xi < 2 * width; xi += interval) {
  //       line(
  //         worldX[n] + xi * (2*j-1), worldY[n] - 2 * height,
  //         worldX[n] + xi * (2*j-1), worldY[n] + 2 * height
  //       );
  //     }
  //     for (let yi = 0; yi < 2 * height; yi += interval) {
  //       line(
  //         worldX[n] - 2 * width, worldY[n] + yi * (2*j-1),
  //         worldX[n] + 2 * width, worldY[n] + yi * (2*j-1)
  //       );
  //     }
  //     ellipse(worldX[n], worldY[n], 20);
  //   }
  // }
  let story = "気がつくと廊下にいた。真っ白な廊下に。少し弧を描くように曲がっているせいで遠く先は見えず、枝分かれもなければ扉もない、この延々と続く廊下を歩かざるを得なかった。そしてしばらく歩くうちに、気付いたことがある。どれだけ歩いたところで、疲労も空腹も眠気も感じないのだ。それと同時にいくら歩いても景色は変わらないのだが。これは夢だろうか？現実だとしたらどこなのだろうか?そろそろ1周したのではないだろうか?そんな事を考えながら進んでいるとふいに遠くから声が聞こえたような気がした。もう一度聞こえた。後ろからだ。振り返ってみると遠くに人影が見えた、、気がしたのだが瞬きと同時にその人影は消えていた。きっと疲れているのだろうと思いながらも再び歩き出す。やはり景色は変わらない。もう1周したのではないかと思ったその時、今度は前方に人影が見える。やはり遠いが自分と同じで歩いているように見える。今度は幻覚ではないことを祈りながら呼びかけてみる。聞こえていないのだろうか。もう一度呼びかけるとその人影は振り向いた、、気がしたのだが瞬きと同時にその人影は消えていた。きっと疲れているのだろう。それからしばらくの間また歩いていたがまた後ろから声が聞こえた。振り返ってみるとまた遠くに人影が見える。今度は瞬きをしても消えない、、と考えていたらいつの間にか消えていた。やはり幻覚。疲労は感じなくともここまで同じ景色が続くと精神的に疲れてくるわけだ。となれば考えても仕方がないし身体は疲れていないわけなのでまた歩き出す。もう何周もしたのではないだろうか。それにおそらく1周するごとに同じことを繰り返している気がする。後ろから声がしたと思えば消え、前に人影が見えたと思えば消える。そんな事を考えながら歩いていると、やはり今度は前方に人影が見えた。しかしこれまでとは違いこちらに向かって歩いてくる。瞬きをしても消えない、、と考えていてもその人影は着々と距離を縮めてくる。ようやく顔が見えそうな距離になった時、相手が「戻れ」と叫んできた。そしてそれと同時にその人は消えた。瞬きはしていない。確実に人であると視認できる距離で目を離していないのに消えたのだ。結局あの人は何者なのか、薄々分かったが確信はない。ただ、このままさらに進むのではなく戻ることにした。すると前方に人影が見えた。こちらに向かって歩いてくる。距離が近づくに連れここは現実世界ではないという仮説が確かなものになっていく。そして相手の顔が確かに見えた時、咄嗟に叫んだ。その直後、私は意識を失った。薄れゆく意識の中、引き返さなかったらどうなっていたのだろうと思いながら。"
  textAlign(LEFT, TOP);
  text(story, worldX[0], worldY[0]);

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
