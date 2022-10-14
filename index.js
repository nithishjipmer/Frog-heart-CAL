  var shown = 756; // the width of the canvas seen
  var table; // drug select dropdown
  table = document.getElementById("drugtable");
  var n = 0; // count of drug images
  var m = 0; // count of base images
  var imgWidth = 200; //width of drug images
  var imgHeight = 244; // height of drug images
  var king = 0; // except stop everywhere 1
  var queen = 0; // 1 only while base is running
  var unk = 0; // becomes 1 if unknown is instilled
  var rdm = 0; // random index generated
  var correctAns; // drug corresponding to rdm
  var baseWidth = imgWidth/5; // width of the base image
  var pro = 0; // propranalol not instilled
  var atr = 0; // atropine not instilled
  var iso = 0; // Isoprenaline not instilled
  rdm = Math.floor(Math.random() * 8);
  correctAns = correctAns = table.options[rdm].text; // the right answer
  const stopBtn = document.getElementById("stop-btn");
  const progress = document.getElementById("bar"); // drug level
  const ansBtn = document.getElementById("answer-btn")
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  imgTag = new Image();
// scroll of the canvas container used for anim
  const scroll = document.getElementById("scroll-element");

// responsive
var mqls = [
  window.matchMedia("(min-width: 481px)"),
  window.matchMedia("(min-width: 961px)"),
  window.matchMedia("(min-width: 1025px)"),
];

    function mediaqueryresponse(mql) {
    if (mqls[0].matches) {
      // mobile
      shown = 596;
    }
    if (mqls[1].matches) {
        // ipad
        shown = 696;
    }
    if (mqls[2].matches) {
      // laptops, ipad pro, ipad air
      shown = 756;
    }
}

for (var i = 0; i < mqls.length; i++) {
  mediaqueryresponse(mqls[i]); // call listener function explicitly at run time
  mqls[i].addListener(mediaqueryresponse); // attach listener function to listen in on state changes
}


  // when instill btn clicked
  function instill() {
    stopBtn.disabled = false; // activate skip btn
    stopBtn.innerText = "Skip";
    queen = 0; // is 1 only when base is running
    king = 1; // is 0 only when stop pressed
    n += 1; // image count increased by 1
    if (unk == 1) { // after next btn pressed
      table.selectedIndex = rdm; // set index as rdm
    }
    // scroll starts from the prev image end
    scroll.scrollLeft = imgWidth * (n - 1) + baseWidth * m;
    perform(); // gets image src
    imgTag.onload = animate; // after the image loads
    
  }
// gets the image src according to the selected drug
  function perform() {
    if (table.selectedIndex == 0) {
      imgTag.src = "images/F-epi.jpg";
    } else if (table.selectedIndex == 1) {
      imgTag.src = "images/F-nepi.jpg";
    } else if (table.selectedIndex == 2) {
      if (pro == 1){ // propranalol instilled
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
      if (atr == 1) { // atropine administered
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
      // some drug instilled
      ctx.translate(imgWidth, 0); // origin +image width
      ctx.drawImage(imgTag, shown - imgWidth + 10, 0, imgWidth, imgHeight);
    }else {
      // base running
      ctx.translate(baseWidth, 0); // origin + base width
      ctx.drawImage(imgTag, shown - baseWidth + 10, 0, baseWidth, imgHeight);
    }
    // correcting HR in isoprenaline & propranolol interaction
    if (iso == 1){
      ctx.font = "15px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText("↑", shown - imgWidth + 128, 195);
      ctx.fillText("Iso", shown - imgWidth + 120, 220);
      ctx.fillText("↑", shown - imgWidth + 170, 165);
      ctx.fillText("HR71", shown - imgWidth + 145, 190);
    }
    // hiding the drug label of pic
    if (unk == 1 && queen == 0) {
      ctx.fillStyle = "black";
      ctx.fillRect(shown - imgWidth + 15, 200, 60, 30);
      ctx.font = "15px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText("Unk", shown - imgWidth + 18, 220);
      ansBtn.disabled = false;
    }
    // animation function
    roll();
  }

  // alternative animation
var id = null;
function roll() {
  clearInterval(id); // clear time interval
  id = setInterval(frame, 20); // wait for 20msec and execute frame()
  function frame() {
      if (scroll.scrollLeft > imgWidth * n + baseWidth * m) {
        // check if scroll bar crosses the whole image width
        clearInterval(id);
      } else {
        // if scroll bar < Total image width
        scroll.scrollLeft += 1;
        let diff = imgWidth * n + baseWidth * m - scroll.scrollLeft;
        if (diff < 1 && king == 1) {
          pro = 0;
          atr = 0;
          iso = 0;
          run() //  calls the baseline images
        }

        if (queen == 0) {
          progress.value = diff / imgWidth;
        } else {
          progress.value = 0;
        }
      }
    }
  }

  function start(){
    run();
    stopBtn.disabled = false;
  }

  // sets base image ready for roll()
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
      scroll.scrollLeft = imgWidth * n + baseWidth * (m); // skip
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
