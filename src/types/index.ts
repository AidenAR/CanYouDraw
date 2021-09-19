import { CircleEntity, ColorEntity, PointEntity, RectangleEntity, ThicknessEntity } from "./entities";

export type Maybe<T> = T | undefined;

export interface MetaData {}

export interface Player {}

export type Entity = RectangleEntity | CircleEntity | PointEntity | ColorEntity | ThicknessEntity;

export interface Canvas {
  entities: Entity[];
}

export interface GameState {
  metaData: MetaData;
  players: number;
  canvas: Canvas;
}
