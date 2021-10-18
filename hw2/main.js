let curAlbum = 0;
let prevAlbum = -1;
let curIdx = 1;
let prevIdx = -1;
let displayImg = document.getElementById("displayImg");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let num = document.getElementById("num");
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
    "https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
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
// for (var i = 1; i < 8; i++) {
//         var articleNode = document.createElement("article");
//         var divNode = document.createElement("div");
//         var imgNode = document.createElement("img");
//         imgNode.src = album[curAlbum][i];
//         divNode.id = "photo" + (i+9);
//         divNode.onclick = clickImg(i);
//         divNode.appendChild(imgNode);
//         articleNode.appendChild(divNode);
//         previewNode.appendChild(articleNode);
//     }

start();

function start() {
    setName();
    setAlbums();
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
function setAlbums() {
    for (var i = 0; i < album.length; i++) {
        document.getElementById("album" + i).style.display = "";
        document.getElementById("album" + i).innerText = album[i][0];
    }
    for (var i = album.length; i < 6; i++) {
        document.getElementById("album" + i).style.display = "none";
    }
    // alert(album.length);
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
    document.getElementById("album" + String(curAlbum)).style = "border: 0.3em solid #00D3B6;border-style:groove;border-radius: 0.3em; opacity=1";
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
    var sum=0;
    for(var i=0; i<album.length; i++){
        sum+=(album[i].length-1);
    }
    document.getElementById("num").innerText = "--- "+(curIdx) + '/' + (album[curAlbum].length - 1) + " ---\ntotal : " + sum;
}

function changeAlbum(index) {
    if (!checkEmpty(index)) {
        clearPhotos();
        prevAlbum = curAlbum;
        curAlbum = index;
        curIdx = 1;
        prevIdx = -1;
        setName();
        setAlbums();
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
    if (album[curAlbum].length > 16) {
        alert("超過相片上限");
    }
    else {
        var link = prompt("請輸入相片連結", "url");
        if (link != null && link != "") {
            album[curAlbum].push(link);
            start();
        }
    }
}
function deletePhoto() {
    clearPhotos();
    album[curAlbum].splice(curIdx, 1);
    changeAlbum(curAlbum);
}
function deleteAlbum() {
    clearPhotos();
    album.splice(curAlbum, 1);
    changeAlbum(0);
}
function addAlbum() {
    if (album.length > 5) {
        alert("超過相簿上限");
    }
    else{
        var albumName = prompt("請輸入相簿名稱", "albumName");
        
        if (albumName != null && albumName != "") {
            var link1 = prompt("請加入相片連結", "url");
            if(link1 != null && link1 != ""){
                album.push(new Array());
                album[album.length-1].push(albumName);
                album[album.length-1].push(link1);
                setAlbums();
            }
        }
    }
}

let albumNode = document.getElementById("album");
// class newAlbum {
//     constructor(albumName) {
//         this.name = albumNum;
//         this.albumNum = ++numOfAlbum;
//         this.buttonNode = document.createElement("button");
//         this.buttonNode.textContent = `${albumName}`;
//         this.buttonNode.id = "album" + albumNum;
//         this.buttonNode.onclick = "changeAlbum(0)";
//         albumNode.appendChild(buttonNode);
//     }
// }