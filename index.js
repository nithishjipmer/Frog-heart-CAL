var shown = 580;
var table;
table = document.getElementById("drugtable");
var n = 0
var imgWidth = 192; 
var imgHeight = 244;
var king = 0; // except stop everywhere 1
var queen = 0; // only while base is running
var unk = 0;
var rdm = 0;
var correctAns;
rdm = Math.floor(Math.random() * 8);
correctAns = correctAns = table.options[rdm].text;



// responsive
// var mqls = [
//   window.matchMedia(
//     "(min-device-width: 1024px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)"
//   ),
//   window.matchMedia(
//     "(min-device-width: 1112px) and (max-device-width: 1112px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)"
//   ),
//   window.matchMedia(
//     "(min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)"
//   ),
//   window.matchMedia(
//     "(min-device-width: 1180px) and (max-device-width: 1180px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)"
//   ),
// ];

// function mediaqueryresponse(mql) {
//   if (mqls[0].matches) {
//     // ipad query matched
//     shown = 580;
//   }
//   if (mqls[1].matches) {
//     // ipad pro query matched
//     shown = 580;
//   }
//   if (mqls[2].matches) {
//     // for ipad pro 12.9' query matched
//     shown = 750;
//   }
//   if (mqls[1].matches) {
//     // ipad air
//     shown = 580;
//   }
// }

// for (var i = 0; i < mqls.length; i++) {
//   mediaqueryresponse(mqls[i]); // call listener function explicitly at run time
//   mqls[i].addListener(mediaqueryresponse); // attach listener function to listen in on state changes
// }



const canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
imgTag = new Image();


const scroll = document.getElementById("scroll-element");


function instill(){
    queen = 0;
    king = 1;
    n += 1;
    if (unk == 1){
      table.selectedIndex = rdm;
    }
    perform()
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

function animate(){
    ctx.translate(imgWidth-1, 0)
    ctx.drawImage(imgTag, shown - imgWidth, 0, imgWidth, imgHeight);
    if (unk == 1 && queen == 0){
      ctx.fillStyle = "black";
      ctx.fillRect(shown - imgWidth + 15, 200, 50, 30);
      ctx.font = "15px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText("Unk", shown - imgWidth + 18, 220);
    }
    
    roll();
}
const fps = 100;
function roll(){
    scroll.scrollLeft += 1;
    if (scroll.scrollLeft < imgWidth * n) {
      let diff = imgWidth * n - scroll.scrollLeft;
      if (diff < 2 && king == 1) {
        setTimeout(() => {
          run();
        }, 3000 / fps);
      }
    let progress = document.getElementById("bar");
    if (queen == 0){
      progress.value = diff/imgWidth;
    }else{
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
function stop(){
  // queen = 0;
  king = 0;
}

function final(){
  unk = 1;
  table.disabled = true;
}

function answer(){
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
