const socket = io('http://localhost:5000')
const messageForm = document.getElementsByClassName('chat-form');
const inputValue = document.getElementsByClassName('chat-input');
const chatWindow = document.getElementById('chat-window')
const username = document.getElementsByClassName('username');

const name = prompt('Enter the username',"rahul").slice(0,10);
// username[0].innerText = name;
socket.emit('name',name)


socket.on('message',(user)=>{
	appendMessage(user)
})

function appendUser(user){
	const userDiv = document.querySelector(".current-user span");
	console.log(userDiv)
	const markup = `${user.name+" " },`
	userDiv.append(markup)
}

socket.on('chat-join',(name)=>{
	const user = {
		name:name,
		msg:'Joined Chat'
	}
	appendUser(user)
})

messageForm[0].addEventListener('submit',(event)=>{
	event.preventDefault();
	message = inputValue[0].value
	socket.emit('chat-message',message);
	inputValue[0].value = ''
	appendClientMessage(message)
})

function appendMessage(user_message){
	const messageElement = document.createElement('div');
	messageElement.className='left-message';
	const markup = `<span>${user_message.name}</span><p> ${user_message.msg}</p>`
	messageElement.innerHTML = markup
	chatWindow.append(messageElement)
	scrollTop()
}

function appendClientMessage(msg){
	const messageElement = document.createElement('div');
	messageElement.className='right-message';
	const markup = `<span>${name}</span><p>${msg}</p>`
	messageElement.innerHTML = markup
	chatWindow.append(messageElement)
	scrollTop()
}


function scrollTop(){
	chatWindow.scrollTop += 440	
}

