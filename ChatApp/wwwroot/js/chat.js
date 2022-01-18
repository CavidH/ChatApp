"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.on("ReceiveMessage", function (user, message) {
    let li = ` <li class="list-group-item">
                    <b>${user}</b>
                    <p>${message}</p>
                </li>`;
    document.getElementById("messages").innerHTML += li;

});
connection.start().then(function () {
    if (localStorage.getItem("user")){
        showArea();
        let user = JSON.parse(localStorage.getItem("user"));
        connection.invoke("AddGroupAsync",user.group)
    }
}).catch(function (err) {
    return console.error(err.toString());
});


let enterGroupForm = document.getElementById("enterGroupForm");
let leaveGroupBtn = document.getElementById("leaveGroupBtn")
let SendMessageForm = document.getElementById("sendMessageForm")

enterGroupForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    let user = {
        username: document.getElementById("username").value,
        group: document.getElementById("group").value
    }
    localStorage.setItem("user", JSON.stringify(user));
    showArea();
    connection.invoke("AddGroupAsync",user.group)
})

leaveGroupBtn.addEventListener("click", function (ev) {
    localStorage.removeItem("user");
    document.getElementById("messageArea").classList.add("d-none");
    document.getElementById("joinArea").classList.remove("d-none");
    connection.invoke("RemoveGroupAsync",user.group)


})

SendMessageForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    let message = document.querySelector("textarea").value;
    let user = JSON.parse(localStorage.getItem("user"));
    connection.invoke("SendMessage",user.username,user.group,message)
    document.querySelector("textarea").value = "";

})

function showArea() {
    document.getElementById("messageArea").classList.remove("d-none");
    document.getElementById("joinArea").classList.add("d-none");
    document.getElementById("messages").innerHTML = "";


}