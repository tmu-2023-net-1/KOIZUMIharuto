let rotationRateX = 0;
let rotationRateY = 0;
let rotationRateZ = 0;
let rotationButton;
let exitButton;
let layer = 1;
var worldX = new Array(layer);
var worldY = new Array(layer);
let touchIsDown = false;
let enidingBool;
let reverseEnding;
let nextButtonBool = false;

let backgroundBool = false;
let backgroundBlack = 0;

let startTime = 0;
let curIndex = 0;

let prorogue = "気がつくと廊下にいた。";
let story = "真っ白な廊下に。少し弧を描くように曲がっているせいで遠く先は見えず、枝分かれもなければ扉もない、この延々と続く廊下を歩かざるを得なかった。そしてしばらく歩くうちに、気付いたことがある。どれだけ歩いたところで、疲労も空腹も眠気も感じないのだ。それと同時にいくら歩いても景色は変わらないのだが。これは夢だろうか？現実だとしたらどこなのだろうか?そろそろ1周したのではないだろうか?そんな事を考えながら進んでいるとふいに遠くから声が聞こえたような気がした。もう一度聞こえた。後ろからだ。振り返ってみると遠くに人影が見えた、、気がしたのだがまばたきと同時にその人影は消えていた。きっと疲れているのだろうと思いながらも再び歩き出す。やはり景色は変わらない。もう1周したのではないかと思ったその時、今度は前方に人影が見える。やはり遠いが自分と同じで歩いているように見える。今度は幻覚ではないことを祈りながら呼びかけてみる。聞こえていないのだろうか。もう一度呼びかけるとその人影は振り向いた、、気がしたのだがまばたきと同時にその人影は消えていた。きっと疲れているのだろう。それからしばらくの間また歩いていたがまた後ろから声が聞こえた。振り返ってみるとまた遠くに人影が見える。今度はまばたきをしても消えない、、と考えていたらいつの間にか消えていた。やはり幻覚。疲労は感じなくともここまで同じ景色が続くと精神的に疲れてくるわけだ。となれば考えても仕方がないし身体は疲れていないわけなのでまた歩き出す。もう何周もしたのではないだろうか。それにおそらく1周するごとに同じことを繰り返している気がする。後ろから声がしたと思えば消え、前に人影が見えたと思えば消える。そんな事を考えながら歩いていると、やはり今度は前方に人影が見えた。しかしこれまでとは違いこちらに向かって歩いてくる。まばたきをしても消えない、、と考えていてもその人影は消えず、着々と距離を縮めてくる。ようやく顔が見えそうな距離になった時、相手が「戻れ」と叫んできた。そしてそれと同時にその人は消えた。まばたきはしていない。確実に人であると視認できる距離で目を離していないのに消えたのだ。結局あの人は何者なのか、薄々分かったが確信はない。"
let ending = "ただ、このままさらに進むのではなく戻ることにした。すると前方に人影が見えた。こちらに向かって歩いてくる。距離が近づくに連れここは現実世界ではないという仮説が確かなものになっていく。そして相手の顔が確かに見えた時、咄嗟に叫んだ。その直後、私は意識を失った。薄れゆく意識の中、引き返さなかったらどうなっていたのだろうと思いながら。";
let prorogueWidth = 0;
let storyWidth = 0;
let endingsWidth = 0;

let leftImg;
let rightImg;
let footprint;
let footprintHeight;

let exitButtonX = 0;
let exitButtonBool = false;


const myURL = new URL(location.href);
function preload(){
  footprint = loadImage("right.png");
}

function isSmartPhone() {
  // UserAgentからのスマホ判定
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return true;
  } else {
    return false;
  }
}

const buttonOpen = document.getElementsByClassName('modalOpen')[0];
const modal = document.getElementsByClassName('modal')[0];
const buttonClose = document.getElementsByClassName('modalClose')[0];
const body = document.getElementsByTagName('body')[0];

const keyName = 'visited';
const keyValue = true;
if (!sessionStorage.getItem(keyName)) {
    sessionStorage.setItem(keyName, keyValue);
    if(!isSmartPhone()) {
      modal.style.display = 'block';
      body.classList.add('open');
    }
}

// バツ印がクリックされた時
buttonClose.addEventListener('click',function(){
  modal.style.display = 'none';
  body.classList.remove('open');
});

// モーダルコンテンツ以外がクリックされた時
modal.addEventListener('click', function(){ 
    modal.style.display = 'none';
    body.classList.remove('open');
});

