// front-end js for socket

const socket = io("http://localhost:8000");  // SERVER URL

const form = document.getElementById("message-form");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData)
    const message = data?.message;
    if (message?.length) {
        socket.emit("message", message)
    }
    form.reset()
    append(message, "right")
})

socket.on("broacast", function(message) {
    console.log("message received", message)
    append(message, "left")
})

const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const username = prompt("Enter your name to join");
socket.emit("new-user-joined" , username)

console.log("from client...")
socket.on("user-joined" , name=>{
    append(`${name} joined the chat`,"right");
})

