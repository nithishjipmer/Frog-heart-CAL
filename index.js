var shown = 750;
var table = document.getElementById("drugtable");
var n 

const canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
imgTag = new Image();

const scroll = document.getElementById("scroll-element");

function instill(){
    n += 1;
    perform()
    function perform(){
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
    
    imgTag.onload = animate;
    scroll.scrollLeft = 100 * (n - 1);
}

function animate(){
    ctx.translate(99, 0)
    ctx.drawImage(imgTag, shown-100, 0, 100, 250);
    roll()
}
function roll(){
    scroll.scrollLeft += 10;
    if (scroll.scrollLeft <  100 * n) {
        requestAnimationFrame(roll);
    }
}