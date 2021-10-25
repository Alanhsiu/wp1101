let list = [];
let done_list = []; //record done or not
let completedBtn = false;


//framework
let rootNode = document.getElementById("root");
let sectionNode = document.createElement("section");
let inputNode = document.createElement("input");
let ulNode = document.createElement("ul");
let footerNode = document.createElement("footer");
sectionNode.appendChild(inputNode);
sectionNode.appendChild(ulNode);
sectionNode.appendChild(footerNode);
sectionNode.className = "todo-app__main";
rootNode.appendChild(sectionNode);


//class
class todo {
    constructor(data, num, btnState) {
        // var btnState = 0;
        this.node = document.createElement("li");
        this.node.className = "todo-app__item";
        let boxNode = document.createElement("div");
        let inputNode = document.createElement("input");
        let h1Node = document.createElement("h1");
        let imgNode = document.createElement("img");
        let labelNode = document.createElement("label");
        labelNode.setAttribute("for", num);
        inputNode.id = num;
        inputNode.type = "checkbox";
        boxNode.className = "todo-app__checkbox";
        h1Node.className = "todo-app__item-detail";
        imgNode.className = "todo-app__item-x";
        imgNode.src = "./img/x.png"
        h1Node.textContent = data;
        boxNode.appendChild(inputNode);
        boxNode.appendChild(labelNode);
        this.node.appendChild(boxNode);
        this.node.appendChild(h1Node);
        this.node.appendChild(imgNode);

        inputNode.addEventListener("click", function () {
            changeState();
            setLeft();
            checkLeft();
        });
        imgNode.addEventListener("click", function () {
            let parentNode = this.parentNode;
            parentNode.style.display = "none";
            parentNode.parentNode.removeChild(parentNode);
            // this.parentNode.removeChild(this);
            list.splice(num, 1);
            done_list.splice(num, 1);
            setList();
            setLeft();
            checkLeft();
        });
        if (btnState === 1){
            h1Node.style = "text-decoration: line-through; opacity: 0.5;";
            inputNode.checked=true;
        }
        if(completedBtn==true){
            this.node.style.display = "none";
        }

        function changeState() {
            if (btnState === 0) {
                h1Node.style = "text-decoration: line-through; opacity: 0.5;";
                done_list[num] = true;
                btnState = 1;
            }
            else {
                h1Node.style = "text-decoration:none; opacity:1";
                done_list[num] = false;
                btnState = 0;
            }
        }
    }
    get todoNode() {
        return this.node;
    }
}

//input
inputNode.className = "todo-app__input";
inputNode.placeholder = "What needs to be done?";


//list
ulNode.className = "todo-app__list";
ulNode.id = "todo-list";


//footer
let totalNode = document.createElement("div");
let buttonNode = document.createElement("ul");
let cleanNode = document.createElement("div");
let allNode = document.createElement("button");
let activeNode = document.createElement("button");
let completedNode = document.createElement("button");
let clearNode = document.createElement("button");
footerNode.className = "todo-app__footer";
footerNode.id = "todo-footer";
totalNode.className = "todo-app__total";
buttonNode.className = "todo-app__view-buttons";
cleanNode.className = "todo-app__clean";
allNode.innerHTML = "All";
activeNode.innerHTML = "Active";
completedNode.innerHTML = "Completed";
clearNode.innerHTML = "Clear completed";
buttonNode.appendChild(allNode);
buttonNode.appendChild(activeNode);
buttonNode.appendChild(completedNode);
cleanNode.appendChild(clearNode);
footerNode.appendChild(totalNode);
footerNode.appendChild(buttonNode);
footerNode.appendChild(cleanNode);


//function add_item
function add_item(item) {
    if (item.trim().length === 0)
        return;
    list.push(item);
    done_list.push(false);
    ulNode.appendChild(new todo(list[list.length - 1], list.length - 1, 0).todoNode);
    footerNode.style.display = "";
    setLeft();
}
inputNode.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        add_item(inputNode.value);
        inputNode.value = "";
    }
});

function setList() {
    while (ulNode.firstChild) {
        ulNode.removeChild(ulNode.firstChild);
    }
    for (let i = 0; i < list.length; i++) {
        if (done_list[i]===true)
            ulNode.appendChild(new todo(list[i], i, 1).todoNode);
        else
            ulNode.appendChild(new todo(list[i], i, 0).todoNode);
    }
    setLeft();
}

function setLeft() {
    totalNode.innerHTML = done_list.filter(x => x === false).length + " left";
}
function checkLeft() {
    if (list.length === 0) {
        footerNode.style.display = "none";
    }
    if (done_list.filter(x => x === true).length === 0)
        clearNode.style.visibility = "hidden";
    else
        clearNode.style.visibility = "";
}


//function footer
allNode.addEventListener("click", function () {
    completedBtn=false;
    for (var i = 0; i < list.length; i++) {
        ulNode.childNodes[i].style.display = "";
    }
});
activeNode.addEventListener("click", function () {
    completedBtn=false;
    for (var i = 0; i < list.length; i++) {
        if (done_list[i] === true)
            ulNode.childNodes[i].style.display = "none";
        if (done_list[i] === false) {
            ulNode.childNodes[i].style.display = "";
        }
    }
});
completedNode.addEventListener("click", function () {
    completedBtn=true;
    for (var i = 0; i < list.length; i++) {
        if (done_list[i] === false)
            ulNode.childNodes[i].style.display = "none";
        if (done_list[i] === true) {
            ulNode.childNodes[i].style.display = "";
        }
    }
});


// note : remove&removeChild are not the same
clearNode.addEventListener("click", function () {
    for (let i = list.length - 1; i >= 0; i--) {
        if (done_list[i] === true) {
            // let targetNode = document.getElementById(i).parentNode;
            ulNode.childNodes[i].style.display = "none";
            ulNode.removeChild(ulNode.childNodes[i]);
            list.splice(i, 1);
            done_list.splice(i, 1);
        }
    }
    setLeft();
    checkLeft();
    setList();
});

checkLeft();