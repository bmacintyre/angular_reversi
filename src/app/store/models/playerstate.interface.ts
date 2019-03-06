import { Player } from './player.interface';

export interface PlayerState {
    wins: number;
    losses: number;
    ties: number;
    stones: number;
}

const initialState: PlayerState = {
    wins: 0,
    losses: 0,
    ties: 0,
    stones: 2
};
