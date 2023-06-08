const socket = io('http://localhost:8000');

// get dom elements in js variable
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
// queryselector will put the messages inside container
// audio that play on receiving messages
var audio = new Audio('ting.mp3');

// function which will append evemt info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    //  here instead of innerhtml we have used createElement
    // meassage is our text and position is whether it is left or right
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {

        audio.play();
    }

}

// ask name from user and tell the server
const name = prompt("enter your name to join")
socket.emit('new-user-joined', name);
// so it will emit this event and given name
// so the above function in index.jsw ill take this and run function


// here in below function name is giving us the user joined
// if new user join receive name  from user
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})
// this will listen if new user joined and pass in function append
//if server sends a msg receive it
socket.on('receive', data => {
    append(`${data.name}:${data.message} `, 'left')
})
// if a user leaves the chat append the info to the container
socket.on('left', name => {
    append(`${name} left the chat`, 'right')
})
// so show name on left side
// it will take the receive event and put it in left

// EMITS ALWAYS PASS THE VALUES IN EVENTS AND FUNCTION TAKE THAT VALUE OF EVENT AND USE IN THE FUNCTION
// FOR MORE CLEAREANCE SEE SOCKET.IO HELP CODE


// if the form get submitted send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // prevent default and e save the page from reload so page will not reload now
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    // we want to see this message on right
    socket.emit('send', message);
    // so we tell the server that we are sending message in it
    messageInput.value = ''
    // so after sending the message the messageinput now become blank
})
