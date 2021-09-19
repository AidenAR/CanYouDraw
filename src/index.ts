import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import { deleteEmptyGames, getGameState } from './gameState'
import rateLimitMiddleware from 'express-rate-limit'
import gameRoutes from './routes/game'
import { Entity } from './types'
import gameActions from './gameActions'

const app = express()

const server = http.createServer(app)
const io = new Server(server)

app.use(cors())

app.use(express.static('src/public'))
app.use('/games', rateLimitMiddleware({
	windowMs: 15 * 60 * 1000, // 15 mins
	max: 100,
}))

app.use('/games', gameRoutes)

interface ConnectionQuery {
	gameID: string
	playerName: string
}

io.on('connection', socket => {
	const { gameID, playerName } = <ConnectionQuery>(
		(<unknown>socket.handshake.query)
	)

	const playerID = socket.id
	console.log(`socket ${playerID} connected to ${gameID}`)

	const gameState = getGameState(gameID)

	console.log(gameState)

	if (!gameState) {
		// TODO Take action when no gameState exists??
		return
	}

	//retrieve data about what game user is joining

	//check length of playerlist in given roomId
	//join a particular game. this is done when the client is loaded
	socket.on('join', ({ name, room }, callback) => {
		// console.log('User join', playerName, gameID, gameExist(gameID))

		console.log(gameID)
		// add player to socket room
		if (gameID) {
			socket.join(gameID)
		} else {
			io.to('socket#id').emit('hey')
		}

		//check if game doesn't exist
		//if (!gameExist(gameID)) {
		//createGame(playerName, playerID, gameID)
		//}

		//add player to game logic
		//playerJoin(playerName, playerID, gameID)

		socket.broadcast.to(gameID).emit('chat_message', {
			user: 'Gamemaster',
			text: `${name} has joined!`,
		})

		// TODO: Change To ID based
		gameState.players++

		//update player list
		//io.to(gameID).emit('player_list', { gameID: gameID, players: showPlayers(gameID) });

		//send the playerID to the client
		//socket.emit('player_id', playerID);

		// callback()/
	})

	//event listener
	socket.on('draw_canvas', (entity: Entity) => {
		gameActions.drawCanvas(socket, io, gameID, entity)
	})

	//event listener
	socket.on('clear_canvas', () => {
		gameActions.clearCanvas(socket, io, gameID)
	})

	socket.on('set_thickness', (size) => {
		gameActions.setThickness(socket, io, gameID, size)
	})

	socket.on('disconnect', () => {
		console.log(`socket ${playerID} disconnected`)
		if (gameState.players != 0) {
			gameState.players--
		}
	})
})

setTimeout(() => {
	deleteEmptyGames()
}, 1000 * 60)

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Server Started at port ${port}`))
