const chat = document.getElementById('chat')

function sendChatMessage() {
	const messageInputElement = document.getElementById("chatInput")

	const messageData = {
		user: getUsername(),
		text: messageInputElement.value
	}

	messageInputElement.value = ""

	addMessageToChat(messageData)

	socket.emit("chat_message", messageData)
}

function addMessageToChat({ user, text }) {
	// console.log(`chat_message: ${user} - ${text}`)
	
	let template = document.createElement('template')

	template.innerHTML = `<div><h1></h1>
		<p></p></div>`

	const [h1, p] = template.content.firstChild.children

	h1.innerText = user
	p.innerText = text

	chat.appendChild(template.content.firstChild)
}

socket.on('chat_message', addMessageToChat)

addMessageToChat({
	user: getUsername(),
	text: isDefaultUsername() 
	? `Hello! ${getUsername()}! You can change your name above!`
	: `Welcome ${getUsername()}`,
})
