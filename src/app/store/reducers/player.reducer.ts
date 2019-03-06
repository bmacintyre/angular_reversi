import { Action } from '@ngrx/store';
import { Player } from '../models/player.interface';

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

export const PlayerActionTypes = {
    PLAYER_WIN: 'PLAYER_WIN',
    PLAYER_LOSS: 'PLAYER_LOSS',
    PLAYER_TIE: 'PLAYER_TIE',
    PLAYER_STONES: 'PLAYER_STONES'
};

export class PlayerStonesAction implements Action {
    type = PlayerActionTypes.PLAYER_STONES;

    constructor(public stones: number) {
    }
}

export class PlayerWinsAction implements Action {
    type = PlayerActionTypes.PLAYER_WIN;

    constructor(public wins: number) {
    }
}

export class PlayerLossesAction implements Action {
    type = PlayerActionTypes.PLAYER_LOSS;

    constructor(public losses: number) {
    }
}

export class PlayerTieAction implements Action {
    type = PlayerActionTypes.PLAYER_TIE;

    constructor(public ties: number) {
    }
}


export function playerReducer(state: PlayerState = initialState, action: any) {

    switch (action.type) {

        case PlayerActionTypes.PLAYER_STONES:
            return { ...state, stones: action.stones, loading: true };

        case PlayerActionTypes.PLAYER_WIN:
            return { ...state, wins: action.wins, loading: true };

        case PlayerActionTypes.PLAYER_LOSS:
            return { ...state, losses: action.losses, loading: true };

        case PlayerActionTypes.PLAYER_TIE:
            return { ...state, ties: action.ties, loading: true };

        default:
            return state;
    }
}
