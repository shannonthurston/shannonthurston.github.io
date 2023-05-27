c = {};

c.CANVAS = document.getElementById("visual");
c.canvasCtx = c.CANVAS.getContext("2d");
c.AUDIO = document.querySelector("audio");
c.TOGGLE = document.querySelector("#toggle");
c.MUTE = document.querySelector(".mute");
c.VISUALIZER = document.querySelector("#visualizer");
c.WIDTH = window.innerWidth;
c.HEIGHT = window.innerHeight;
c.playing = false;

c.CANVAS.width = c.WIDTH;
c.CANVAS.height = c.HEIGHT;

jQuery(c.CANVAS).css("width", c.WIDTH);
jQuery(c.CANVAS).css("height", c.HEIGHT);
jQuery("main").css("padding-top", "0");

c.record = function (ev) {
  if (c.playing) {
    c.CTX.close();
    c.playing = false;
    return;
  }
  c.playing = true;

  c.CTX = new AudioContext();
  c.audioStream = navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(function (stream) {
      c.source = c.CTX.createMediaStreamSource(stream);
      c.gain = c.CTX.createGain();
      c.gain.gain.value = 0;
      c.analyser = c.CTX.createAnalyser();
      c.dataArray = new Uint8Array(c.analyser.frequencyBinCount);

      c.source.connect(c.gain);
      c.source.connect(c.analyser);
      c.gain.connect(c.CTX.destination);
      c.visualize();
    });
};

c.FULLSCREEN = function (ev) {
  var canvas = document.getElementById("visual");
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().then(
      function (ev) {
        console.log("success");
      },
      function (err) {
        console.error("fail");
      }
    );
  } else {
    document.exitFullscreen();
  }
};

c.VISUALIZER.addEventListener("click", c.record);

c.visualize = function () {
  c.analyser.fftSize = 512;

  var dataArrayAlt = new Uint8Array(c.analyser.frequencyBinCount);
  c.canvasCtx.clearRect(0, 0, c.WIDTH, c.HEIGHT);

  var drawEverything = function () {
    if (!c.playing) {
      return false;
    }
    var drawVisual = requestAnimationFrame(drawEverything);

    c.analyser.getByteFrequencyData(dataArrayAlt);
    //Clear the canvas
    c.canvasCtx.fillStyle = "rgb(0, 0, 0)";
    c.canvasCtx.fillRect(0, 0, c.WIDTH, c.HEIGHT);

    //draw on cavas
    var x = 0;

    var randomChar = function () {
      var idx = parseInt(Math.random() * 85);
      var randomCharacter = String.fromCharCode(idx);
      return randomCharacter || "?";
    };

    for (var i = 0; i < c.analyser.frequencyBinCount; i++) {
      var freq = dataArrayAlt[i];
      var randx = Math.random();
      var randy = Math.random();
      var randz = Math.random();
      var freqFontSize = freq / 2;

      c.canvasCtx.strokeStyle =
        "rgb(" +
        randx * freq * 3 +
        "," +
        randy * freq +
        "," +
        randz * freq +
        ")";

      c.canvasCtx.font = freqFontSize + "px serif";
      c.canvasCtx.strokeText(
        randomChar(),
        (randx * c.WIDTH + x) / 2,
        (randy * c.HEIGHT + x) / 2
      );
      if (i % 15 == 0) {
        c.canvasCtx.strokeRect(
          (randx * c.WIDTH + x) / 2,
          (randy * c.HEIGHT + x) / 2,
          freq / 3,
          freq / 3
        );
      }

      x += (2 * freq) / 20;
    }

    var barWidth = (c.WIDTH / c.analyser.frequencyBinCount) * 2;
    var barHeight;
    var x1 = 0;
    var x2 = 0;
    var y = c.HEIGHT;

    for (var i2 = 0; i2 < c.analyser.frequencyBinCount; i2++) {
      barHeight = dataArrayAlt[i2];

      c.canvasCtx.fillStyle =
        "rgb(" +
        (barHeight + 20) +
        "," +
        (barHeight + 120) +
        "," +
        (barHeight + 120) +
        ")";
      c.canvasCtx.fillRect(x1, c.HEIGHT - barHeight, barWidth, barHeight);

      c.canvasCtx.fillStyle =
        "rgb(" +
        (barHeight + 120) +
        "," +
        (barHeight + 20) +
        "," +
        (barHeight + 120) +
        ")";
      c.canvasCtx.fillRect(c.WIDTH + x2, 0, barWidth, barHeight + 1.5);

      x1 += barWidth + 1;
      x2 = -x1;
    }
  };

  drawEverything();

  var drawAlt = function () {
    if (!c.playing) {
      return false;
    }
    var drawVisual = requestAnimationFrame(drawAlt);

    c.analyser.getByteFrequencyData(dataArrayAlt);

    c.canvasCtx.fillStyle = "rgb(0, 0, 0)";
    c.canvasCtx.fillRect(0, 0, c.WIDTH, c.HEIGHT);

    var barWidth = (c.WIDTH / c.analyser.frequencyBinCount) * 2;
    var barHeight;
    var x = 0;
    var x2 = 0;
    var y = c.HEIGHT;

    for (var i = 0; i < c.analyser.frequencyBinCount; i++) {
      barHeight = dataArrayAlt[i];

      c.canvasCtx.fillStyle =
        "rgb(" +
        (barHeight + 20) +
        "," +
        (barHeight + 120) +
        "," +
        (barHeight + 120) +
        ")";
      c.canvasCtx.fillRect(x, c.HEIGHT - barHeight, barWidth, barHeight);

      c.canvasCtx.fillStyle =
        "rgb(" +
        (barHeight + 120) +
        "," +
        (barHeight + 20) +
        "," +
        (barHeight + 120) +
        ")";
      c.canvasCtx.fillRect(c.WIDTH + x2, 0, barWidth, barHeight + 1.5);

      x += barWidth + 1;
      x2 = -x;
    }
  };

  //drawAlt();
};
