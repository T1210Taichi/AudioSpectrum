let mic, fft, peakDetect;
let minRadius = 50;
let radius = minRadius;

function setup() {
  //描画範囲を画面サイズいっぱいに設定
  let cnv = createCanvas(windowWidth, windowHeight);
  //画面がクリックされたらAudioの取り扱いを開始
  cnv.mouseClicked(userStartAudio);
  //マイクを利用するための初期設定
  mic = new p5.AudioIn();
  mic.start();
  //fftを利用するための初期設定
  fft = new p5.FFT(0.9, 256);
  fft.setInput(mic);

  peakDetect = new p5.PeakDetect(20, 2000, 0.5, 10);
  //図形の塗りつぶしを無効にする設定
  noFill();
  //図形の線の色を255（白）に設定
  stroke(255);
}

function draw() {
  //背景を0(黒)で塗りつぶす
  background(0);

  //ブラー
  //fill(0, 50);
  //rect(0, 0, width, height);

  //横
  showSpectrum(fft);

  
  //円形
  /*
  translate(width / 2, height / 2);
  peakDetect.update(fft);

  if ( peakDetect.isDetected ) {
    // ビートが検知されている場合、半径を90に設定
    radius = 90;
  } else {
    // ビートが検知されていない場合、半径を毎フレーム1ずつ小さくする
    radius -= 1;
    // minRadiusよりは小さくしない
    radius = (radius > minRadius) ?  radius : minRadius;
  }

  
  //スペクトルの開始角と終了角を引数年て渡す
  //右半分
  //赤色
  stroke(200,0,0);
  showSpectrum(fft, radius, radius+60, -90, 90);
  //左半分
  //青色
  stroke(0,0,200);
  showSpectrum(fft, radius, radius+60, 270, 90);
  */
}

//横
function showSpectrum(fft) {
  const spectrum = fft.analyze();

  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    // map関数でiを0からspectrum.lengthの範囲から、0からwidthの範囲に置き換える
    // x = i / (spectrum.length - 0) * (width - 0) と同義
    // 詳細：https://p5js.org/reference/#/p5/map
    const x = map(i, 0, spectrum.length, 0, width);

    const amp = spectrum[i];
    const y = map(amp, 0, 255, height-100, 0);

    // x, yの位置に頂点を打つ
    vertex(x, y);
  }
  // beginShape()からendShape()の間で打たれた頂点は線で結ばれる
  endShape();
}

/*
//円形
function showSpectrum(fft, minR, maxR, startAngle, endAngle) {
  const spectrum = fft.analyze();

  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    //
    //map関数でiを0からspectrum.lengthの範囲から、0からwidthの範囲に置き換える
    //x = i / (spectrum.length -0)*(width -0)と同義
    //
    const angle = map(i, 0, spectrum.length, radians(startAngle), radians(endAngle));

    const amp = spectrum[i];
    const r = map(amp, 0, 255, minR, maxR);
    const x = r * cos(angle);
    const y = r * sin(angle);
    //x,yの位置に頂点を打つ
    vertex(x, y);
  }
  //beginShape()からendShape()の間で打たれた頂点は線で結ばれる
  endShape();
}
*/