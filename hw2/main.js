for (var i = 1; i < 9; i++) {
        var articleNode = document.createElement("article");
        var divNode = document.createElement("div");
        var imgNode = document.createElement("img");
        imgNode.src = album[curAlbum][i];
        divNode.id = "photo" + i;
        divNode.onclick = clickImg(i);
        divNode.appendChild(imgNode);
        articleNode.appendChild(divNode);
        previewNode,appendChild(articleNode);
    }

let previewNode = document.getElementById("preview");
var numOfAlbum = 0;
var nameOfAlbum = new Array();

var album = new Array();
for (var i = 0; i < 3; i++) {
    album.push(new Array());
}

album[0] = [
    "landscape",
    "https://images.pexels.com/photos/1114896/pexels-photo-1114896.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/707915/pexels-photo-707915.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/1297790/pexels-photo-1297790.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    // "https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
]
album[1] = [
    "flower",
    "https://images.pexels.com/photos/1005711/pexels-photo-1005711.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/1038002/pexels-photo-1038002.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/714918/pexels-photo-714918.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/1169084/pexels-photo-1169084.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
]
album[2] = [
    "people",
    "https://images.pexels.com/photos/6333511/pexels-photo-6333511.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/6454959/pexels-photo-6454959.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
]
album[3] = [
    "empty"
]
// album[0].pop();

// alert("album length : " + album.length);
// alert("album[0] length : " + album[0].length);
// alert("album[0] length : " + album[1].length);
let curAlbum = 0;
let prevAlbum = -1;
let curIdx = 1;
let prevIdx = -1;
let displayImg = document.getElementById("displayImg");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let num = document.getElementById("num");


start();

function start() {
    setName();
    setPhotos();
    setDisplay();
}

function setName() {
    document.getElementById("albumName").innerText = album[curAlbum][0];
}

function clearPhotos() {
    let curMargin = document.getElementById("photo" + String(curIdx));
    curMargin.style = "border: ;";
    for (var i = 1; i < album[curAlbum].length; i++) {
        document.getElementById("photo" + i).firstChild.src = "";
    }
}

function setPhotos() {
    for (var i = 1; i < album[curAlbum].length; i++) {
        document.getElementById("photo" + i).firstChild.src = album[curAlbum][i];
    }
}
function setDisplay() {
    displayImg.src = album[curAlbum][curIdx];
    setMargin();
    checkIdx();
    checkState();
}

function setMargin() {
    document.getElementById("photo" + String(curIdx)).style = "border: 0.3em solid #00D3B6;border-style:groove;border-radius: 0.3em;";
    document.getElementById("album" + String(curAlbum)).style = "border: 0.3em solid #00D3B6;border-style:groove;border-radius: 0.3em;";
    if (prevIdx != -1) {
        document.getElementById("photo" + String(prevIdx)).style = "border: ;";
    }
    if (prevAlbum != -1) {
        document.getElementById("album" + String(prevAlbum)).style = "border: ;";
    }
}
function prevImg() {
    if (curIdx > 1) {
        prevIdx = curIdx;
        --curIdx;
        setDisplay();
    }
}
function nextImg() {
    if (curIdx < album[curAlbum].length - 1) {
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
    if (curIdx === 1) {
        prevButton.classList.add("disabled");
        nextButton.classList.remove("disabled");
    }
    else if (curIdx === album[curAlbum].length - 1) {
        nextButton.classList.add("disabled");
        prevButton.classList.remove("disabled");
    }
    else {
        prevButton.classList.remove("disabled");
        nextButton.classList.remove("disabled");
    }
}

function checkState() {
    document.getElementById("num").innerText = (curIdx) + '/' + (album[curAlbum].length - 1);
}

function changeAlbum(index) {
    if (!checkEmpty(index)) {
        clearPhotos();
        prevAlbum = curAlbum;
        curAlbum = index;
        curIdx = 1;
        prevIdx = -1;
        setName();
        setPhotos();
        setDisplay();
    }
}
function checkEmpty(index) {
    if (album[index].length === 1) {
        alert("此為空相簿");
        return true;
    }
    else {
        return false;
    }
}

function addPhoto() {
    var link = prompt("請輸入相片連結", "url");
    if (link != null && link != "") {
        album[curAlbum].push(link);
        start();
    }
}
function deletePhoto(){
    clearPhotos();
    album[curAlbum].splice(curIdx,1);
    changeAlbum(curAlbum);
}
function addAlbum() {
    var albumName = prompt("請輸入相簿名稱", "albumName");
    if (albumName != null && albumName != "") {
        newAlbum(albumName);
    }
}

let albumNode = document.getElementById("album");
class newAlbum {
    constructor(albumName) {
        this.name = albumNum;
        this.albumNum = ++numOfAlbum;
        this.buttonNode = document.createElement("button");
        this.buttonNode.textContent = `${albumName}`;
        this.buttonNode.id = "album" + albumNum;
        this.buttonNode.onclick = "changeAlbum(0)";
        albumNode.appendChild(buttonNode);
    }
}