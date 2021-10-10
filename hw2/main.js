var album = new Array();
for (var i = 0; i < 3; i++) {
    album.push(new Array());
}
var totalNumber = 0;
var nameOfAlbum = new Array();
nameOfAlbum[0] = "landscape";
album[0] = [
    "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/38326/pexels-photo-38326.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/33582/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/464336/pexels-photo-464336.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
]
album[1] = [
    "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/136255/pexels-photo-136255.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/701816/pexels-photo-701816.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/4622892/pexels-photo-4622892.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
]
album[2] = [
    "https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
]
// album[0].pop();

// alert("album length : " + album.length);
// alert("album[0] length : " + album[0].length);
// alert("album[0] length : " + album[1].length);
let curAlbum = 0;
let curIdx = 0;
let prevIdx = -1;
let displayImg = document.getElementById("displayImg");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let num = document.getElementById("num");


setName();
setPhotos();
setDisplay(curIdx);

function setName() {
    document.getElementById("albumName").innerText = nameOfAlbum[0];
}

function clearPhotos() {
    let curMargin = document.getElementById("photo" + String(curIdx));
    curMargin.style = "border: ;";
    for (var i = 0; i < album[curAlbum].length; i++) {
        document.getElementById("photo" + String(i)).firstChild.src = "";
    }
}

function setPhotos() {
    for (var i = 0; i < album[curAlbum].length; i++) {
        document.getElementById("photo" + String(i)).firstChild.src = album[curAlbum][i];
    }
}
function setDisplay() {
    displayImg.src = album[curAlbum][curIdx];
    setMargin();
    checkIdx();
    checkState();
}

function setMargin() {
    let curMargin = document.getElementById("photo" + String(curIdx));
    let prevMargin = document.getElementById("photo" + String(prevIdx));
    curMargin.style = "border: 0.3em solid #00D3B6;border-style:groove;border-radius: 0.3em;";
    prevMargin.style = "border: ;";
}
function prevImg() {
    if (curIdx > 0) {
        prevIdx = curIdx;
        --curIdx;
        setDisplay();
    }
}
function nextImg() {
    if (curIdx < album[0].length - 1) {
        prevIdx = curIdx;
        ++curIdx;
        setDisplay();
    }
}
function clickImg(index) {
    prevIdx = curIdx;
    curIdx = index;
    setDisplay();
}

function checkIdx() {
    if (curIdx === 0) {
        prevButton.classList.add("disabled");
    }
    else if (curIdx === album[0].length - 1) {
        nextButton.classList.add("disabled");
    }
    else {
        prevButton.classList.remove("disabled");
        nextButton.classList.remove("disabled");
    }
}

function checkState() {
    document.getElementById("num").innerText = (curIdx + 1) + '/' + album[curAlbum].length;
}

function changeAlbum(index) {
    clearPhotos();
    curAlbum = index;
    curIdx = 0;
    prevIdx = -1;
    setName();
    setPhotos();
    setDisplay(curIdx);
}
