document.addEventListener("DOMContentLoaded", ready);

function ready() {
    getAllComments();
    var form = document.querySelector(".comment-form");
    var deleteCommentBtn = document.querySelector(".comment-list");
    form.addEventListener("submit", addComment);
    deleteCommentBtn.addEventListener("click", deleteComment);
}

function addComment(event) {
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    var form = document.querySelector(".comment-form");

    xhr.addEventListener("load", drawNewComment);
    xhr.addEventListener("error", transferError);


    var data = {
        "name": form.elements["name"].value,
        "email": form.elements["e-mail"].value,
        "comment": form.elements["comment"].value
    };
    
    xhr.open("POST","/comments");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

}

function deleteComment(event) {
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    var delComment = event.target.getAttribute("data-id");
    xhr.addEventListener("error", transferError);

    url = "/comments/"+ delComment;
    
    xhr.open("DELETE", url);

    xhr.send();
    location.reload();

}

function drawNewComment() {
    drawComment(JSON.parse(this.responseText));
}

function getAllComments() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", drawAllComments);
    xhr.addEventListener("error", transferError);
    xhr.open("GET","/comments");
    xhr.send();
}


function drawAllComments() {

    var comments = JSON.parse(this.responseText);

    comments.forEach(function (comment) {
        drawComment(comment);
    });
}
function drawComment(data) {
    var comment = document.createElement("article");
    comment.innerHTML = "<header>Added by: " +
                            data.name +
                            "</header><p>" +
                            data.comment +
                            "</p><button type='button' class='close' data-id="+ data.id +">&times;</button>";
    var commentList = document.querySelector(".comment-list");
    commentList.appendChild(comment);
}

function transferError() {
    console.log("Error! ", this.status);
}