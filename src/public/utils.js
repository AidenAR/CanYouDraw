
const defaultUsername =  "Choose a Name!"


function getUsername() {
	return localStorage.getItem("username") || defaultUsername
}

function isDefaultUsername() {
	return getUsername() == defaultUsername
}

function handleUpdateUsername() {
	const usernameElement = document.getElementById("usernameInput")

	setUsername(usernameElement.value)
	updateUsernameHeading(usernameElement.value)
	usernameElement.value = ''


}

function setUsername(name) {
	localStorage.setItem("username", name)
}

function updateUsernameHeading(name) {
	document.getElementById("usernameHeading").innerText = `Welcome ${name}!`
}

updateUsernameHeading(getUsername()) 
