var shown = 750;
var table;
table = document.getElementById("drugtable");
var n = 0;
var imgWidth = 192;
var imgHeight = 244;
var king = 0; // except stop everywhere 1
var queen = 0; // only while base is running
var unk = 0;
var rdm = 0;
var correctAns;
var don = 1;
rdm = Math.floor(Math.random() * 8);
correctAns = correctAns = table.options[rdm].text;

// responsive
function myFunction(x) {
  if (x.matches) { // If media query matches
    shown = 913;
    imgWidth = 200;
    don = 2;
    }
}
var x = window.matchMedia("(max-width: 1180px)");
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

const canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
imgTag = new Image();

const scroll = document.getElementById("scroll-element");

function instill() {
  queen = 0;
  king = 1;
  n += 1;
  if (unk == 1) {
    table.selectedIndex = rdm;
  }
  perform();
  imgTag.onload = animate;
  scroll.scrollLeft = imgWidth * (n - 1);
}

function perform() {
  if (table.selectedIndex == 0) {
    imgTag.src = "images/F-epi.jpg";
  } else if (table.selectedIndex == 1) {
    imgTag.src = "images/F-nepi.jpg";
  } else if (table.selectedIndex == 2) {
    imgTag.src = "images/F-iso.jpg";
  } else if (table.selectedIndex == 3) {
    imgTag.src = "images/F-ca.jpg";
  } else if (table.selectedIndex == 4) {
    imgTag.src = "images/F-pro.jpg";
  } else if (table.selectedIndex == 5) {
    imgTag.src = "images/F-ach.jpg";
  } else if (table.selectedIndex == 6) {
    imgTag.src = "images/F-kcl.jpg";
  } else if (table.selectedIndex == 7) {
    imgTag.src = "images/F-atr.jpg";
  }
}

function animate() {
  ctx.translate(imgWidth - 1, 0);
  ctx.drawImage(imgTag, shown - imgWidth, 0, imgWidth, imgHeight);
  if (unk == 1 && queen == 0) {
    ctx.fillStyle = "black";
    ctx.fillRect(shown - imgWidth + 15, 200, 50, 30);
    ctx.font = "15px Georgia";
    ctx.fillStyle = "white";
    ctx.fillText("Unk", shown - imgWidth + 18, 220);
  }

  roll();
}
const fps = 100;
function roll() {
  scroll.scrollLeft += 1;
  if (scroll.scrollLeft < imgWidth * n) {
    let diff = imgWidth * n - scroll.scrollLeft;
    if (diff < don && king == 1) {
      setTimeout(() => {
        run();
      }, 3000 / fps);
    }
    let progress = document.getElementById("bar");
    if (queen == 0) {
      progress.value = diff / imgWidth;
    } else {
      progress.value = 0;
    }
    setTimeout(() => {
      requestAnimationFrame(roll);
    }, 1000 / fps);
  }
}

function run() {
  king = 1;
  queen = 1;
  n += 1;
  imgTag.src = "images/base.jpg";
  imgTag.onload = animate;
  scroll.scrollLeft = imgWidth * (n - 1);
}
function stop() {
  // queen = 0;
  king = 0;
}

function final() {
  unk = 1;
  table.disabled = true;
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
