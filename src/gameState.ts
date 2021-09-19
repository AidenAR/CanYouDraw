import { GameState, Maybe } from './types'

interface GameMap {
	[id: string]: GameState
}

const gameMap: GameMap = {
	'1231231231': {
		metaData: {},
		players: 0,
		canvas: { entities: [] },
	},
}

export function getGameSessions(): string[] {
	return Object.keys(gameMap)
}

export function gameExists(id: string): boolean {
	return !!gameMap[id]
}

export function createGameState(id: string) {
	gameMap[id] = {
		metaData: {},
		players: 0,
		canvas: { entities: []},
	}
}

export function deleteGameState(id: string) {
	delete gameMap[id]
}

export function getGameState(id: string): Maybe<GameState> {
	if (!gameExists(id)) {
		return undefined
	}

	return gameMap[id]
}

export function deleteEmptyGames() {
	Object.keys(gameMap).forEach(gameId => {
		if (
			gameExists(gameId) &&
			getGameState(gameId)!.players <= 0 &&
			gameId != '1231231231'
		) {
			deleteGameState(gameId)
		}
	})
}
