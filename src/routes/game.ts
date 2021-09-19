import { Router } from 'express'
import { createGameState, getGameSessions, getGameState } from './../gameState'

const gameRoutes = Router()

gameRoutes.get('/all', (_req, res) => {
	res.json(getGameSessions())
})

gameRoutes.get('/:id', (req, res) => {
	const id: string = req.params.id

	const game = getGameState(id)

	if (!game) {
		res.status(404).json({})
	}

	res.status(200).json(game)
})

gameRoutes.post('/:id', (req, res) => {
	const id: string = req.params.id

	const game = getGameState(id)

	if (!game) {
		res.status(404).json({})
	}

	createGameState(id)

	res.status(201).json(game)
})

export default gameRoutes
