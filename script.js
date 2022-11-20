let input = document.querySelector("input");
let add_button = document.querySelector(".add_button");
let todoList = input.parentElement.nextElementSibling;

function createToDo(content) {

    let newItem = document.createElement("li");
    newItem.classList.add("item");
    newItem.setAttribute("draggable", true);

    let newdivtext = document.createElement("div");
    document.body.appendChild(newdivtext);
    newdivtext.classList.add("div_text")
    let newtext = document.createElement("p");
    newtext.classList.add("text")
    newtext.textContent = content
    newdivtext.appendChild(newtext)
    newItem.appendChild(newdivtext)

    let newdivbutton = document.createElement("div");
    document.body.appendChild(newdivbutton);
    newdivbutton.classList.add("div_button")
    let newbutton = document.createElement("button");
    newbutton.classList.add("delete_button");
    newbutton.textContent = "delete";
    newdivbutton.appendChild(newbutton)
    newItem.appendChild(newdivbutton)

    addDragEvt(newItem);
    todoList.appendChild(newItem);
    input.value = "";
}

input.addEventListener("keydown", function(e){
    if (!input.value.trim() || e.which !== 13) return;
    createToDo(input.value);
});

add_button.addEventListener("click", function(){
    if (!input.value.trim()) return;
    createToDo(input.value);
});

let source = null;
function addDragEvt(element) {
    element.addEventListener("dragstart", function(e){
        e.target.classList.add("dragging");
        source = e.target;
    });
    element.addEventListener("dragend", function(e){
        e.target.classList.remove("dragging");
        source = null;
    });
}

function addDropEvt(element) {
    element.addEventListener("dragover", function(e){
        e.preventDefault();
    });
    element.addEventListener("drop", function(e){
        e.currentTarget.querySelector("ul").appendChild(source);
    });
}

function deleteEvt(element){
    element.querySelector('.list').addEventListener('click', function(e){
        let target = e.target;
        if (target.classList.contains('delete_button')) {
            target.parentNode.parentNode.remove()
        }
    })
};

let columns = document.querySelectorAll(".column");
columns.forEach((column) => {
    addDropEvt(column);
    deleteEvt(column)
});