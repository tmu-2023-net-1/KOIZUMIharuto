let rotationRateX = 0;
let rotationRateY = 0;
let rotationRateZ = 0;
let rotationButton;
let layer = 1;
var worldX = new Array(layer);
var worldY = new Array(layer);
let touchIsDown = false;
let enidingBool;
let reverseEnding;
let nextButtonBool = false;


let startTime = 0;
let curIndex = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);

  enidingBool = false;
  startTime = 0;

  
  
 
  
  rotationButton = createButton("Rotation Permission");
  rotationButton.position(width / 2 - rotationButton.width / 2, 10);
  // rotationButton.mousePressed(requestMotionPermission);
  rotationButton.mousePressed(function() {
    //wait requestMotionPermission  and after that open google.com
    requestMotionPermission();
    window.open("https://www.google.com/");
  });
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
      worldX[i] += 4 * rotationRateX / (25 - 5 * i);
      worldY[i] += 4 * rotationRateZ / (25 - 5 * i);
    }
  }
  if(keyIsDown(RIGHT_ARROW)) {
    for(let i = 0; i < layer; i ++) {
      worldX[i] -= 10;
    }
  }else if(keyIsDown(LEFT_ARROW)) {
    for(let i = 0; i < layer; i ++) {
      worldX[i] += 10;
    }
  }
  
  


  textSize(20);
  let story = "気がつくと廊下にいた。真っ白な廊下に。少し弧を描くように曲がっているせいで遠く先は見えず、枝分かれもなければ扉もない、この延々と続く廊下を歩かざるを得なかった。そしてしばらく歩くうちに、気付いたことがある。どれだけ歩いたところで、疲労も空腹も眠気も感じないのだ。それと同時にいくら歩いても景色は変わらないのだが。これは夢だろうか？現実だとしたらどこなのだろうか?そろそろ1周したのではないだろうか?そんな事を考えながら進んでいるとふいに遠くから声が聞こえたような気がした。もう一度聞こえた。後ろからだ。振り返ってみると遠くに人影が見えた、、気がしたのだがまばたきと同時にその人影は消えていた。きっと疲れているのだろうと思いながらも再び歩き出す。やはり景色は変わらない。もう1周したのではないかと思ったその時、今度は前方に人影が見える。やはり遠いが自分と同じで歩いているように見える。今度は幻覚ではないことを祈りながら呼びかけてみる。聞こえていないのだろうか。もう一度呼びかけるとその人影は振り向いた、、気がしたのだがまばたきと同時にその人影は消えていた。きっと疲れているのだろう。それからしばらくの間また歩いていたがまた後ろから声が聞こえた。振り返ってみるとまた遠くに人影が見える。今度はまばたきをしても消えない、、と考えていたらいつの間にか消えていた。やはり幻覚。疲労は感じなくともここまで同じ景色が続くと精神的に疲れてくるわけだ。となれば考えても仕方がないし身体は疲れていないわけなのでまた歩き出す。もう何周もしたのではないだろうか。それにおそらく1周するごとに同じことを繰り返している気がする。後ろから声がしたと思えば消え、前に人影が見えたと思えば消える。そんな事を考えながら歩いていると、やはり今度は前方に人影が見えた。しかしこれまでとは違いこちらに向かって歩いてくる。まばたきをしても消えない、、と考えていてもその人影は消えず、着々と距離を縮めてくる。ようやく顔が見えそうな距離になった時、相手が「戻れ」と叫んできた。そしてそれと同時にその人は消えた。まばたきはしていない。確実に人であると視認できる距離で目を離していないのに消えたのだ。結局あの人は何者なのか、薄々分かったが確信はない。"
  let storyWidth = textWidth(story);
  textAlign(LEFT, TOP);
  text(story, worldX[0], worldY[0]);
  line(worldX[0] + storyWidth, worldY[0] - 10, worldX[0] + storyWidth, worldY[0] + 10);
  
  
  let ending = "ただ、このままさらに進むのではなく戻ることにした。すると前方に人影が見えた。こちらに向かって歩いてくる。距離が近づくに連れここは現実世界ではないという仮説が確かなものになっていく。そして相手の顔が確かに見えた時、咄嗟に叫んだ。その直後、私は意識を失った。薄れゆく意識の中、引き返さなかったらどうなっていたのだろうと思いながら。";
  let endingsWidth = textWidth(ending);
  if(-worldX[0] > storyWidth - width) {
    enidingBool = true;
    console.log(enidingBool);
  }
  if(enidingBool) {
    textAlign(RIGHT, TOP);
    // text(ending, worldX[0] + storyWidth - width, worldY[0] + 100);

    //endingを1秒に1文字ずつ表示
    

    if(millis() - startTime > 100) {
      if (curIndex < ending.length) {
        if(reverseEnding == undefined) {
          reverseEnding = ending.substring(curIndex, curIndex+1);
        }else{
          reverseEnding = ending.substring(curIndex, curIndex+1) + reverseEnding;
        }
      }else{
        if(!nextButtonBool) {
          console.log(location.href);
          let nextButton = createButton("Next");
          nextButton.position(width / 2 - nextButton.width / 2, height / 2 - nextButton.height / 2);
          nextButton.mousePressed(function() {
            location.reload();
            // window.open("https://www.google.com/");
          });
          nextButtonBool = true;
        }
      }
      curIndex++;
      startTime = millis();
    }
    
    text(
      reverseEnding,
      worldX[0] + storyWidth,
      worldY[0] + 100
    );
    
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
