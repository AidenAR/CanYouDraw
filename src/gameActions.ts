import { Server, Socket } from 'socket.io'
import { getGameState } from './gameState'
import { Entity } from './types'

function drawCanvas(
	socket: Socket,
	io: Server,
	gameID: string,
	entity: Entity
) {
	//add new entity to list of existing entities

	const gameState = getGameState(gameID)

	if (!gameState) {
		return
	}

	// TODO: Validation for entities
	gameState.canvas.entities.push(entity)

	socket.to(gameID).emit("draw_canvas", entity)
}

function clearCanvas(socket: Socket, io: Server, gameID: string) {
	const gameState = getGameState(gameID)

	if (!gameState) {
		return
	}

	gameState.canvas = { entities: [] }

	// TODO: Emit event to update canvas
	socket.to(gameID).emit("clear_canvas")
}

function setThickness(socket: Socket, io: Server, gameID: string, size: number) {
	socket.to(gameID).emit("set_thickness", size)
}

export default {
	drawCanvas,
	clearCanvas,
	setThickness,
}
