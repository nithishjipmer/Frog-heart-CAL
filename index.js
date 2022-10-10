  var shown = 750;
  var table;
  table = document.getElementById("drugtable");
  var n = 0;
  var m = 0;
  var imgWidth = 200;
  var imgHeight = 244;
  var king = 0; // except stop everywhere 1
  var queen = 0; // only while base is running
  var unk = 0;
  var rdm = 0;
  var correctAns;
  var don = 1;
  var baseWidth = imgWidth/5;
  var pro = 0;
  var atr = 0;
  var iso = 0;
  rdm = Math.floor(Math.random() * 8);
  correctAns = correctAns = table.options[rdm].text;
  const stopBtn = document.getElementById("stop-btn")
  const progress = document.getElementById("bar");
  const ansBtn = document.getElementById("answer-btn")


  ipad();
  function ipad() {
    const mql = window.matchMedia(
      "screen and (min-device-width: 1024px) and (max-device-width: 1024px) and (orientation: landscape)"
    );

    checkMedia(mql);
    mql.addListener(checkMedia);

    function checkMedia(mql) {
      if (mql.matches) {
        shown = 580;
        don = 2;
      }
    }
  }

  ipadpro();
  function ipadpro() {
    const mql = window.matchMedia(
      "screen and (min-device-width: 1112px) and (max-device-width: 1112px) and (orientation: landscape"
    );

    checkMedia(mql);
    mql.addListener(checkMedia);

    function checkMedia(mql) {
      if (mql.matches) {
        shown = 580;
        don = 2;
      }
    }
  }

  ipadair();
  function ipadair() {
    const mql = window.matchMedia(
      "screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape)"
    );

    checkMedia(mql);
    mql.addListener(checkMedia);

    function checkMedia(mql) {
      if (mql.matches) {
        shown = 580;
        don = 2;
      }
    }
  }
  // responsive
  // function myFunction(x) {
  //   if (x.matches) { // If media query matches
  //     shown = 580;
  //     don = 2;
  //     }
  // }
  // var x = window.matchMedia("(max-width: 1180px)");
  // myFunction(x) // Call listener function at run time
  // x.addListener(myFunction) // Attach listener function on state changes

  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  imgTag = new Image();

  const scroll = document.getElementById("scroll-element");

  function instill() {
    stopBtn.disabled = false;
    stopBtn.innerText = "Skip";
    queen = 0;
    king = 1;
    n += 1;
    if (unk == 1) {
      table.selectedIndex = rdm;
    }
    scroll.scrollLeft = imgWidth * (n - 1) + baseWidth * m;
    perform();
    imgTag.onload = animate;
    
  }

  function perform() {
    if (table.selectedIndex == 0) {
      imgTag.src = "images/F-epi.jpg";
    } else if (table.selectedIndex == 1) {
      imgTag.src = "images/F-nepi.jpg";
    } else if (table.selectedIndex == 2) {
      if (pro == 1){
        imgTag.src = "images/base.png";
        iso = 1;
        n -= 1;
        m += 1;
        queen = 1;
      }else{
        imgTag.src = "images/F-iso.jpg";
      }
      
    } else if (table.selectedIndex == 3) {
      imgTag.src = "images/F-ca.jpg";
    } else if (table.selectedIndex == 4) {
      imgTag.src = "images/F-pro.jpg";
      pro = 1;
    } else if (table.selectedIndex == 5) {
      if (atr == 1) {
        imgTag.src = "images/F-ach2.jpg";
      } else {
        imgTag.src = "images/F-ach.jpg";
      }
    } else if (table.selectedIndex == 6) {
      imgTag.src = "images/F-kcl.jpg";
    } else if (table.selectedIndex == 7) {
      imgTag.src = "images/F-atr.jpg";
      atr = 1;
    }
  }

  function animate() {
    if (queen == 0){
      ctx.translate(imgWidth, 0);
      ctx.drawImage(imgTag, shown - imgWidth + 10, 0, imgWidth, imgHeight);
    }else {
      ctx.translate(baseWidth, 0);
      ctx.drawImage(imgTag, shown - baseWidth + 10, 0, baseWidth, imgHeight);
    }
    if (iso == 1){
      ctx.font = "15px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText("↑", shown - imgWidth + 128, 195);
      ctx.fillText("Iso", shown - imgWidth + 120, 220);
      ctx.fillText("↑", shown - imgWidth + 170, 165);
      ctx.fillText("HR71", shown - imgWidth + 145, 190);
    }
    if (unk == 1 && queen == 0) {
      ctx.fillStyle = "black";
      ctx.fillRect(shown - imgWidth + 15, 200, 60, 30);
      ctx.font = "15px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText("Unk", shown - imgWidth + 18, 220);
      ansBtn.disabled = false;
    }

    roll();
  }
  const fps = 10;
  function roll() {
    scroll.scrollLeft += 1;
    if (scroll.scrollLeft < imgWidth * n + baseWidth*m) {
      let diff = imgWidth * n + baseWidth * m - scroll.scrollLeft;
      if (diff < don && king == 1) {
        pro = 0;
        atr = 0;
        iso = 0;
        setTimeout(() => {
          run();
        }, 1000 / fps);
      }
      
      if (queen == 0) {
        progress.value = diff / imgWidth;
      } else {
        progress.value = 0;
      }
      
        setTimeout(() => {
          requestAnimationFrame(roll);
        }, 300 / fps);
      
    }
  }

  function start(){
    run();
    stopBtn.disabled = false;
  }

  function run() {
    stopBtn.innerText = "Stop";
    king = 1;
    queen = 1;
    m += 1;
    imgTag.src = "images/base.png";
    imgTag.onload = animate;
    scroll.scrollLeft = imgWidth * n + baseWidth*(m-1);
  }
  function stop() {
    // queen = 0;
    king = 0;
    if (queen == 1){
      progress.value = 0;
      scroll.scrollLeft = imgWidth * n + baseWidth * (m);
    }else {
      progress.value = 0;
      scroll.scrollLeft = imgWidth * (n) + baseWidth * m;
    }
    stopBtn.disabled = true;
  }

  function final() {
    unk = 1;
    table.disabled = true;
    table.options[0].innerText = "unknown";
  }

  function answer() {
    ans = document.getElementById("modaldrugs").value;
    if (ans == correctAns) {
      document.getElementById("final-body").innerHTML =
        "Correct!\nThe correct answer is " + correctAns + ".";
    } else {
      document.getElementById("final-body").innerHTML =
        "Wrong.\nThe right answer is " + correctAns + ".";
    }
    document.getElementById("final-save").style.display = "none";
  }
