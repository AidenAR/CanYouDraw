const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.lineCap = 'round'

let isDrawing = false;

function loadImage(params) {
	base_image = new Image();
	base_image.src = 'blackboardsquare.jpg';
	base_image.onload = function(){
    	ctx.drawImage(base_image, 0, 0);
	}
}
loadImage()

function startP(e) {
	startDrawing()
	socket.emit("draw_canvas", { type: "start" })
}

function startDrawing() {
	isDrawing = true
	ctx.beginPath()
}

function endP() {
	endDrawing()
	socket.emit("draw_canvas", {type: "end"})
}

function endDrawing() {
	isDrawing = false
}

function new_colour() {
	const colour_picked = document.getElementById('pen_colour').value
	changeStrokeColor(colour_picked)
	socket.emit("draw_canvas", { type: "color", color: colour_picked })
}

function new_size() {
	const size = document.getElementById('pen_size').value
	changeStrokeThickness(size)
	socket.emit("draw_canvas", { type: "thickness", size})
}

function handleCanvasClick(e) {
	if (!isDrawing) return
	//ctx.lineWidth = 10

	drawPoint(e.offsetX, e.offsetY)
	socket.emit("draw_canvas", {
		type: "point",
		x: e.offsetX,
		y: e.offsetY,
	})
}

function drawPoint(x, y) {
	ctx.lineTo(x, y)
	ctx.stroke()
	ctx.beginPath()
	ctx.moveTo(x, y)
}

function handleClearCanvas() {
	clearCanvas()
	socket.emit("clear_canvas")
}

function clearCanvas() {
	loadImage();
}

function changeStrokeColor(color) {
	ctx.strokeStyle = color
}

function changeStrokeThickness(thickness) {
	ctx.lineWidth = thickness
}

function drawEntity(entity) {
	console.log(entity)
	const entityFnMap = {
		"point": () => drawPoint(entity.x, entity.y),
		"color": () => changeStrokeColor(entity.color),
		"thickness": () => changeStrokeThickness(entity.size),
		"start": () => startDrawing(),
		"end": () => endDrawing(),
	}

	const fn = entityFnMap[entity.type]

	if (fn) {
		fn()
	}
}

canvas.addEventListener('mousedown', startP)
canvas.addEventListener('mouseup', endP)
canvas.addEventListener('mousemove', handleCanvasClick)


socket.emit('join', { name: getUsername() })

socket.on('draw_canvas', entity => drawEntity(entity))

socket.on('clear_canvas', data => clearCanvas())

socket.on('set_thickness', size => changeStrokeThickness(size))

socket.on('disconnect', data => console.log('Disconnecte'))

new_colour()
new_size()
clearCanvas()

async function initializeCanvas() {
	const url = document.location.origin
	const res = await fetch(url + "/games/1231231231")
	const data = await res.json()
	data.canvas.entities.forEach(e => {
		drawEntity(e)
	})
}

initializeCanvas()
