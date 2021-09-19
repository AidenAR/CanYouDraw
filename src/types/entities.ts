
export interface PointEntity {
	type: "point"
	x: number
	y: number
}

export interface ColorEntity {
	type: "color"
	color: string
}

export interface ThicknessEntity {
	type: "thickness"
	size: number
}

export interface RectangleEntity {
	type: 'rectangle'
	x: number
	y: number
	width: number
	height: number
	color: string
}

export interface CircleEntity {
	type: 'circle'
	x: number
	y: number
	radius: number
	color: string
}