function setup() {

  frameRate(120);

  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);

  background(backgroundBlack);

  enidingBool = false;
  startTime = 0;

  prorogueWidth = textWidth(prorogue);
  storyWidth = textWidth(story);
  
  rotationButton = createButton("目を覚ます");
  rotationButton.position(width / 2 - rotationButton.width / 2, height / 2 - rotationButton.height / 2);
  rotationButton.mousePressed(function() {
    requestMotionPermission();
    backgroundBool = true;
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
  if(backgroundBool) {
    if(enidingBool){
      backgroundBlack--;
    }else{
      backgroundBlack++;
    }
    if(backgroundBlack > 255) {
      backgroundBool = false;
    }else if(backgroundBlack < 0) {
      backgroundBool = false;
      window.location.assign(myURL);
    }
  }
  background(backgroundBlack);


  fill(0);
  controls();

  let speed = 200;
  if(backgroundBlack >= 255){
    if(!enidingBool) {
      if( worldX[0] - prorogueWidth/2 + textWidth(prorogue) < width*3/4 || millis() - startTime > speed) {
        if (curIndex < story.length) {
          prorogue = prorogue + story.substring(curIndex, curIndex+1);
          curIndex++;
          startTime = millis();
        }else{
          enidingBool = true;
          curIndex = 0;
          startTime = millis();
        }
      }
    }else{
      if(worldX[0] - prorogueWidth/2 + textWidth(prorogue) - textWidth(reverseEnding) > width/4 || millis() - startTime > speed) {
        if (curIndex < ending.length) {
          if(reverseEnding == undefined) {
            reverseEnding = ending.substring(curIndex, curIndex+1);
          }else{
            reverseEnding = ending.substring(curIndex, curIndex+1) + reverseEnding;
          }
        }else{
          backgroundBool = true;
        }
        curIndex++;
        startTime = millis();
      }
    }
  }
  
  textSize(20);

  textAlign(LEFT, CENTER);
  noStroke();
  text(prorogue, worldX[0] - prorogueWidth/2, worldY[0]-100);
  stroke(150);
  line(0,worldY[0]-65,width,worldY[0]-65);

  let repeat = 5;
  let positionY = 0;
  if (!enidingBool) {
    positionY = -25;
    if (curIndex % repeat == 0) {
      storyWidth = textWidth(prorogue);
      if ((curIndex / repeat) % 2 == 0) {
        footprint = loadImage("left.png");
        footprintHeight = 10;
      } else {
        footprint = loadImage("right.png");
        footprintHeight = -10;
      }
    }
  }else{
    positionY = 25;
    if (curIndex % repeat == 0) {
      endingsWidth = textWidth(reverseEnding);
      if ((curIndex / repeat) % 2 == 0) {
        footprint = loadImage("left2.png");
        footprintHeight = -10;
      } else {
        footprint = loadImage("right2.png");
        footprintHeight = 10;
      }
    }
  }
  imageMode(CENTER);
  image(footprint, worldX[0] - prorogueWidth / 2 + storyWidth - endingsWidth, worldY[0] + positionY - footprintHeight, footprint.width / 4, footprint.height / 4);

  noStroke();
  textAlign(RIGHT, CENTER);
  text(
    reverseEnding,
    worldX[0] - prorogueWidth/2 + textWidth(prorogue),
    worldY[0] + 100
  );
  stroke(150);
  line(0,worldY[0]+65,width,worldY[0]+65);

  if(-(worldX[0] + prorogueWidth/2) > textWidth(story) + width) {
    if(!exitButtonBool){
      exitButton = createButton("抜け出す");
      exitButtonX = width;
      exitButton.position(exitButtonX, height / 2 - exitButton.height / 2);
      exitButton.mousePressed(function() {
        open('about:blank', '_self').close();
      });
      exitButtonBool = true;
    }
    if(exitButtonX > width / 2 - exitButton.width / 2) {
      exitButtonX -= 5;
      exitButton.position(exitButtonX, height / 2 - exitButton.height / 2);
    }
  }
}

function handleMotion(event) {
  rotationRateX = event.rotationRate.beta; // X軸回転速度
  rotationRateY = event.rotationRate.gamma; // Y軸回転速度
  rotationRateZ = event.rotationRate.alpha; // Z軸回転速度
}

function requestMotionPermission() {
  if(isSmartPhone()) {
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
  }

  // ボタンを非表示にする
  rotationButton.hide();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function controls() {
  if (touchIsDown) {
    for(let i = 0; i < layer; i ++) {
      worldX[i] += 0;
      worldY[i] += 0;
    }
  }else{
    for(let i = 0; i < layer; i ++) {
      worldX[i] += rotationRateX / (5 - i);
      worldY[i] += rotationRateZ / (5 - i);
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
}